import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import axios from 'axios';
import { GlobalItemsService } from '../../Services/global-items.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent {
  // user_name: string = 'sahyog user';
  // user_address: string =
  //   'Sahyog College, beside Siddhivinayak Temple, Jambhali Naka, Thane West, Thane, Maharashtra 400601';
  // user_phonenumber: number = 8422882287;
  total_price: number = 0;
  myCartArrayOfObjects: any[] = [{}];
  islogin: Boolean = false;
  yourIsLoggedInServiceSubscription: Subscription;
  constructor(private globalService: GlobalItemsService) {
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
  userToken: any = '';
  phoneNumber: any = '';
  name: any = '';
  address: any = '';

  ngOnInit() {
    let localItem = localStorage.getItem('myCartData');
    if (localItem != null) {
      this.myCartArrayOfObjects = JSON.parse(localItem);
      this.myCartArrayOfObjects.forEach(
        (elem) => (this.total_price += elem.price)
      );
    }
    this.userToken = localStorage.getItem('userToken');
    if (this.userToken != null && this.userToken != undefined) {
      axios
        .get('http://localhost:3000/api/v1/users/getuserbyidwithpass', {
          params: {
            _id: this.userToken,
          },
        })
        .then((res) => {
          let data = res.data.data;
          if (data) {
            console.log(data);

            this.phoneNumber = data.phonenumber
              ? data.phonenumber
              : this.phoneNumber;
            this.name = data.username;
            this.address = data.address ? data.address : this.address;
          }
        });
    }
  }
  totalUpdate() {
    let localItem = localStorage.getItem('myCartData');
    let myCartArray = [];
    if (localItem != null) {
      myCartArray = JSON.parse(localItem);
      this.total_price = 0;
      myCartArray.forEach((elem: any) => (this.total_price += elem.price));
    } else {
      this.total_price = 0;
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
          this.totalUpdate();
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
        this.totalUpdate();
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
        this.totalUpdate();
        break;
      }
    }
  }

  handleContinue() {}
}
