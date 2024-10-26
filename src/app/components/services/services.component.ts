import { Component } from '@angular/core';
import { Services } from '../../interfaces/services.js';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  addService() {
    this.router.navigate(['/newService']);
  }

  editService(id: number) {
    this.router.navigate([`/editService/${id}`]);
  }

  constructor(private router: Router) {

  }

  listServices: any[] = [
    { id_servicios: 1, desc_servicio: 'Asesoría técnica personalizada', precio: 100 },
    { id_servicios: 2, desc_servicio: 'Instalación de hardware', precio: 50 },
    { id_servicios: 3, desc_servicio: 'Configuración de sistemas', precio: 60 },
    { id_servicios: 4, desc_servicio: 'Reparación de computadoras', precio: 80 },
    { id_servicios: 5, desc_servicio: 'Mantenimiento y limpieza de PC', precio: 150 }
  ]
}
