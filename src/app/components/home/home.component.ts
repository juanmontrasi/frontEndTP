import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service.js';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product.js';
import { CartService } from '../../services/cart.service.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  listProd: any[] = [];
  cartProducts: Product[] = []; 

  constructor(
    private router: Router, 
    private _productService: ProductsService, 
    private toastr: ToastrService, 
    private _cartService: CartService) {

   }

  ngOnInit(): void {
    this.getProducts();
    this.cartProducts = this._cartService.getCartProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe(products => {

      this.listProd = products;
      if (this.listProd.length >= 3) {
        this.listProd = this.listProd.slice(0, 3);
      }
    });
  }
  addProdToCart(product: Product): void {
    this.cartProducts = this._cartService.getCartProducts();
    if (!this.cartProducts.some(p => p.id_productos === product.id_productos)) {
      this._cartService.addProductToCart(product);
      this.toastr.success('Producto agregado al carrito', 'Producto agregado');
    }

  }
}
