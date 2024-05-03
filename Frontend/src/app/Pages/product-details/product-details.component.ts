import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { ProductCardsComponent } from '../../Components/product-cards/product-cards.component';
import { GlobalItemsService } from '../../Services/global-items.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ProductCardsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalItemsService
  ) {}

  itemId: string = '';
  details: any = {};
  cards: any = [];
  myCartArrayOfObjects: any[] = [];

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

  addToCart() {
    console.log('clicked');

    let localItem = localStorage.getItem('myCartData');
    if (localItem != null) {
      this.myCartArrayOfObjects = JSON.parse(localItem);
    }
    const mycartobj = {
      id: this.details._id,
      name: this.details.productName,
      img: this.details.image,
      oldprice: this.details.price,
      price: this.details.price,
      quantity: 1,
    };

    // Check for duplicates based on item id
    const isDuplicate = this.myCartArrayOfObjects.some(
      (obj) => obj.id === mycartobj.id
    );

    if (!isDuplicate) {
      // If item is not a duplicate, add it to the cart
      this.myCartArrayOfObjects.push(mycartobj);

      // Update localStorage
      localStorage.setItem(
        'myCartData',
        JSON.stringify(this.myCartArrayOfObjects)
      );
    } else {
      // Handle duplicate item case if needed
      console.log('Item is already in the cart');
    }
  }
}
