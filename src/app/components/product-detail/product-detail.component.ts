import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product!: Product;
  products: Product[] = [
    { id: 1, name: 'Gâteau au chocolat', description: 'Fondant et délicieux', price: 10, image: 'assets/images/chocolate-cake.jpg' },
    { id: 2, name: 'Tarte aux fraises', description: 'Fraîche et gourmande', price: 12, image: 'assets/images/strawberry-tart.jpg' },
  ];

  constructor(private route: ActivatedRoute, private cartService: CartService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find(p => p.id === id)!;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
