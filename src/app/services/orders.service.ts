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
    this.myAppUrl = 'http://localhost:7272/';
    this.myApiUrl = 'orders';

  }

  createOrder(id: number, total: number): Observable<any> {
    const order = {
      fecha_pedido: new Date(),
      total: total,
      id_cliente: id
    }
    return this.http.post(this.myAppUrl + this.myApiUrl, order);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.myAppUrl + this.myApiUrl);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + `/${id}`);
  }

  updateOrder(id_pedidos: number, order: Order): Observable<void> {
    return this.http.patch<void>(this.myAppUrl + this.myApiUrl + `/${id_pedidos}`, order);
  }

  getOrdersQuantity(): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myApiUrl + '/quantity');
  }
}

