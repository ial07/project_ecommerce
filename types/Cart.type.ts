import { Product } from "./Product";

export interface CartItem {
  id: number;
  productId: number;
  qty: number;
  priceSnapshot: number;
  subtotal: number;
  product: Product; // re-use your existing Product type
}

export interface Cart {
  cartId: number;
  items: CartItem[];
  grandTotal: number;
}