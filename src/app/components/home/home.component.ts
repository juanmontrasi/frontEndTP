import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service.js';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  listProd: any[] = [];

  constructor(private router: Router, private _productService: ProductsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProducts();

  }

  getProducts() {
    this._productService.getProducts().subscribe(products => {

      this.listProd = products;
      if (this.listProd.length >= 3) {
        this.listProd = this.listProd.slice(0, 3);
      }
    });
  }
}
