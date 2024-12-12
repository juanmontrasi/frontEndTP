import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service.js';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  tipo_usuario?: number;
  id_usuario?: number;

  constructor(public _userService: UserService, private router: Router) { }


  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
    if (this.isLoggedIn) {
      this.tipo_usuario = parseInt(localStorage.getItem('tipo_usuario')!);
    }
  }

  onLogout() {
    this._userService.logOut();
    this.router.navigate(['/']);
  }

  updateUser() {
    this.id_usuario = this._userService.getUserId();
    this.router.navigate([`editCurrentUser/${this.id_usuario}`]);
  }
}
