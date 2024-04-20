import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductCardsComponent } from '../product-cards/product-cards.component';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, ProductCardsComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  access: boolean = false;
  islogin: Boolean = false;
  searchInput: string = '';
  cards: any = [];

  constructor(private router: Router) {}
  searchItems(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      axios
        .get('http://localhost:3000/api/v1/products/getproductbyname', {
          params: {
            name: this.searchInput,
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
  }
  toggleSearch() {
    document
      .getElementById('search-container')
      ?.classList.toggle('search_active');
  }

  toggleMobileNav() {
    document
      .getElementById('mobile-nav-view')
      ?.classList.toggle('mobile_nav_active');
  }

  loginUser() {
    if (!this.islogin) {
      this.router.navigate(['auth']);
    } else {
      this.router.navigate(['profile']);
    }
  }

  clearCards() {
    this.cards = [];
    this.searchInput = '';
  }
}
