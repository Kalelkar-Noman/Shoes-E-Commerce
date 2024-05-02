import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import { GlobalItemsService } from '../../Services/global-items.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  edit: boolean = false;
  phoneNumber: Number = 0;
  emailaddress: string = '';
  name: string = '';
  passVisibility: string = 'password';
  passwordtext: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  country: string = '';
  pincode: number = 0;
  userToken: any = '';
  constructor(
    private router: Router,
    private globalService: GlobalItemsService
  ) {}

  ngOnInit() {
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
            this.emailaddress = data.email;
            this.name = data.username;
            this.passwordtext = data.password;
            this.address = data.address ? data.address : this.address;
            this.city = data.city ? data.city : this.city;
            this.state = data.state ? data.state : this.state;
            this.country = data.country ? data.country : this.country;
            this.pincode = data.pincode ? data.pincode : this.pincode;
          }
        });
    } else {
      this.router.navigate(['/']);
    }
  }

  togglePassVisibility() {
    if (this.passVisibility == 'password') {
      this.passVisibility = 'text';
    } else {
      this.passVisibility = 'password';
    }
  }
  LogOut() {
    localStorage.removeItem('userToken');
    this.globalService.setAccess(false);
    this.globalService.setUserLoggedInStatus(false);
    this.router.navigate(['/']);
  }
  editEnable() {
    if (this.edit) {
      this.edit = false;
    } else {
      this.edit = true;
    }
  }

  updateProfile() {
    console.log(this.pincode);

    axios({
      method: 'patch',
      url: 'http://localhost:3000/api/v1/users/updateaccountdetails',
      data: {
        id: this.userToken,
        username: this.phoneNumber,
        password: this.passwordtext,
        email: this.emailaddress,
        address: this.address,
        city: this.city,
        country: this.country,
        phonenumber: this.phoneNumber,
        state: this.state,
        pincode: this.pincode,
      },
    })
      .then((then) => {
        alert('SuccessFully Updated!');
      })
      .catch((error) => {
        console.log('error');

        alert('An error accoured');
      });
  }
}
