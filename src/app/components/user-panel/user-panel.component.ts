import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss'
})
export class UserPanelComponent implements OnInit {
  user: any = {};
  id_usuario: number = 0;

  constructor(private _userService: UserService, private router: Router)  {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
      this.id_usuario =  this._userService.getUserId();
      this._userService.getUserById(this.id_usuario).subscribe((data: any) => {
        this.user = data[0];
      });
  }

  editUser() {
        this.router.navigate([`editCurrentUser/${this.id_usuario}`]);
    }
}
