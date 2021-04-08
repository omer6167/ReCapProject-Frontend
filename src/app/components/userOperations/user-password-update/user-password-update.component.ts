import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PasswordChangingDetail } from 'src/app/models/DTOs/passwordChangingDetail';
import { UserInfos } from 'src/app/models/DTOs/userInfos';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-password-update',
  templateUrl: './user-password-update.component.html',
  styleUrls: ['./user-password-update.component.css'],
})
export class UserPasswordUpdateComponent implements OnInit {
  user: UserInfos;
  
  passwordChangingDetail: PasswordChangingDetail;
  userPasswordUpdateForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService,
    private localStorage: LocalStorageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    let email = this.localStorage.getItem('email');
    this.getUserByEmail(email == undefined ? (email = '') : email.toString());
    this.createUserPasswordUpdateForm();
  }

  getUserByEmail(email:string) {
    this.userService.getUserByEmail(email).subscribe(response => {
      this.user = response.data;
    })
  }
  createUserPasswordUpdateForm(){
    this.userPasswordUpdateForm=this.formBuilder.group({
      userId:["",Validators.required],
      oldPassword:["",Validators.required],
      newPassword:["",Validators.required],
    })
  }

  updateUserPassword(){
    this.userPasswordUpdateForm.patchValue({ userId: this.user.id })
    if(this.userPasswordUpdateForm.valid){
      this.passwordChangingDetail = Object.assign({},this.userPasswordUpdateForm.value);
      this.authService.updateUserPassword(this.passwordChangingDetail).subscribe(
        response => {
        this.toastrService.success(response.message,"Successful")
        setTimeout(() => { window.location.reload(); }, 1000);
        },
        responseError => {
          this.toastrService.error(responseError.error.message,"Validation Error")
      })
    }
    else {
      this.toastrService.error("The form is missing.","Attention!")
    }
  }

}
