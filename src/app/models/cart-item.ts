import { Product } from "./product";

export class CartItem {
    id: number; // Unique identifier for the cart item
  product: Product; // Reference to the product
  quantity: number; // Quantity of the product in the cart

  constructor(product: Product, quantity: number = 1) {
    this.id = Date.now(); // Generate a unique ID based on timestamp
    this.product = product;
    this.quantity = quantity;
  }
}
