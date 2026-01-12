import { Component, HostListener } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen: boolean = false;

  // Déclaration de cartCount
  cartCount: number = 0;

  constructor(private cartService: CartService) {
    // Abonnement pour mettre à jour le compteur du panier
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart.length;
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) navbar?.classList.add('shrink');
    else navbar?.classList.remove('shrink');
  }
}
