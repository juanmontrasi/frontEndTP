import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsersComponent } from './components/users/users.component.js';
import { NewEditUsersComponent } from './components/new-edit-users/new-edit-users.component.js';
import { AuthService } from './services/auth.service.js';
import { ProdClientComponent } from './components/prod-client/prod-client.component.js';
import { CartComponent } from './components/cart/cart.component.js';
import { ProductsComponent } from './components/products/products.component.js';
import { NewEditProductsComponent } from './components/new-edit-products/new-edit-products.component.js';
import { OrdersComponent } from './components/orders/orders.component.js';


export const routes: Routes = [
  { path: 'login', component: LoginComponent, },
  { path: 'signup', component: SignupComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthService] },
  { path: 'newProduct', component: NewEditProductsComponent, canActivate: [AuthService] },
  { path: 'editProduct/:id', component: NewEditProductsComponent, canActivate: [AuthService] },
  // { path: 'newService', component: NewEditServicesComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthService] },
  { path: 'newUser', component: NewEditUsersComponent, canActivate: [AuthService] },
  { path: 'editUser/:id', component: NewEditUsersComponent, canActivate: [AuthService] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthService] },
  { path: 'prodClients', component: ProdClientComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', component: HomeComponent }
];
