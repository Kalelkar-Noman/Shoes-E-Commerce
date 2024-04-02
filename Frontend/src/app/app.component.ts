import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationComponent } from './Pages/registration/registration.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistrationComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Frontend';
  isLoggedIn = true;
  access = true;
  navOpenClose() {
    document.getElementById('nav-menu')?.classList.toggle('show-menu');
  }
  searchOpenClose() {
    document.getElementById('search')?.classList.toggle('show-search');
  }
  loginOpen() {
    // this.userToken = this.supabaseService.getCookieValue('Id');
    // if (this.userToken && this.userToken != 'null') {
    //   this.router.navigate(['MYProfile']);
    // } else {
    //   document.getElementById('login')?.classList.add('show-login');
    // }
  }
}
