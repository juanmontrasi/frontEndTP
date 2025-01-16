import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../shared/spinner/spinner.component.js';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user.js';
import { UserService } from '../../services/user.service.js';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-edit-users',
  standalone: true,
  imports: [SpinnerComponent, FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './new-edit-users.component.html',
  styleUrl: './new-edit-users.component.scss'
})
export class NewEditUsersComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.formUser = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, ]],
      tipo_usuario: 1,
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
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

  operacion: string = 'Agregar ';
  id: number;
  formUser: FormGroup;
  userName: string = '';
  password: string = '';
  email: string = '';
  tipo_usuario: number = 1;
  name: string = '';
  lastName: string = '';
  phone: string = '';
  address: string = '';

  getUser(id: number) {
    this._userService.getUserById(id).subscribe((data: any) => {
      this.formUser.patchValue({
        userName: data[0].nombre_usuario,
        password: data[0].clave,
        email: data[0].email,
        tipo_usuario: data[0].tipo_usuario,
        name: data[0].nombre,
        lastName: data[0].apellido,
        phone: data[0].telefono,
        address: data[0].direccion
      });
    });
  }

  addUser() {
    const user: User = {
      nombre_usuario: this.formUser.value.userName,
      clave: this.formUser.value.password,
      email: this.formUser.value.email,
      tipo_usuario: Number(this.formUser.value.tipo_usuario),
      nombre: this.formUser.value.name,
      apellido: this.formUser.value.lastName,
      telefono: this.formUser.value.phone,
      direccion: this.formUser.value.address
    }

    user.id_usuarios = this.id;
    if (this.id != 0) {
      this._userService.updateUser(this.id, user).subscribe({
        next: () => {
        this.toastr.success(`El usuario fue actualizado con exito`, 'Usuario actualizado');
        this.router.navigate(['/users']);
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.error('Error al actualizar el usuario', 'Error!');
        }
      });
    } else {
      this._userService.signUp(user).subscribe({
        next: () => {
        this.toastr.success(`El usuario fue registrado con exito`, 'Usuario registrado');
        this.router.navigate(['/users']);
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.error('Error al registrar el usuario', 'Error!');
        }
      });
    }


  }

}
