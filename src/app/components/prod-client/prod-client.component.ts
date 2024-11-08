import { Component } from '@angular/core';
import { Product } from '../../interfaces/product.js';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service.js';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ProductService } from '../../services/product.service.js';


@Component({
  selector: 'app-prod-client',
  standalone: true,
  imports: [FormsModule, CommonModule, FilterPipeModule, ReactiveFormsModule],
  templateUrl: './prod-client.component.html',
  styleUrl: './prod-client.component.scss'
})
export class ProdClientComponent {
  productName: string = '';
  listProd: any[] = [];
  formSearch: FormGroup;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _productService: ProductService,
    private fb: FormBuilder) {
    this.formSearch = this.fb.group({
      productName: ['', Validators.required]
    })
  }



  ngOnInit(): void {
    this.getProducts();

  }

  getProducts() {
    this._productService.getProducts().subscribe(products => {
      this.listProd = products;
    });
  }

  getProdByName() {
    this._productService.getProductsByName(this.formSearch.value.productName).subscribe(products => {
      this.listProd = products;
      console.log('Productos encontrados:', this.listProd);
    });
  }


  addProdToCart(product: Product): void {

  }


}
