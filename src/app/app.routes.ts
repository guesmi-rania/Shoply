import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { authGuard } from './guards/auth.guard';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
  { path: '',            redirectTo: 'home', pathMatch: 'full' },
  { path: 'login',       component: LoginComponent },
  { path: 'register',    component: RegisterComponent },
  { path: 'home',        component: HomeComponent,            canActivate: [authGuard] },
  { path: 'products',    component: ProductListComponent,     canActivate: [authGuard] },
  { path: 'product/:id', component: ProductDetailComponent,   canActivate: [authGuard] },
  { path: 'cart',        component: CartComponent,            canActivate: [authGuard] },
  { path: 'contact',     component: ContactComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: '**',          redirectTo: 'login' }
];