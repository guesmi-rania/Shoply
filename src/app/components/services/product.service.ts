import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Produit Gateaux', description: 'Gateaux Soirées', price: 19.99, image: 'https://via.placeholder.com/300' },
    { id: 2, name: 'Produit Millefeuilles', description: 'Millefeuilles Noisette', price: 29.99, image: 'https://via.placeholder.com/300' },
    { id: 3, name: 'Produit Cookies', description: 'Cookies Chocolat', price: 39.99, image: 'https://via.placeholder.com/300' }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
