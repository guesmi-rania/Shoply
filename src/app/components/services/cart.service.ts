import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product) {
    const current = this.cartSubject.value;
    this.cartSubject.next([...current, product]);
  }

  removeFromCart(product: Product) {
    const current = this.cartSubject.value.filter(p => p.id !== product.id);
    this.cartSubject.next(current);
  }
}
