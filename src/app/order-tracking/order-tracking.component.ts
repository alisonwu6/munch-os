import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-tracking',
  imports: [],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.scss'
})
export class OrderTrackingComponent {
  constructor(private route: ActivatedRoute) {
    const orderId = this.route.snapshot.paramMap.get('id');
    console.log(orderId);
  }
}
