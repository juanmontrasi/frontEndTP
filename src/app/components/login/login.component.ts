import { Component, input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user.js';
import { UserService } from '../../services/user.service.js';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formLogin: FormGroup;
  username: string = '';
  password: string = '';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router) {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  login() {
    const user: User = {
      nombre_usuario: this.formLogin.value.username,
      clave: this.formLogin.value.password,
      tipo_usuario: 0,
      email: '',
      telefono: '',
      nombre: '',
      apellido: '',
      direccion: ''
    }
    this._userService.logIn(user).subscribe({
      next: () => {
        if (this._userService.isAuthenticated()) {
          this.toastr.success('Bienvenido', 'Login exitoso');
          this.router.navigate(['/']);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.toastr.error('Usuario o contraseña incorrectos', 'Error!');
        this.router.navigate(['/login']);
      }
    });

  }
}
