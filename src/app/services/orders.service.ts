import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order.js';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.myAppUrl = 'https://backendtp-production.up.railway.app/';
    this.myApiUrl = 'orders';

  }

  createOrder(id: number, total: number): Observable<any> {
    const order = {
      fecha_pedido: new Date(),
      total: total,
      id_cliente: id
    }
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.myAppUrl + this.myApiUrl, order, { headers });
  }

  getOrders(): Observable<Order[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Order[]>(this.myAppUrl + this.myApiUrl, { headers });
  }

  deleteOrder(id: number): Observable<void> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + `/${id}`, { headers });
  }

  updateOrder(id_pedidos: number, order: Order): Observable<void> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<void>(this.myAppUrl + this.myApiUrl + `/${id_pedidos}`, order, { headers });
  }
}

