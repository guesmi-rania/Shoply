import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: Product[] = [];
  step = 1; // 1: Livraison, 2: Paiement, 3: Confirmation

  // Livraison
  firstName = '';
  lastName = '';
  phone = '';
  address = '';
  city = '';
  governorate = '';
  postalCode = '';

  // Paiement
  paymentMethod = '';

  // Carte bancaire
  cardNumber = '';
  cardName = '';
  cardExpiry = '';
  cardCvv = '';

  loading = false;
  orderSuccess = false;
  orderNumber = '';

  governorates = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan',
    'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana', 'Sousse',
    'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid',
    'Gabès', 'Médenine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kébili'
  ];

  paymentMethods = [
    {
      id: 'carte',
      label: 'Carte bancaire',
      desc: 'Visa, Mastercard, CIB',
      icon: '💳'
    },
    {
      id: 'd17',
      label: 'D17',
      desc: 'Paiement via portefeuille D17',
      icon: '📱'
    },
    {
      id: 'poste',
      label: 'Mandat CCP / Poste',
      desc: 'Paiement via La Poste Tunisienne',
      icon: '🏦'
    },
    {
      id: 'livraison',
      label: 'Paiement à la livraison',
      desc: 'Payez en espèces à la réception',
      icon: '🚚'
    }
  ];

  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cart = items;
      if (items.length === 0 && !this.orderSuccess) {
        this.router.navigate(['/cart']);
      }
    });
  }

  getSubtotal(): number {
    return this.cart.reduce((t, i) => t + i.price, 0);
  }

  getDelivery(): number {
    return this.getSubtotal() >= 200 ? 0 : 7;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getDelivery();
  }

  nextStep(): void {
    if (this.step < 3) this.step++;
  }

  prevStep(): void {
    if (this.step > 1) this.step--;
  }

  isStep1Valid(): boolean {
    return !!(this.firstName && this.lastName && this.phone && this.address && this.city && this.governorate);
  }

  isStep2Valid(): boolean {
    if (!this.paymentMethod) return false;
    if (this.paymentMethod === 'carte') {
      return !!(this.cardNumber && this.cardName && this.cardExpiry && this.cardCvv);
    }
    return true;
  }

  placeOrder(): void {
    this.loading = true;
    setTimeout(() => {
      this.orderNumber = 'SH-' + Math.floor(100000 + Math.random() * 900000);
      this.orderSuccess = true;
      this.loading = false;
      this.cartService.clearCart();
      this.step = 3;
    }, 2000);
  }

  formatCard(value: string): void {
    this.cardNumber = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  }

  formatExpiry(value: string): void {
    const v = value.replace(/\D/g, '');
    this.cardExpiry = v.length >= 2 ? v.slice(0, 2) + '/' + v.slice(2, 4) : v;
  }
}