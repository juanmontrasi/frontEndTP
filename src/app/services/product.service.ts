import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.myAppUrl = 'http://localhost:7272/';
    this.myApiUrl = 'products';

  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, product);
  }

  getProductsByName(nombre: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl + `/search?nombre_producto=${nombre}`)
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl)
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + `/${id}`)
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myApiUrl + `/${id}`)
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.patch<void>(this.myAppUrl + this.myApiUrl + `/${id}`, product)
  }

  getProductQuantity(): Observable<number> {
    return this.http.get<number>(this.myAppUrl + this.myApiUrl + '/quantity/stock')
  }


}
