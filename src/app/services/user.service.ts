import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.js';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:1234/';
    this.myApiUrl = 'users';
  }

  signIn(user: User): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, user);
  }
}