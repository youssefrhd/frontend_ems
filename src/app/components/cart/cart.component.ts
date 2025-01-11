import { Component, OnInit, Signal, signal } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import { Product } from '../../models/product';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  totalAmount = signal(0);
  quantity = signal<number>(1);

  cartSignal = signal<CartItem[]>([]); // Use reactive signal for cart items

  constructor() {}

  ngOnInit(): void {
    this.loadCartFromLocalStorage(); // Load from localStorage
    this.calculateTotal(); // Calculate initial total
  }

  loadCartFromLocalStorage(): void {
    const cartData = localStorage.getItem('cart'); // Read cart data from localStorage
    if (cartData) {
      const cartItems: CartItem[] = JSON.parse(cartData); // Parse the data
      this.cartSignal.set(cartItems); // Set the signal to the loaded cart items
    } else {
      this.cartSignal.set([]); // If no cart exists, set an empty array
    }
  } 
  clearCart(): void {
    localStorage.removeItem('cart'); // Remove cart from localStorage
    this.cartSignal.set([]); // Clear the signal
  }
  removeItem(cartItem: CartItem): void {
    const index = this.cartSignal().findIndex(item => item.product.product_id === cartItem.product.product_id);
    if (index !== -1) {
      this.cartSignal.update(cart => cart.filter((_, i) => i !== index));  // Update the signal
      localStorage.setItem('cart', JSON.stringify(this.cartSignal()));  // Update localStorage
      this.calculateTotal();  // Recalculate total
    }
  }

  updateQuantity(cartItem: CartItem, event: Event): void {
    // Cast the event target to an HTMLInputElement to access the value
    const input = event.target as HTMLInputElement;
    const quantityValue = Number(input.value);  // Convert input value to a number
  
    if (quantityValue >= 1) {
      // Update the item's quantity
      cartItem.quantity = quantityValue;
  
      // Update the cartSignal to trigger the UI update
      this.cartSignal.update(cart => {
        // Find the index of the item in the cart
        const index = cart.findIndex(item => item.product.product_id === cartItem.product.product_id);
        if (index !== -1) {
          // Update the item at the specific index
          cart[index] = cartItem;
        }
        return [...cart];  // Return a new cart array to trigger reactivity
      });
  
      // Store updated cart in localStorage
      localStorage.setItem('cart', JSON.stringify(this.cartSignal()));
  
      // Recalculate the total
      this.calculateTotal();
    } else {
      // Optional: Handle invalid quantity (e.g., less than 1)
      alert('Quantity must be greater than or equal to 1');
    }
  }


  /*handleAddToCart(product: Product): void {
    const existingProduct = this.cartSignal().find((item) => item.product.product_id === product.product_id);
    if (existingProduct) {
      alert('This product is already in the cart.');
      return;
    }

    const newCartItem = new CartItem(product, 1);
    this.cartSignal.update(cart => [...cart, newCartItem]); // Update signal

    localStorage.setItem('cart', JSON.stringify(this.cartSignal())); // Store updated cart
    alert('Product added to cart!');
  }*/


  calculateTotal(): void {
    const totalValue = this.cartSignal().reduce((acc, item) => {
      return acc + this.updatedPrice(item.product) * item.quantity;
    }, 0);
    this.totalAmount.set(totalValue);  // Update total signal
  }

  updatedPrice(product: Product): number {
    return product ? product.unit_price - product.unit_price * (product.discount / 100) : 0;
  }
  get totalPrice(): number {
    const subtotal = this.totalAmount();
    const shippingCharges = 150; // You can replace this with dynamic data
    return subtotal + shippingCharges;
  }
  

  /*saveOrder(): void {
    const order = {
      totalAmount: this.totalAmount(),
      cartItems: this.cartSignal().map(item => ({
        productId: item.product.product_id,
        quantity: item.quantity,
        updatedPrice: this.updatedPrice(item.product),
      })),
    };

    this.cartService.saveOrder(order).subscribe(response => {
      console.log('Order saved successfully!', response);
    });
  }*/

  trackByFn(index: number, cartItem: CartItem): any {
    return cartItem.product.product_id; 
}
}
