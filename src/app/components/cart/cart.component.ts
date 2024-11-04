import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../services/orders.service.js';
import { CartService } from '../../services/cart.service.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {


  constructor(private _productsService: ProductsService, private _cartService: CartService) { }

  ngOnInit() {
  }



}
