import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user.js';
import { UserService } from '../../services/user.service.js';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SpinnerComponent, FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor(private toastr: ToastrService,
    private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private aRouter: ActivatedRoute) {
      this.formClient = this.fb.group({
        userName: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', Validators.required],
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required]
      });
     }

  formClient: FormGroup;
  userName: string = '';
  password: string = '';
  email: string = '';
  phone: string = '';
  name: string = '';
  lastName: string = '';
  address: string = '';

  loading: boolean = false;


  addUser() {
    const user: User = {
      nombre_usuario: this.formClient.value.userName,
      clave: this.formClient.value.password,
      email: this.formClient.value.email,
      nombre: this.formClient.value.name,
      apellido: this.formClient.value.lastName,
      telefono: this.formClient.value.phone,
      direccion: this.formClient.value.address
    }
    console.log(user);
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

