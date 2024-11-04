import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ServicesComponent } from './components/services/services.component.js';
import { NewEditServicesComponent } from './components/new-edit-services/new-edit-services.component.js';
import { UsersComponent } from './components/users/users.component.js';
import { NewEditUsersComponent } from './components/new-edit-users/new-edit-users.component.js';
import { AuthService } from './services/auth.service.js';
import { ProdClientComponent } from './components/prod-client/prod-client.component.js';
import { CartComponent } from './components/cart/cart.component.js';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, },
  { path: 'signup', component: SignupComponent },
  { path: 'services', component: ServicesComponent },
  // { path: 'newService', component: NewEditServicesComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthService] },
  { path: 'newUser', component: NewEditUsersComponent, canActivate: [AuthService] },
  { path: 'editUser/:id', component: NewEditUsersComponent, canActivate: [AuthService] },
  { path: 'prodClients', component: ProdClientComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', component: HomeComponent }
];
