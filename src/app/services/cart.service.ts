import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartProducts: Product[] = [];


  constructor() { }

  addProductToCart(product: Product): void {
    this.cartProducts = localStorage.getItem('cart') == null ? [] : JSON.parse(localStorage.getItem('cart')!);
    if (this.cartProducts == null) {
      localStorage.setItem('cart', JSON.stringify([product]));
    }
    else {
      this.cartProducts.push(product);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }

  getCartProducts(): Product[] {
    return localStorage.getItem('cart') == null ? [] : JSON.parse(localStorage.getItem('cart')!);
  }

}
