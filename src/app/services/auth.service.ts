import { Injectable } from '@angular/core';
import { UserService } from './user.service.js';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _userService: UserService, private router: Router) { }

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');

    if (token != null && this._userService.isAdmin()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
