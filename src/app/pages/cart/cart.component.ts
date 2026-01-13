import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: Product[] = [];

  constructor(public cartService: CartService) {
    this.cart = this.cartService.getCart();
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.price, 0);
  }

  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
    this.cart = this.cartService.getCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cart = [];
  }
}
