import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service'; // exemple si le service est dans components

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Récupère les produits depuis le service
    this.products = this.productService.getProducts();
  }

  addToCart(product: any) {
    // Méthode pour ajouter au panier
    console.log('Produit ajouté au panier :', product);

    // Si tu as un CartService, décommente et utilise-le
    // this.cartService.addToCart(product);
  }
}
