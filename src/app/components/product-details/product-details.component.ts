import { Component, computed, OnInit, signal, ɵunwrapWritableSignal} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductServiceService } from '../../services/product-service.service';
import { CartItem } from '../../models/cart-item';


@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  product =signal<Product | null>(null);

  // Reactive computation for updated price
  updatedPrice = computed(() => {
    const product = this.product();
    return product
      ? product.unit_price - (product.unit_price * (product.discount / 100))
      : 0; // Default to 0 if product is undefined
  });

  // Signal for quantity
  quantity = signal(1);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductServiceService
  ) {}

  ngOnInit(): void {
    this.getProduct();
    
  }
  getProduct(){
    const productId = Number(this.route.snapshot.paramMap.get('productId'));
    if (productId) {
      // Fetch product details
      this.productService.getProductById(productId).subscribe(
        (product) => this.product.set(product),
        (error) => console.error('Error fetching product:', error)
      );
    }
  }
  addToCart() {
      const cart = this.getCartFromLocalStorage(); // Get the cart from localStorage
      const currProd=this.product()!;
      const existingProductIndex = cart.findIndex(item => item.product.product_id === this.product()?.product_id);
  
      if (existingProductIndex === -1) {
        // If the product isn't already in the cart, add it
        cart.push(new CartItem(currProd, this.quantity())); // Assuming CartItem model takes product and quantity
      } else {
        // If the product is already in the cart, update the quantity
        cart[existingProductIndex].quantity += 1; // Increment quantity
      }
  
      // Store updated cart back to localStorage
      this.saveCartToLocalStorage(cart);
  
  
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

  // Methods to update quantity
  increaseQuantity() {
    this.quantity.update((value) => value + 1);
  }

  decreaseQuantity() {
    this.quantity.update((value) => (value > 1 ? value - 1 : value));
  }
  
}



