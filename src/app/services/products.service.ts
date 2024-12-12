import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../interfaces/product.js';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private myAppUrl: string;
  private myApiUrl: string;



  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.myAppUrl = 'http://localhost:7272/';
    this.myApiUrl = 'products';
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl)
  }





}
