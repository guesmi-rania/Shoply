import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isVisible = true;
  isScrolled = false;
  menuOpen = false;

  private readonly AUTH_ROUTES = ['/login', '/register'];

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Vérification initiale
    this.checkVisibility(this.router.url);

    // Masquer sur les pages auth
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        // Avec HashLocation, urlAfterRedirects = '/' mais url = '/login'
        // On nettoie le hash si présent
        const url = e.urlAfterRedirects.replace(/^#/, '');
        this.checkVisibility(url);
        this.menuOpen = false;
      });
  }

  private checkVisibility(url: string): void {
    // Nettoyer les query params et fragments
    const cleanUrl = url.split('?')[0].split('#')[0];
    this.isVisible = !this.AUTH_ROUTES.some(route => cleanUrl === route || cleanUrl.startsWith(route));
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 20;
  }

  logout(): void {
    this.authService.logout();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  get userName(): string {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user?.name?.split(' ')[0] || 'Compte';
    } catch {
      return 'Compte';
    }
  }

  get cartCount(): number {
    return this.cartService.getCartCount();
  }
}