import { HttpClient } from '@angular/common/http';
import { TokenType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private listProdCart: any[] = [];
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.myAppUrl = 'http://localhost:1234/';
    this.myApiUrl = 'orders';

  }

  createOrder(id: number) {
    const order = {
      fecha_pedido: new Date(),
      total: 0,
      id_cliente: id
    }

    return this.http.post(this.myAppUrl + this.myApiUrl, order);
  }

  getOrders() {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }
}

