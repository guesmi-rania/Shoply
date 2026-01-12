import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() {}

  private products = [
    { id: 1, name: 'Produit A', description: 'Description A', price: 19.99, image: 'https://via.placeholder.com/300' },
    { id: 2, name: 'Produit B', description: 'Description B', price: 29.99, image: 'https://via.placeholder.com/300' },
    { id: 3, name: 'Produit C', description: 'Description C', price: 39.99, image: 'https://via.placeholder.com/300' }
  ];

  getProducts() {
    return this.products;
  }

  // ✅ Nouvelle méthode
  getProductById(id: number) {
    return this.products.find(product => product.id === id);
  }
}
