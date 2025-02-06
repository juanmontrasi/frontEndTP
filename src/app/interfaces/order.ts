export interface Order {
  id_pedidos?: number;
  fecha_pedido: Date;
  total: number;
  id_cliente: number;
  estado: string;
  estado_pago: string;
}