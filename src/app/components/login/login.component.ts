import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { UserDetail } from 'src/app/models/DTOs/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;


  userDetail:UserDetail
  // customerDetail:CustomerDetails;

  constructor(
    private formBuilder: FormBuilder,
    private customerService:CustomerService,
    private localStorageService:LocalStorageService,
    private authService:AuthService,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  /*
  yetki kontrolleri için token ekledik
  Giriş yapan Kullanıcı ile ilişkilendirme
   yapabilmemmiz için email değerini ekledik*/
  login() {
    if (this.loginForm.valid){
      console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message)
        this.localStorageService.setToken(response.data.token)
        //this.localStorageService.setItem("email", this.loginForm.get("email")?.value) //Kullanımdan kaldırılacak
        this.getCustomerByEmail(loginModel.email);
        setTimeout(() => { this.router.navigate(['']) }, 1000);
        },responseError=>{
        //console.log(responseError)
        this.toastrService.error(responseError.error)
      })
    }
  }

  ///Kullanılmadı
  //İyileştiriliyor // CustomerDetail Sınıfı döndürüp Local Storage de json objesi olarak tutulacak
  getCustomerByEmail(email: string) {
    this.customerService.getCustomerByEmail(email).subscribe(response => {
       this.userDetail = response.data;
       //console.log(response.data.name);
       this.localStorageService.setCurrentCustomer(this.userDetail); //Kullanıcı eklendi
    });
 }

}
