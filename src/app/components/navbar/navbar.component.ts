import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isVisible = true;
  isScrolled = false;
  menuOpen = false;
  cartCount = 0; // ✅ réactif

  private subs = new Subscription();
  private readonly AUTH_ROUTES = ['/login', '/register'];

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkVisibility(this.router.url);

    // ✅ S'abonner au panier pour mise à jour automatique du badge
    this.subs.add(
      this.cartService.cartCount$.subscribe(count => {
        this.cartCount = count;
      })
    );

    this.subs.add(
      this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe((e: NavigationEnd) => {
          const url = e.urlAfterRedirects.replace(/^#/, '');
          this.checkVisibility(url);
          this.menuOpen = false;
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private checkVisibility(url: string): void {
    const cleanUrl = url.split('?')[0].split('#')[0];
    this.isVisible = !this.AUTH_ROUTES.some(
      route => cleanUrl === route || cleanUrl.startsWith(route)
    );
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
}