import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalItemsService {
  constructor() {}
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

  //User Details
  private _UserDetails = new BehaviorSubject<any[]>([]);
  UserDetails = this._UserDetails.asObservable();
  setUserDetails(details: any[]) {
    this._UserDetails.next(details);
  }
}
