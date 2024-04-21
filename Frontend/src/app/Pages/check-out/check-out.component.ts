import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent {
  user_name: string = 'sahyog user';
  user_address: string =
    'Sahyog College, beside Siddhivinayak Temple, Jambhali Naka, Thane West, Thane, Maharashtra 400601';
  user_phonenumber: number = 8422882287;
  total_price: number = 0;
  myCartArrayOfObjects = [
    {
      id: '1',
      name: 'Nike',
      img: '../../../assets/dev-images/card-1.png',
      price: '',
      quantity: '5',
    },
  ];
  minusbtn(id: any) {}
  plusbtn(id: any) {}

  handleContinue() {}
}
