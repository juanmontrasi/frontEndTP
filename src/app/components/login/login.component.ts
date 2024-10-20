import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user.js';
import { UserService } from '../../services/user.service.js';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private toastr: ToastrService, private _userService: UserService, private router: Router) { }

  userName: string = '';
  password: string = '';
  loading: boolean = false;

  login() {
    // valido que el usuario ingrese datos
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
    this.loading = true;
    this._userService.logIn(user).subscribe({
      next: (token) => {
        this.loading = false;
        localStorage.setItem("token", token);
        this.router.navigate(['/']);
        console.log(token);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this._userService.msjError(error);
      }
    });

  }
}
