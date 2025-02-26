import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service.js';
import { Toast, ToastrService } from 'ngx-toastr';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpErrorResponse } from '@angular/common/http';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, NgxPaginationModule, FilterPipeModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  listUsers: any[] = [];
  p: number = 1;
  collection: any[] = this.listUsers;
  searchInput = { nombre_usuario: '', email: '', telefono: '', direccion: '', nombre: '', apellido: '' };

  constructor(private router: Router, private _userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers().subscribe(users => {
      this.listUsers = users;
    });
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this._userService.deleteUser(id).subscribe({
        next: () => {
          this.getUsers();
          this.toastr.warning('Usuario eliminado correctamente', 'Usuario eliminado');
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error!');
        }
      });
    }

  }
}


