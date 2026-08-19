import { Routes } from '@angular/router';
import { MenuListComponent } from './menu-list/menu-list.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: MenuListComponent },
  { path: 'cart', component: CartComponent },
];
