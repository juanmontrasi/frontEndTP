import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { OrdersService } from './orders.service.js';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;
  private isLoggedIn = false;
  private usarWithToken?: User;
  private tipoUsuario: string | null = null;
  private idUsuario: number | null = null;



  constructor(private http: HttpClient, private toastr: ToastrService, private _orderService: OrdersService) {
    this.myAppUrl = 'http://localhost:7272/';
    this.myApiUrl = 'users';

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.myAppUrl + this.myApiUrl);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + `/${id}`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(this.myAppUrl + this.myApiUrl + `/${id}`)
  }

  updateUser(id: number, user: User): Observable<void> {
    return this.http.patch<void>(this.myAppUrl + this.myApiUrl + `/${id}`, user);
  }


  signUp(user: User): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, user)
  }

  logIn(user: User): Observable<any> {
    return this.http.post<any>(this.myAppUrl + 'login', user).pipe(
      tap((response: any) => {
        sessionStorage.setItem('token', response.token);

        const decoded: any = jwtDecode(response.token);
        this.tipoUsuario = decoded.tipo_usuario;
        this.idUsuario = decoded.id_usuarios;

        this.isLoggedIn = true;
      })
    );
  }

  getUserId(): number {
    if (this.idUsuario !== null) {
      return this.idUsuario;
    } else {
      const token = sessionStorage.getItem('token');
      if (token) {
        const decoded: any = jwtDecode(token);
        return decoded.id_usuarios;
      }
      return 0;
    }
  }


  isAdmin(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      const tipoUsuario = decoded.tipo_usuario;
      if (tipoUsuario === 1) {
        return true;
      };
    }
    return false;
  }

  logOut(): void {
    sessionStorage.removeItem('token');
    localStorage.removeItem('cart');
    this.isLoggedIn = false;
    this.tipoUsuario = null;
    this.idUsuario = null;
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getClientsQuantity(): Observable<number> {
    return this.http.get<number>(this.myAppUrl + this.myApiUrl + '/clients/quantity');
  }

}

