import { Component } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'app-menu-list',
  imports: [MenuItemComponent],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss'
})
export class MenuListComponent {
  menuItems = [
    { id: 1, name: '火腿蛋吐司', price: 13 },
    { id: 2, name: '肉鬆起司蛋吐司', price: 14 },
    { id: 3, name: '素肉鬆吐司', price: 16 },
    { id: 4, name: '台式豬肉吐司', price: 18 },
  ];
}
