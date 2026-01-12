import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = false;
  isShrunk = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    const hamburger = document.querySelector('.hamburger');
    hamburger?.classList.toggle('active');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isShrunk = window.scrollY > 50;
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (this.isShrunk) {
        navbar.classList.add('shrink');
      } else {
        navbar.classList.remove('shrink');
      }
    }
  }
}
