import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-menu-item',
  imports: [MatCardModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
})
export class MenuItemComponent {
  // name:string = '火腿蛋吐司';
  // price:number = 100;
  @Input() name: string = '';
  @Input() price: number = 0;
}
