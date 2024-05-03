import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductCardsComponent } from '../product-cards/product-cards.component';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { GlobalItemsService } from '../../Services/global-items.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, ProductCardsComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  access: Boolean = false;
  islogin: Boolean = false;
  searchInput: string = '';
  cards: any = [];
  yourAccessServiceSubscription: Subscription;
  yourIsLoggedInServiceSubscription: Subscription;
  constructor(
    private router: Router,
    private globalService: GlobalItemsService
  ) {
    this.yourAccessServiceSubscription =
      this.globalService.UserAccess.subscribe((data: boolean) => {
        this.access = data;
      });
    this.yourIsLoggedInServiceSubscription =
      this.globalService.UserLoggedInStatus.subscribe((data: boolean) => {
        this.islogin = data;
      });
    // this.yourCartSubscription = this.globalService.UserCart.subscribe(
    //   (data: any) => {
    //     this.myCartArrayOfObjects = data;
    //   }
    // );
  }

  ngOnInit() {
    let userToken = localStorage.getItem('userToken');
    if (userToken != null && userToken != undefined) {
      axios
        .get('http://localhost:3000/api/v1/users/getuserbyid', {
          params: {
            _id: userToken,
          },
        })
        .then((res) => {
          if (res.data.data) {
            // this.islogin = true;
            this.globalService.setUserLoggedInStatus(true);
            if (res.data.data.usertype != 'normal') {
              // this.access = true;
              this.globalService.setAccess(true);
            }
          }
        });
    }
  }
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

  logOut() {
    localStorage.removeItem('userToken');
    this.islogin = false;
    this.access = false;
  }

  clearCards() {
    this.cards = [];
    this.searchInput = '';
  }

  // side Panel
  myCartArrayOfObjects: any[] = [];

  async ngAfterViewInit() {
    let localItem = localStorage.getItem('myCartData');
    if (localItem != null) {
      this.myCartArrayOfObjects = JSON.parse(localItem);
    }
  }

  addToCart(product: any, e: Event) {
    e.stopPropagation();
    e.preventDefault();
    let mycartobj = {
      id: product._id,
      name: product.productName,
      img: product.image,
      oldprice: product.price,
      price: product.item_price,
      quantity: 1,
    };
    let isDuplicate = false;
    if (this.myCartArrayOfObjects.length > 0) {
      isDuplicate = this.myCartArrayOfObjects.some(
        (obj) => obj.id == mycartobj.id
      );
      if (!isDuplicate) {
        this.myCartArrayOfObjects = [...this.myCartArrayOfObjects, mycartobj];

        localStorage.setItem(
          'myCartData',
          JSON.stringify(this.myCartArrayOfObjects)
        );
        // document.getElementById('mySidepanel')?.classList.add('active');
      }
    } else {
      this.myCartArrayOfObjects.push(mycartobj);
      this.globalService.setCart(this.myCartArrayOfObjects);
      localStorage.setItem(
        'myCartData',
        JSON.stringify(this.myCartArrayOfObjects)
      );
      // document.getElementById('mySidepanel')?.classList.add('active');
    }
    document.getElementById('mySidepanel')?.classList.toggle('active');
  }

  cartOpenClose() {
    document.getElementById('mySidepanel')?.classList.toggle('active');
    let localItem = localStorage.getItem('myCartData');
    if (localItem != null) {
      this.myCartArrayOfObjects = JSON.parse(localItem);
    }
  }

  minusbtn(id: any) {
    for (let i = 0; i < this.myCartArrayOfObjects.length; i++) {
      if (this.myCartArrayOfObjects[i].id === id) {
        this.myCartArrayOfObjects[i].quantity -= 1;

        if (this.myCartArrayOfObjects[i].quantity <= 0) {
          // Update price and display
          this.myCartArrayOfObjects.splice(i, 1);
          localStorage.setItem(
            'myCartData',
            JSON.stringify(this.myCartArrayOfObjects)
          );
          break;
        }
        this.myCartArrayOfObjects[i].price =
          parseInt(this.myCartArrayOfObjects[i].oldprice) *
          parseInt(this.myCartArrayOfObjects[i].quantity);
        // Save updated cart data to localStorage
        localStorage.setItem(
          'myCartData',
          JSON.stringify(this.myCartArrayOfObjects)
        );
        break; // Exit the loop after finding and processing the item
      }
    }
  }
  plusbtn(id: any) {
    for (let i = 0; i < this.myCartArrayOfObjects.length; i++) {
      if (this.myCartArrayOfObjects[i].id == id) {
        this.myCartArrayOfObjects[i].quantity =
          parseInt(this.myCartArrayOfObjects[i].quantity) + 1;
        this.myCartArrayOfObjects[i].price =
          parseInt(this.myCartArrayOfObjects[i].oldprice) *
          parseInt(this.myCartArrayOfObjects[i].quantity);

        localStorage.setItem(
          'myCartData',
          JSON.stringify(this.myCartArrayOfObjects)
        );
        break;
      }
    }
  }
}
