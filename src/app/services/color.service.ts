import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})

export class ColorService {

  apiUrl="https://localhost:44388/api/Colors/getall"

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    return this.httpClient
     .get<ListResponseModel<Color>>(this.apiUrl) //generic bir şekilde gelen datayı mapping ediyoruz//observable tasarımı deseni uygulanacak,subscribe olunmadı 
   }

   
  add(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'Colors/Add',
      color
    );
  }
  update(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'Colors/update',
      color
    );
  }
  delete(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(environment.apiUrl + 'Colors/delete',color);
  }
}