import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  edit: boolean = false;
  phoneNumber: Number = 0;
  emailaddress:string="";
  name:string="";
  passVisibility:string="password";
  passwordtext:string="";
  address:string="";
  city:string="";
  state:string="";
  country:string="";
  pincode:string="";

  togglePassVisibility(){}
  LogOut() {}
  editEnable() {}
}
