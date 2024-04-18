import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

interface ItemObject {
  Image: string;
  Name: string;
  Price: number;
  Description: string;
  Rating: string;
}

@Component({
  selector: 'app-product-cards',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product-cards.component.html',
  styleUrl: './product-cards.component.css',
})
export class ProductCardsComponent {
  @Input() cardItems: Array<ItemObject> = [
    {
      Name: 'Not Provided',
      Image: '../../../assets/dev-images/card-1.png',
      Price: 100,
      Description: 'Running Nike- Collection 2022',
      Rating: '5.0',
    },
  ];
}
