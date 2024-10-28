import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service.js';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  listUsers: any[] = [];

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
    this._userService.deleteUser(id).subscribe(() => {
      this.getUsers();
      this.toastr.warning('User deleted successfully', 'User deleted');
    });
  }




}

