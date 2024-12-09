import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order.js';
import { User } from '../interfaces/user.js';
import { UserService } from './user.service.js';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.myAppUrl = 'http://localhost:1234/';
    this.myApiUrl = 'orders';

  }

  createOrder(id: number, total: number): Observable<any> {
    const order = {
      fecha_pedido: new Date(),
      total: total,
      id_cliente: id
    }
    const token = sessionStorage.getItem('token');
    console.log(token)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.myAppUrl + this.myApiUrl, order, { headers });
  }

  getOrders(): Observable<Order[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Order[]>(this.myAppUrl + this.myApiUrl, {headers});
  }
}

