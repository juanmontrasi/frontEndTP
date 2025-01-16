import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  sendEmail(order: Order): Observable<void> {
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<void>(this.myAppUrl + this.myApiUrl, order, { headers });
    }
}
