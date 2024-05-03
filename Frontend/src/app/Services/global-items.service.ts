import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalItemsService {
  constructor() {
    this.setCart(localStorage.getItem('myCartData'));
  }
  // Access
  private _UserAccess = new BehaviorSubject<boolean>(false);
  UserAccess = this._UserAccess.asObservable();
  setAccess(access: boolean) {
    this._UserAccess.next(access);
  }

  // Log Status
  private _UserLoggedInStatus = new BehaviorSubject<boolean>(false);
  UserLoggedInStatus = this._UserLoggedInStatus.asObservable();
  setUserLoggedInStatus(status: boolean) {
    this._UserLoggedInStatus.next(status);
  }

  //  addtocart
  private _UserCart = new BehaviorSubject<any>([]);
  UserCart = this._UserCart.asObservable();
  setCart(cart: any) {
    this._UserCart.next(cart);
  }
}
