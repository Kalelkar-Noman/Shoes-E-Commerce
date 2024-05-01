import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { ProductCardsComponent } from '../../Components/product-cards/product-cards.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ProductCardsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  constructor(private route: ActivatedRoute) {}

  itemId: string = '';
  details: any = {};
  cards: any = [];
  async ngOnInit() {
    this.itemId = this.route.snapshot.params['id'];
    if (this.itemId != null) {
      console.log(this.itemId);
      axios
        .get('http://localhost:3000/api/v1/products/getproductbyid', {
          params: {
            _id: this.itemId,
          },
        })
        .then((response) => {
          // handle success
          this.details = response.data.data;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
    if (this.details) {
      axios
        .get('http://localhost:3000/api/v1/products/getallproducts')
        .then((res) => {
          this.cards = res.data.data;
        });
    }
  }
}
