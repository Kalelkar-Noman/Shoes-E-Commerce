import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { CheckOutComponent } from './Pages/check-out/check-out.component';
import { AdminComponent } from './Pages/admin/admin.component';
import { OrderHistoryComponent } from './Pages/order-history/order-history.component';
import { ProfileComponent } from './Pages/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    title: 'About US',
  },
  {
    path: 'check-out',
    component: CheckOutComponent,
    title: 'Check-Out',
  },
  {
    path: 'home/admin',
    component: AdminComponent,
    title: 'Admin',
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    title: 'Order History',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'profile',
  },
];
