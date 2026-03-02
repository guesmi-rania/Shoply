import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Product[]>([]);

  public cart$: Observable<Product[]> = this.cartSubject.asObservable();

  // Observable du nombre d'articles (pour le badge navbar en temps réel)
  public cartCount$: Observable<number> = this.cartSubject.pipe(
    map(cart => cart.length)
  );

  constructor() {}

  getCart(): Product[] {
    return this.cartSubject.value;
  }

  // Utilisé par le navbar pour le badge
  getCartCount(): number {
    return this.cartSubject.value.length;
  }

  addToCart(product: Product): void {
    const currentCart = this.cartSubject.value;
    this.cartSubject.next([...currentCart, product]);
  }

  removeFromCart(index: number): void {
    const currentCart = [...this.cartSubject.value];
    currentCart.splice(index, 1);
    this.cartSubject.next(currentCart);
  }

  clearCart(): void {
    this.cartSubject.next([]);
  }

  getTotal(): number {
    return this.cartSubject.value.reduce((total, item) => total + item.price, 0);
  }
}