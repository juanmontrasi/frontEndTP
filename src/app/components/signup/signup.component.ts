import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user.js';
import { UserService } from '../../services/user.service.js';
import { Router } from '@angular/router';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, SpinnerComponent, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor(private toastr: ToastrService, private _userService: UserService, private router: Router) { }

  userName: string = '';
  password: string = '';
  email: string = '';
  phone: string = '';
  name: string = '';
  lastName: string = '';
  address: string = '';

  loading: boolean = false;


  addUser() {
    if (this.userName == '' || this.password == '' || this.email == '' || this.phone == '' || this.name == '' || this.lastName == '' || this.address == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error!');
      console.log(this.userName);
      console.log(this.password);
      console.log(this.email);
      console.log(this.phone);
      console.log(this.name);
      console.log(this.lastName);
      console.log(this.address);
      return;
    }

    const user: User = {
      nombre_usuario: this.userName,
      clave: this.password,
      tipo_usuario: 2,
      email: this.email,
      telefono: this.phone,
      nombre: this.name,
      apellido: this.lastName,
      direccion: this.address
    }
    this.loading = true;
    this._userService.signUp(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`El usuario ${this.userName} fue registrado con exito`, 'Usuario registrado');
        this.router.navigate(['/login']);
      },
      error: (event: HttpErrorResponse) => {
        this.loading = false;
        this._userService.msjError(event);
      }
    });
  }


}

