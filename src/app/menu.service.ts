import { Injectable } from '@angular/core';
import { MenuItem } from './models/menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}
  menuItems: MenuItem[] = [
    { id: 1, name: '火腿蛋吐司', price: 13 },
    { id: 2, name: '肉鬆起司蛋吐司', price: 14 },
    { id: 3, name: '素肉鬆吐司', price: 16 },
    { id: 4, name: '台式豬肉吐司', price: 18 },
  ];
  getMenuItems() {
    return this.menuItems;
  }
}
