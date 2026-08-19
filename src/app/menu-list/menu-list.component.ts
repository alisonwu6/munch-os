import { Component } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuService } from '../menu.service';
import { MenuItem } from '../models/menu-item.model';

@Component({
  selector: 'app-menu-list',
  imports: [MenuItemComponent],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss',
})
export class MenuListComponent {
  menuItems: MenuItem[] = [];

  constructor(private menuService: MenuService) {
    this.menuService.getMenuItems().subscribe((data) => {
      this.menuItems = data;
    });
  }
}
