import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { timeout, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  loading = true;
  added = false;
  error = '';
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(id).pipe(
      timeout(15000),
      catchError(err => {
        this.error = err.name === 'TimeoutError'
          ? 'Le serveur met trop de temps à répondre. Réessayez dans quelques secondes.'
          : 'Produit introuvable.';
        this.loading = false;
        return throwError(() => err);
      })
    ).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      }
    });
  }

  addToCart(): void {
    for (let i = 0; i < this.quantity; i++) {
      this.cartService.addToCart(this.product);
    }
    this.added = true;
    setTimeout(() => this.added = false, 2500);
  }

  increment(): void { if (this.quantity < 10) this.quantity++; }
  decrement(): void { if (this.quantity > 1) this.quantity--; }
}