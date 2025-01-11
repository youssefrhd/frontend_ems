import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { Product } from '../../models/product';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-products-list',
  standalone: false,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  @Output() ItemProduct=new EventEmitter<Product>();

 constructor(public productService:ProductServiceService){}
  ngOnInit(): void{
    this.productService.loadProducts();  
  }

  addToCart(product: Product) {
    const cart = this.getCartFromLocalStorage(); 
    const existingProductIndex = cart.findIndex(item => item.product.product_id === product.product_id);

    if (existingProductIndex === -1) {
      // If the product isn't already in the cart, add it
      cart.push(new CartItem(product, 1)); // Assuming CartItem model takes product and quantity
    } else {
      // If the product is already in the cart, update the quantity
      cart[existingProductIndex].quantity += 1; // Increment quantity
    }

    // Store updated cart back to localStorage
    this.saveCartToLocalStorage(cart);

    // Optionally emit the product to notify the parent component
    this.ItemProduct.emit(product);

    alert('Product added to cart!');
  }

  // Get cart from localStorage
  getCartFromLocalStorage(): CartItem[] {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  }

  // Save the updated cart to localStorage
  saveCartToLocalStorage(cart: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  
}

