import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { UserDetail } from '../models/DTOs/userDetail';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  currentUser: string = 'currentUser';
  tokenKey = 'token';
  userDetails: UserDetail;

  localStorage: Storage;

  constructor(private customerService: CustomerService) {
    this.localStorage = window.localStorage;
  }

  get isLocalStorageSupported(): boolean {
    return !!localStorage;
  }

  getCurrentCustomer(): UserDetail {
    return JSON.parse(this.getItem(this.currentUser));
  }

  //User Detail set ediyoruz,kontrolü sağlanacak
  setCurrentCustomer(userDetail: UserDetail) {
    this.setItem(this.currentUser, JSON.stringify(userDetail));
  }

  removeCurrentCustomer() {
    this.removeItem(this.currentUser);
  }

  setToken(token: string) {
    this.setItem(this.tokenKey, token);
  }

  getToken() {
    return this.getItem(this.tokenKey);
  }

  removeToken() {
    this.removeItem(this.tokenKey);
  }  

  /*--------      ---------*/
  
  getItem(key: string) {
    return this.localStorage.getItem(key);
  }

  setItem(key: string, value: any) {
    this.localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    this.localStorage.removeItem(key);
  }

  clear() {
    this.localStorage.clear();
  }
}

//email local storage içerine giricek mi //İyileştirilecek
  // getCustomerId(): UserDetail {
  //   this.customerService
  //     .getCustomerByEmail(this.localStorage.getItem('email'))
  //     .subscribe(
  //       (response) => {
  //         this.userDetails = response.data;
  //         this.localStorage.setItem(
  //           'customerId',
  //           this.userDetails.id.toString()
  //         ); //String olarak local stroge a set ettik customerId keyini kullanmadık
  //       },
  //       (responseError) => {
  //         console.log('You are not customer yet.');
  //       } //İyileştirilecek
  //     );
  //   return this.userDetails;
  // }