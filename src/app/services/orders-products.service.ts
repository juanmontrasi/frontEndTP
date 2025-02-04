import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from './orders.service.js';
import { Observable } from 'rxjs';
import { OrderProduct } from '../interfaces/order-product.js';

@Injectable({
  providedIn: 'root'
})
export class OrdersProductsService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient, private toastr: ToastrService, private _orderService: OrdersService) {
    this.myAppUrl = 'http://localhost:7272/';
    this.myApiUrl = 'orders/products';
  }

  createOrderProduct(orderProduct: OrderProduct): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, orderProduct);
  }

}
