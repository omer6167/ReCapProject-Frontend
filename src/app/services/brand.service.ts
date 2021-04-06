import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl="https://localhost:44388/api/Brands/getall"

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient
     .get<ListResponseModel<Brand>>(this.apiUrl) //generic bir şekilde gelen datayı mapping ediyoruz//observable tasarımı deseni uygulanacak,subscribe olunmadı 
   }

   add(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'Colors/Add',
      brand
    );
  }
  update(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'Colors/update',
      brand
    );
  }
  delete(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(environment.apiUrl + 'Colors/delete',brand);
  }
}