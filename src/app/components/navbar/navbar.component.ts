import { Component, OnInit } from '@angular/core';
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
    // Masquer sur les pages auth
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.isVisible = !this.AUTH_ROUTES.includes(e.urlAfterRedirects);
        this.menuOpen = false;
      });

    // Vérification initiale
    this.isVisible = !this.AUTH_ROUTES.includes(this.router.url);

    // Effet scroll
    window.addEventListener('scroll', () => {
      this.isScrolled = window.scrollY > 20;
    });
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