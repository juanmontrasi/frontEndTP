import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user.js';
import { UserService } from '../../services/user.service.js';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { ProductsService } from '../../services/products.service.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private toastr: ToastrService, private _userService: UserService, private router: Router, private _productsService: ProductsService) { }

  userName: string = '';
  password: string = '';

  login() {
    if (this.userName == '' || this.password == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error!');
      return
    }

    const user: User = {
      nombre_usuario: this.userName,
      clave: this.password,
      tipo_usuario: 0,
      email: '',
      telefono: '',
      nombre: '',
      apellido: '',
      direccion: ''
    }
    this._userService.logIn(user).subscribe({
      next: () => {
        if (sessionStorage.getItem('token') != null) {
          this.toastr.success('Bienvenido', 'Login exitoso');
          this.router.navigate(['/']);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error('Usuario o contraseña incorrectos', 'Error!');
        this.router.navigate(['/login']);
      }
    });

  }
}
