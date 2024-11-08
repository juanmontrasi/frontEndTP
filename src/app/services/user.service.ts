import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment.js';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { number } from 'mathjs';
import { OrdersService } from './orders.service.js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;
  private isLoggedIn = false;
  private usarWithToken?: User;




  constructor(private http: HttpClient, private toastr: ToastrService, private _orderService: OrdersService) {
    this.myAppUrl = 'http://localhost:1234/';
    this.myApiUrl = 'users';

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.myAppUrl + this.myApiUrl)
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + `/${id}`)
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myApiUrl + `/${id}`)
  }

  updateUser(id: number, user: User): Observable<void> {
    return this.http.patch<void>(this.myAppUrl + this.myApiUrl + `/${id}`, user)
  }


  signUp(user: User): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, user)
  }

  logIn(user: User): Observable<any> {
    return this.http.post<any>(this.myAppUrl + 'login', user).pipe(
      tap((response: any) => {
        // Almacenar token en localStorage y el tipo de usuario y cambiar el estado de autenticación
        localStorage.setItem('token', response.token);
        localStorage.setItem('tipo_usuario', response.user.tipo_usuario);
        this.isLoggedIn = true;
      }),
      catchError(this.handleError<string>('login', ''))
    );
  }

  isAdmin(): boolean {
    return localStorage.getItem('tipo_usuario') === '1';
  }

  logOut(): void {
    // Limpiar el token y el estado de autenticación
    localStorage.removeItem('token');
    localStorage.removeItem('tipo_usuario');
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    // Verificar si el token existe en localStorage
    return !!localStorage.getItem('token');
  }

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