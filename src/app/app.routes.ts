import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ServicesComponent } from './components/services/services.component.js';
import { NewEditServicesComponent } from './components/new-edit-services/new-edit-services.component.js';
import { UsersComponent } from './components/users/users.component.js';
import { NewEditUsersComponent } from './components/new-edit-users/new-edit-users.component.js';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'services', component: ServicesComponent },
  // { path: 'newService', component: NewEditServicesComponent },
  { path: 'users', component: UsersComponent },
  { path: 'newUser', component: NewEditUsersComponent },
  { path: 'editUser/:id', component: NewEditUsersComponent },
  { path: '**', component: HomeComponent }
];
