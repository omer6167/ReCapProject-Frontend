import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PasswordChangingDetail } from '../models/DTOs/passwordChangingDetail';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient:HttpClient,
    private localStorage:LocalStorageService
  ) { }

  login(loginModel:LoginModel){
    let newPath= environment.apiUrl+"auth/login"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel)
  }
  
  register(registerModel:RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(environment.apiUrl + "auth/register", registerModel)
  }

  isAuthenticated(){
    if(this.localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  logout() {
    this.localStorage.removeItem("token")
    return true;
  }

  updateUserPassword(passwordChangingDetail:PasswordChangingDetail) {
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "auth/changepassword", passwordChangingDetail)
  }
}
