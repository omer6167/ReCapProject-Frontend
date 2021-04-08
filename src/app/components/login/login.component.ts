import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private localStorage:LocalStorageService,
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
        this.localStorage.setItem("token",response.data.token)
        this.localStorage.setItem("email", this.loginForm.get("email")?.value)
        setTimeout(() => { this.router.navigate(['/cars']) }, 1000);
        },responseError=>{
        //console.log(responseError)
        this.toastrService.error(responseError.error)
      })
    }
  }
}
