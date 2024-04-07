import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
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
}
