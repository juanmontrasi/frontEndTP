import { Component } from '@angular/core';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Services } from '../../interfaces/services.js';

@Component({
  selector: 'app-new-edit-services',
  standalone: true,
  imports: [SpinnerComponent, FormsModule, CommonModule, RouterModule],
  templateUrl: './new-edit-services.component.html',
  styleUrl: './new-edit-services.component.scss'
})
export class NewEditServicesComponent {

  constructor(private toastr: ToastrService) { }


  loading: boolean = false;
  desc_service: string = '';
  price?: number;

  addService() {
    if (this.ValidateService()) {
      const service: Services = {
        desc_servicio: this.desc_service,
        precio: this.price ?? 0
      }

      // tengo que empezar a hacer el servicio

      // console.log(service);
      // this.loading = true;
      // this._userService.signUp(user).subscribe({
      //   next: (v) => {
      //     this.loading = false;
      //     this.toastr.success(`El usuario ${this.userName} fue registrado con exito`, 'Usuario registrado');
      //     this.router.navigate(['/login']);
      //   },
      //   error: (event: HttpErrorResponse) => {
      //     this.loading = false;
      //     this._userService.msjError(event);
      //   }
      // });
    }


  }
  ValidateService() {
    if (this.desc_service == '' || this.price?.toString() == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error!');

      return false;
    }
    return true;
  }

}
