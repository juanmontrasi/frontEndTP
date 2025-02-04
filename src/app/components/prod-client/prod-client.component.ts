import { Component } from '@angular/core';
import { Product } from '../../interfaces/product.js';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service.js';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ProductService } from '../../services/product.service.js';
import { CartService } from '../../services/cart.service.js';


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
  cartProducts: Product[] = [];
  selectedProduct: any = {}

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _productService: ProductService,
    private fb: FormBuilder,
    private _cartService: CartService) {
    this.formSearch = this.fb.group({
      productName: ['', Validators.required]
    })
  }



  ngOnInit(): void {
    this.getProducts();
    this.cartProducts = this._cartService.getCartProducts();

  }

  getProducts() {
    this._productService.getProducts().subscribe(products => {
      this.listProd = products;
    });
  }

  getProdByName() {
    this._productService.getProductsByName(this.formSearch.value.productName).subscribe(products => {
      this.listProd = products;
    });
  }


  addProdToCart(product: Product): void {
    this.cartProducts = this._cartService.getCartProducts();
    if (!this.cartProducts.some(p => p.id_productos === product.id_productos)) {
      this._cartService.addProductToCart(product);
      this.toastr.success('Producto agregado al carrito', 'Producto agregado');
    }
  }

  setProduct(product: Product) {
    this.selectedProduct = product;
  }


}
