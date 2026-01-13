import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] = [
    { id: 1, name: 'Gâteau au chocolat', description: 'Fondant et délicieux', price: 10, image: 'assets/images/chocolate-cake.jpg' },
    { id: 2, name: 'Tarte aux fraises', description: 'Fraîche et gourmande', price: 12, image: 'assets/images/strawberry-tart.jpg' },
  ];

  constructor(public cartService: CartService) {}

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
