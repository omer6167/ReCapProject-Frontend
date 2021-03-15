import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';



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
}