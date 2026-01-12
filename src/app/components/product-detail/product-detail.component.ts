import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service'; // exemple si le service est dans components

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  product: any;

  constructor(route: ActivatedRoute, service: ProductService) {
    const id = Number(route.snapshot.paramMap.get('id'));
    this.product = service.getProductById(id);
  }
}
