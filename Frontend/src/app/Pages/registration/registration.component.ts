import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}
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
            this.router.navigate(['/']);
          }
        });
    }
  }

  signUp() {
    axios
      .post('http://localhost:3000/api/v1/users/register', {
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .then((response) => {
        localStorage.setItem('userToken', response.data.data._id);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        if (error.response.status == 400) {
          alert('All fields are required');
        } else if (error.response.status == 409) {
          alert('User with email already exists');
        } else if (error.response.status == 500) {
          alert('Something went wrong while registering the user');
        } else {
          alert('something went wrong');
        }
      });
  }
  
  login() {
    axios
      .post('http://localhost:3000/api/v1/users/login', {
        email: this.email,
        password: this.password,
      })
      .then((response) => {
        localStorage.setItem('userToken', response.data.data.user._id);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        if (error.response.status == 404) {
          alert('User does not exist');
        } else if (error.response.status == 400) {
          alert(' password and email is required');
        } else {
          alert('something went wrong');
        }
      });
  }
}
