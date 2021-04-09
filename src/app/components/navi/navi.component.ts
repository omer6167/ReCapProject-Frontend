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

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private customerService: CustomerService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    let email=this.localStorage.getItem("email");
    if (email!=null){
      this.getUser(email);
      this.getCustomerId(email);
    }    
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout()
    window.location.reload();
  }

  getUser(email:string) {
    this.userService.getUserByEmail(email).subscribe(response => {
      this.userInfos = response.data;
    })
  }

  getCustomerId(email:string){
      this.customerService.getCustomerByEmail(email == null ? email="" : email).subscribe(
        response => {
          this.userDetails = response.data;
          this.localStorage.setItem("customerId", this.userDetails.id)
        },responseError => 
        { 
      console.log("You are not customer yet.") } //İyileştirilecek       
      )
  }
}
