import { Injectable } from '@angular/core';
import { UserService } from './user.service.js';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _userService: UserService, private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const tipo_usuario = localStorage.getItem('tipo_usuario');

    if (token != null && tipo_usuario === '1') {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
