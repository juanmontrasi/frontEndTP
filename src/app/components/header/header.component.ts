import { Component } from '@angular/core';
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
export class HeaderComponent {

  constructor(public userService: UserService, private router: Router) { }

  onLogout() {
    this.userService.logOut();
    this.router.navigate(['/']);
  }
}
