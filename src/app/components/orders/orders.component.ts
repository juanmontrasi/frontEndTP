import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service.js';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxPaginationModule, FilterPipeModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orderState: string = 'En espera';
  listOrders: any[] = [];
  p: number = 1;
  collection: any[] = this.listOrders;
  searchInput = { fecha_pedido: '', Usuario: { email: '' } };

  ngOnInit(): void {
    this.getOrders();
  }

  constructor(private _ordersService: OrdersService, private toastr: ToastrService) {

  }

  getOrders() {
    this._ordersService.getOrders().subscribe(orders => {
      this.listOrders = orders;
      this.listOrders.forEach((order: any) => {
        order.fecha_pedido = new Date(order.fecha_pedido).toLocaleString();
      })
    });
  }

  state(estado: boolean) {
    if (estado == false) {
      this.orderState = 'En espera';
    } else {
      this.orderState = 'Entregado';
    }
  }

  listProducts(productos_pedidos: any[]) {
    let products: any[] = [];
    productos_pedidos.forEach((product_order: any, index) => {
      products[index] =
        product_order.Producto.nombre_producto + '(' + product_order.cantidad + ')';
    });
    return products;
  }

  deleteOrder(id: number) {
    if (confirm('¿Estás seguro de eliminar este pedido?')) {
      this._ordersService.deleteOrder(id).subscribe({
        next: () => {
          this.getOrders();
          this.toastr.warning('Pedido eliminado correctamente', 'Producto eliminado');
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error('Error al eliminar el pedido', 'Error');
        }
      });
    }
  } 
}
