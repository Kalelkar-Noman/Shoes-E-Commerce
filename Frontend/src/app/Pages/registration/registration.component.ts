import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  wrapper = document.getElementById('wrapper');
  ngAfterViewInit() {
    this.wrapper = document.getElementById('wrapper');
  }
  // signUpLink = document.getElementById('signUp-link');
  // signInLink = document.getElementById('signIn-link');

  signIn(event: any) {
    event.preventDefault();
    if (this.wrapper) {
      this.wrapper?.classList.add('animate-signUp');
      this.wrapper?.classList.remove('animate-signIn');
    } else {
      console.log('na mila');
    }

    console.log('in');
  }

  signUp(event: any) {
    event.preventDefault();

    if (this.wrapper) {
      this.wrapper?.classList.add('animate-signIn');
      this.wrapper?.classList.remove('animate-signUp');
    } else {
      console.log('na mila');
    }

    console.log('up');
  }

  // signUpLink.addEventListener('click', () => {
  //     wrapper.classList.add('animate-signIn');
  //     wrapper.classList.remove('animate-signUp');
  // });

  // signInLink.addEventListener('click', () => {
  //     wrapper.classList.add('animate-signUp');
  //     wrapper.classList.remove('animate-signIn');
  // });
}
