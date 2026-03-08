import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);

  cart$: Observable<Product[]> = this.cartSubject.asObservable();

  cartCount$: Observable<number> = this.cartSubject.pipe(
    map(items => items.length)
  );

  addToCart(product: Product): void {
    this.cartItems = [...this.cartItems, product];
    this.cartSubject.next(this.cartItems);
    console.log('✅ Produit ajouté:', product.name, '| Total:', this.cartItems.length);
  }

  removeFromCart(index: number): void {
    this.cartItems = this.cartItems.filter((_, i) => i !== index);
    this.cartSubject.next(this.cartItems);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next([]);
  }

  getCart(): Product[] {
    return this.cartItems;
  }

  getCartCount(): number {
    return this.cartItems.length;
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
}