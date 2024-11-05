import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service.js';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})


export class ProductsComponent implements OnInit {
  listProducts: any[] = [];
  // toastr: any;
  // private _productService: any;
  displayColumns: string[] = ['id', 'nombre', 'descripcion', 'stock', 'precio', 'imagen'];
  //  dataSource = algo del back?;

  constructor(private router: Router, private _productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe((products: any[]) => {
      this.listProducts = products;
    });
  }

  deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe(() => {
      this.getProducts();
      this.toastr.warning('Product deleted successfully', 'Product deleted');
    });
  }

}