import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:7272/';
    this.myApiUrl = 'checkout';

  }

  mercadoPagoApi(order: Order): Observable<any> {
    return this.http.post<any>(this.myAppUrl + this.myApiUrl, order);
  }
}
