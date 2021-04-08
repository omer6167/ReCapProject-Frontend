import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfos } from '../models/DTOs/UserInfos';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  getUserByEmail(email:string):Observable<SingleResponseModel<UserInfos>> {
    return this.httpClient.get<SingleResponseModel<UserInfos>>(environment.apiUrl + "users/getbyemail?email=" + email);
  }

  updateUserInfos(user:UserInfos):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "users/updateinfos", user)
  }
}
