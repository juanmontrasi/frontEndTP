import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
    console.log("hola")
    return this.http.post(this.myAppUrl + this.myApiUrl, product)
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

  // isAuthenticated(): boolean {
  //   // Verificar si el token existe en localStorage
  //   return !!localStorage.getItem('token');
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Loguea el error
      this.toastr.error('Error en la operación', 'Error!');
      return of(result as T); // Devolver un valor seguro
    };
  }

  msjError(event: HttpErrorResponse) {
    if (event.error.msg) {
      this.toastr.error(event.error.msg, 'Error!');
    } else {
      this.toastr.error('Error en el ingreso de datos', 'Error!');
    }
  }
}
