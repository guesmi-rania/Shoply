import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout, retry } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://shoply-backend-mbhq.onrender.com/api/products';

  constructor(private http: HttpClient) {
    // Wake up Render au démarrage de l'app
    this.http.get('https://shoply-backend-mbhq.onrender.com/').subscribe();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      timeout(30000),
      retry(2),
      catchError(err => {
        console.error('Erreur getProducts:', err);
        return throwError(() => err);
      })
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      timeout(30000),
      retry(2),
      catchError(err => {
        console.error('Erreur getProductById:', err);
        return throwError(() => err);
      })
    );
  }
}