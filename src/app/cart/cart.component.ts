import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
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
  }
}
