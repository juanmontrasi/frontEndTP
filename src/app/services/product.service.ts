import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.myAppUrl = 'http://localhost:1234/';
    this.myApiUrl = 'products';

  }

  createProduct(product: Product): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.myAppUrl + this.myApiUrl, product, {headers});
  }

  getProductsByName(nombre: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl + `/search?nombre_producto=${nombre}`)
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl)
  }

  deleteProduct(id: number): Observable<void> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + `/${id}`, {headers})
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myApiUrl + `/${id}`)
  }

  updateProduct(id: number, product: Product): Observable<void> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<void>(this.myAppUrl + this.myApiUrl + `/${id}`, product, {headers})
  }

  
}
