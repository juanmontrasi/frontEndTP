import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../interfaces/product.js';
import { ProductService } from '../../services/product.service.js';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-edit-products',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './new-edit-products.component.html',
  styleUrl: './new-edit-products.component.scss'
})
export class NewEditProductsComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.formProduct = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      quant: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required]
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }
  }


  operacion: string = 'Agregar ';
  id: number;
  formProduct: FormGroup;
  productName: string = '';
  description: string = '';
  quant: number | undefined;
  price: number | undefined;
  image: string = '';


  getProduct(id: number) {
    this._productService.getProductById(id).subscribe((data: any) => {
      this.formProduct.patchValue({
        productName: data[0].nombre_producto,
        description: data[0].desc_producto,
        quant: data[0].stock,
        price: data[0].precio,
        image: data[0].imagen
      });
    });
  }

  addProduct() {
    const product: Product = {
      nombre_producto: this.formProduct.value.productName,
      desc_producto: this.formProduct.value.description,
      stock: this.formProduct.value.quant,
      precio: this.formProduct.value.price,
      imagen: this.formProduct.value.image,
    }

    product.id_productos = this.id;
    if (this.id != 0) {
      this._productService.updateProduct(this.id, product).subscribe({
        next: () => {
          this.toastr.success(`El producto fue actualizado con exito`, 'Producto actualizado');
          this.router.navigate(['/products']);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'Producto no actualizado');
          this.router.navigate(['/products']);
        }

      });
    } else {
      this._productService.createProduct(product).subscribe({
        next: () => {
          this.toastr.success(`El product fue registrado con exito`, 'Product registrado');
          this.router.navigate(['/products']);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'Product no registrado');
          this.router.navigate(['/products']);
        }
      });
      ;
    }


  }

}
