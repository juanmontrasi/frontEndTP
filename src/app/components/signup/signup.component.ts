import { Component, OnInit } from '@angular/core';
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
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {


  constructor(private toastr: ToastrService,
    private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private aRouter: ActivatedRoute) {
    this.formClient = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,]],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      address: ['', Validators.required]
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar ';
      this.getUser(this.id);
    }
  }
  operacion: string = 'Registrarse';
  id: number;
  tipo_usuario: number | undefined;
  formClient: FormGroup;
  userName: string = '';
  password: string = '';
  email: string = '';
  phone: string = '';
  name: string = '';
  lastName: string = '';
  address: string = '';

  getUser(id: number) {
    this._userService.getUserById(id).subscribe((data: any) => {
      this.formClient.patchValue({
        userName: data[0].nombre_usuario,
        password: data[0].clave,
        email: data[0].email,
        name: data[0].nombre,
        lastName: data[0].apellido,
        phone: data[0].telefono,
        address: data[0].direccion
      });
      this.tipo_usuario = data[0].tipo_usuario;
    });
  }


  addUser() {
    const user: User = {
      nombre_usuario: this.formClient.value.userName,
      clave: this.formClient.value.password,
      tipo_usuario: this.tipo_usuario!,
      email: this.formClient.value.email,
      nombre: this.formClient.value.name,
      apellido: this.formClient.value.lastName,
      telefono: this.formClient.value.phone,
      direccion: this.formClient.value.address
    }
    user.id_usuarios = this.id;
    if (this.id != 0) {
      this._userService.updateUser(this.id, user).subscribe({
        next: () => {
          this.toastr.success(`Actualizaste tu usuario`, 'Usuario actualizado');
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.error(err.error.message, 'Error!');
        }
      });
    } else {
      this._userService.signUp(user).subscribe({
        next: () => {
          this.toastr.success(`Te registraste con exito`, 'Usuario registrado');
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.error(err.error.message, 'Error!');
        }
      });
    }
  }


}

