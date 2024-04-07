import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import axios from 'axios';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // ngOnInit() {
  //   console.log('hello');
  //   axios.get('http://localhost:3000/products').then((res) => {
  //     console.log(res.data);
  //   });
  // }
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
