import { Component } from '@angular/core';
import { Product } from '../../interfaces/product.js';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service.js';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrdersService } from '../../services/orders.service.js';
import { CartService } from '../../services/cart.service.js';


@Component({
  selector: 'app-prod-client',
  standalone: true,
  imports: [FormsModule, CommonModule, FilterPipeModule],
  templateUrl: './prod-client.component.html',
  styleUrl: './prod-client.component.scss'
})
export class ProdClientComponent {

  listProd: any[] = [];
  searchInput = { nombre_producto: '', desc_producto: '', stock: '', precio: '' };

  constructor(private router: Router, private _productService: ProductsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe(products => {
      this.listProd = products;
    });
  }


  addProdToCart(product: Product): void {

  }


}
