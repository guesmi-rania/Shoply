import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categories = [
    { name: 'Accessoires', icon: '👜', color: '#f4e4d4' },
    { name: 'Vêtements',   icon: '👗', color: '#d4eaf4' },
    { name: 'Chaussures',  icon: '👠', color: '#d4f4e4' },
    { name: 'Beauté',      icon: '✨', color: '#f4d4e8' },
    { name: 'Montres',     icon: '⌚', color: '#e8d4f4' },
  ];

  stats = [
    { value: '50k+', label: 'Clients satisfaits' },
    { value: '500+', label: 'Produits disponibles' },
    { value: '24h',  label: 'Livraison express' },
    { value: '4.9★', label: 'Note moyenne' },
  ];
}