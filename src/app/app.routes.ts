import { Routes } from '@angular/router';
import { MenuListComponent } from './menu-list/menu-list.component';
import { CartComponent } from './cart/cart.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminInventoryComponent } from './admin/admin-inventory/admin-inventory.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';

export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: MenuListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders/:id', component: OrderTrackingComponent },
  { path: 'admin/orders', component: AdminOrdersComponent },
  { path: 'admin/inventory', component: AdminInventoryComponent },
  { path: 'admin/menu', component: AdminMenuComponent },
];
