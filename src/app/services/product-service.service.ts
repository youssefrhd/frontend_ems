import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private productsSignal = signal<Product[]>([]);
  public products = computed(() => this.productsSignal());
  private apiUrl = 'http://localhost:8080/api/products'; 

  constructor(private http:HttpClient) { }
  loadProducts(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => this.productsSignal.set(data),
      error: (err) => {
        console.error('Failed to fetch products:', err);
      },
    });
  }
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/searchProduct/${productId}`);
  }
}
