import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { ProductCardsComponent } from '../../Components/product-cards/product-cards.component';
import axios from 'axios';

interface ItemObject {
  Image: string;
  Name: string;
  Price: number;
  Description: string;
  Rating: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, ProductCardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  cards: any = [];
  ngOnInit() {
    this.loadAllCards();
    // console.log('hello');
    // axios
    //   .get('http://localhost:3000/api/v1/products/getallproducts')
    //   .then((res) => {
    //     console.log(res.data.data);
    //     this.cards = res.data.data;
    //   });
    // axios
    //   .post('http://localhost:3000/api/v1/products/addproduct', {
    //     productName: 'Second product',
    //     price: 564,
    //     description: 'Some description',
    //     image: 'url aayega yaha',
    //     otherImages: [
    //       {
    //         first: 'url here of first',
    //       },
    //       {
    //         second: 'url here',
    //       },
    //     ],
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  loadAllCards() {
    axios
      .get('http://localhost:3000/api/v1/products/getallproducts')
      .then((res) => {
        console.log(res.data.data);
        this.cards = res.data.data;
      });
  }
  loadCategoryData(categoryName: string) {
    console.log(categoryName);
    axios
      .get('http://localhost:3000/api/v1/products/getproductbycategory', {
        params: {
          category: categoryName,
        },
      })
      .then((response) => {
        // handle success
        this.cards = response.data.data;
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }
  // items: Array<ItemObject> = [
  //   {
  //     Name: 'Not Provided',
  //     Image: '../../../assets/dev-images/card-1.png',
  //     Price: 100,
  //     Description: 'Running Nike- Collection 2022',
  //     Rating: '5.0',
  //   },
  //   {
  //     Name: 'Not Provided',
  //     Image: '../../../assets/dev-images/card-1.png',
  //     Price: 100,
  //     Description: 'Running Nike- Collection 2022',
  //     Rating: '5.0',
  //   },
  //   {
  //     Name: 'Not Provided',
  //     Image: '../../../assets/dev-images/card-1.png',
  //     Price: 100,
  //     Description: 'Running Nike- Collection 2022',
  //     Rating: '5.0',
  //   },
  //   {
  //     Name: 'Not Provided',
  //     Image: '../../../assets/dev-images/card-1.png',
  //     Price: 100,
  //     Description: 'Running Nike- Collection 2022',
  //     Rating: '5.0',
  //   },
  //   {
  //     Name: 'Not Provided',
  //     Image: '../../../assets/dev-images/card-1.png',
  //     Price: 100,
  //     Description: 'Running Nike- Collection 2022',
  //     Rating: '5.0',
  //   },
  //   {
  //     Name: 'Not Provided',
  //     Image: '../../../assets/dev-images/card-1.png',
  //     Price: 100,
  //     Description: 'Running Nike- Collection 2022',
  //     Rating: '5.0',
  //   },
  // ];

  devImages = [
    {
      primary: '../../../assets/dev-images/landscape1.jpg',
      secondary: '../../../assets/dev-images/portrait1.jpg',
    },
    {
      primary: '../../../assets/dev-images/landscape2.jpg',
      secondary: '../../../assets/dev-images/portrait2.jpg',
    },
    {
      primary: '../../../assets/dev-images/landscape3.jpg',
      secondary: '../../../assets/dev-images/portrait3.jpg',
    },
  ];

  swiper: Swiper | null = null;
  ngAfterViewInit() {
    this.swiper = new Swiper('.swiper', {
      modules: [Pagination],
      direction: 'vertical',
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }
}
