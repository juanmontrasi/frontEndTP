export interface Product {
  id_productos?: number;    // ? pq es opcional
  nombre_producto: string;
  desc_producto: string;
  stock: number;
  precio: number;
  imagen: string;
}