import { Component } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import axios from 'axios';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
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
  
  swiper: Swiper | null = null;
  ngOnInit() {
    this.swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination],
      // Optional parameters
      direction: 'vertical',
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
