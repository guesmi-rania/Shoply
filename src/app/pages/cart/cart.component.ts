import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Product[] = [];

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cart = items;
    });
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.price, 0);
  }

  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}