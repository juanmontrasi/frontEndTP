import { AfterViewInit, Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Chart } from 'chart.js/auto';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { OrderProduct } from '../../interfaces/order-product';
import { OrdersProductsService } from '../../services/orders-products.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  clients: number = 0;
  products: number = 0;
  deliveredOrders: number = 0;
  pendingOrders: number = 0;
  profit: number = 0;

  constructor(
    private ordersService: OrdersService,
    private productService: ProductService,
    private userService: UserService,
    private orderProductService: OrdersProductsService
  ) { }

  ngOnInit() {
    this.getClients();
    this.getPoducts();
    this.getOrders();
    this.graphic();
  }




  getOrders() {
    this.ordersService.getOrdersQuantity().subscribe(data => {
      this.deliveredOrders = data.deliveredOrders;
      this.pendingOrders = data.pendingOrders;
      this.profit = data.total;
    })
  }

  getPoducts() {
    this.productService.getProductQuantity().subscribe(quantity => {
      this.products = quantity;
    })
  }

  getClients() {
    this.userService.getClientsQuantity().subscribe(quantity => {
      this.clients = quantity;
    }

    )
  }

  graphic() {
    let products: any = [];
    let quantities: any = [];
    const ctx = document.getElementById('myChart') as HTMLCanvasElement | null;
    this.orderProductService.getProductsQuantity().subscribe(data => {
      data[0].forEach((element: { id_producto: number, nombre_producto: number, cantidad: number; }) => {
        products.push(element.nombre_producto);
        quantities.push(element.cantidad);
      });

      if (ctx) {
        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: products,
            datasets: [{
              label: 'Ventas por producto',
              data: quantities,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1.5
            }]
          }
        });
      }
    });


  }
}
