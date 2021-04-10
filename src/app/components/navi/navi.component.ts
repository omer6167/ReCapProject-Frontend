import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/models/DTOs/userDetail';
import { UserInfos } from 'src/app/models/DTOs/userInfos';

import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  userInfos:UserInfos
  userDetails:UserDetail
  name:string

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private customerService: CustomerService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    //let email=this.localStorage.getItem("email");
    this.name= this.getUserDetails().name;
    // if (email!=null){
    //   this.getUser(email);
    //   this.getCustomerId(email);
    //   localStorage.setCurr()
    // }    
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout()
    window.location.reload(); //
  }

  //İyileştirilecek
  getUser(email:string) {
    this.userService.getUserByEmail(email).subscribe(response => {
      this.userInfos = response.data;
    })
  }

  
  // Email Bilgisi üzerinden giriş yapan kullanıcının bilgisini alıyoruz ve id değerini storage a set ediyoruz
  // Metot Sadece Object olarak User Detail bilgisi set edecek
  
  // getCustomerId(email:string){
  //     this.customerService.getCustomerByEmail(email == null ? email="" : email).subscribe(
  //       response => {
  //         this.userDetails = response.data;
  //         this.localStorage.setItem("customerId", this.userDetails.id)
  //       },responseError => 
  //       { 
  //     console.log("You are not customer yet.") } //İyileştirilecek       
  //     )
  // }

  getUserDetails():UserDetail{
    return this.localStorage.getCurrentCustomer();
  }
}
