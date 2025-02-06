import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service.js';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, NgxPaginationModule, FilterPipeModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})


export class ProductsComponent implements OnInit {
  listProducts: any[] = [];
  // toastr: any;
  // private _productService: any;
  displayColumns: string[] = ['id', 'nombre', 'descripcion', 'stock', 'precio', 'imagen'];
  //  dataSource = algo del back?;

  p: number = 1;
  collection: any[] = this.listProducts;
  searchInput = { nombre_producto: '' };

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
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this._productService.deleteProduct(id).subscribe({
        next: () => {
          this.getProducts();
        this.toastr.warning('Producto eliminado correctamente', 'Producto eliminado');
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.message, 'Error');
      }
      });
    }
    
  }
}