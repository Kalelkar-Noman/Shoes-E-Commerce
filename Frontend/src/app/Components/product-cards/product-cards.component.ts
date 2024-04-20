import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

interface ItemObject {
  _id: string;
  image: string;
  productName: string;
  price: number;
  category: string;
  description: string;
  rating: string;
  otherImages: [];
}

@Component({
  selector: 'app-product-cards',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './product-cards.component.html',
  styleUrl: './product-cards.component.css',
})
export class ProductCardsComponent {
  @Input() cardItems: Array<ItemObject> = [
    {
      _id: '',
      productName: 'Not Provided',
      image: '../../../assets/dev-images/card-1.png',
      category: 'shoes',
      price: 100,
      description: 'Running Nike- Collection 2022',
      rating: '5.0',
      otherImages: [],
    },
  ];

  constructor(private router: Router) {}

  navigateToDetails(itemId: string) {
    this.router.navigate(['home/product-details/', itemId]);
  }
}
