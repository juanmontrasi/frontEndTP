import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../services/orders.service.js';
import { CartService } from '../../services/cart.service.js';
import { concatMap, from, Subscription } from 'rxjs';
import { Product } from '../../interfaces/product.js';
import { UserService } from '../../services/user.service.js';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Order } from '../../interfaces/order.js';
import { OrdersProductsService } from '../../services/orders-products.service.js';
import { OrderProduct } from '../../interfaces/order-product.js';
import { ProductService } from '../../services/product.service.js';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [];
  cartProductsRepeated: Product[] = [];
  id_pedidos: number = 0;
  constructor(private _ordersProduct: OrdersProductsService, private toastr: ToastrService, private userService: UserService, private _productService: ProductService, private _cartService: CartService, private _ordersService: OrdersService, private router: Router,) { }

  ngOnInit() {
    this.cartProductsRepeated = this._cartService.getCartProducts();
    this.setCartProducts();
  }

  Proceed() {
    if (!this.userService.isAuthenticated()) {
      this.toastr.error('Inicie sesión para continuar', 'Error');
      return;
    }

    const id_usuario = this.userService.getUserId();
    if (id_usuario === 0) {
      this.toastr.error('Error al obtener el id del usuario', 'Error');
      return;
    }

    const total = this.getTotal();

    if (!this.validateStock()) {
      return;
    }

    this._ordersService.createOrder(id_usuario, total).subscribe({
      next: (response: any) => {
        const order = response as Order;
        const id_pedidos = order.id_pedidos!;
        this.setIdPedido(id_pedidos);


        from(this.cartProducts)
          .pipe(
            concatMap((product) => {
              const cantidad = this.cantidadProd(product);
              const subtotal = cantidad * product.precio;
              const orderProduct: OrderProduct = {
                id_pedidos: id_pedidos,
                id_producto: product.id_productos!,
                cantidad: cantidad,
                subtotal: subtotal,

              };

              this.modifyStock(product.id_productos!, cantidad);

              return this._ordersProduct.createOrderProduct(orderProduct);

            })
          )
          .subscribe({
            next: (response) => {

            },
            error: (errorMessage) => {
              this.toastr.error(errorMessage, 'Error al añadir un producto al pedido');
            },
            complete: () => {
              this.finalizeOrder();
            },
          });
      },
      error: (errorMessage) => {
        console.error(errorMessage);
        this.toastr.error('Error al crear el pedido');
      },
    });
  }

  finalizeOrder() {
    localStorage.removeItem('cart');
    this.cartProducts = [];
    this.toastr.success('Estamos procesando tu pedido', 'Pedido Creado', { timeOut: 10000 });
  }

  setIdPedido(id: number) {
    this.id_pedidos = id;

  }

  modifyStock(id: number, cant: number) {
    this._productService.getProductById(id).subscribe((product: any) => {
      if (product[0].stock === 0) {
        this.toastr.error('No hay stock disponible', 'Error');
        return;
      } else {
        product[0].stock = product[0].stock - cant;
        this._productService.updateProduct(id, product[0]).subscribe(() => {
          console.log('Stock actualizado');
        });
      }

    })
  }

  validateStock(): boolean {
    for (const product of this.cartProducts) {
      if (product.stock < this.cantidadProd(product)) {
        this.toastr.error('No hay stock disponible de ' + product.nombre_producto, 'Error');
        return false;
      }
    }
    return true;
  }

  setCartProducts() {
    this.cartProducts = [];
    this.cartProductsRepeated.forEach((product) => {
      if (!this.cartProducts.find((prod) => prod.id_productos === product.id_productos)) {
        this.cartProducts.push(product);
      }
    });

  }

  cantidadProd(product: Product) {
    product.cantidad = this.cartProductsRepeated.filter((prod) => prod.id_productos == product.id_productos).length;
    return product.cantidad;
  }

  getTotal() {
    let total = 0;
    this.cartProductsRepeated.forEach((product) => {
      total += product.precio;
    });
    return total;
  }

  DeleteItem(product: Product) {
    this.cartProductsRepeated = this.cartProductsRepeated.filter(prod => prod.id_productos !== product.id_productos);
    localStorage.setItem('cart', JSON.stringify(this.cartProductsRepeated));
    this.setCartProducts();

  }

  SumCant(product: Product) {
    this.cartProductsRepeated.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cartProductsRepeated));
  }

  ResCant(product: Product) {
    const sizeProd = this.cartProductsRepeated.filter(prod => prod.id_productos === product.id_productos).length;
    if (sizeProd === 0) {
      this.cartProducts = this.cartProducts.filter(prod => prod.id_productos !== product.id_productos);
    } else {
      const index = this.cartProductsRepeated.findIndex(prod => prod.id_productos === product.id_productos);
      this.cartProductsRepeated.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cartProductsRepeated));
      this.setCartProducts();
    }
  }
}



