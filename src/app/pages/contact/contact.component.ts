import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name = '';
  email = '';
  subject = '';
  message = '';
  loading = false;
  success = false;
  error = '';

  onSubmit(): void {
    if (!this.name || !this.email || !this.message) {
      this.error = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
    this.loading = true;
    this.error = '';

    // Simulation envoi (à connecter à un vrai service email)
    setTimeout(() => {
      this.loading = false;
      this.success = true;
      this.name = '';
      this.email = '';
      this.subject = '';
      this.message = '';
    }, 1500);
  }
}