import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-cart',
  imports: [ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  orderForm = new FormGroup({
    customerName: new FormControl('', Validators.required),
    notes: new FormControl(''),
  });
 onSubmit() {
  if (!this.orderForm.valid) {
    console.log('this.orderForm.valid', this.orderForm.valid);
    return;
  }
  // console.log(this.orderForm.value);
}
}
