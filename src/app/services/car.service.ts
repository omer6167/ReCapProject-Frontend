import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetail } from '../models/DTOs/carDetail';
import { NonArrResponseModel } from '../models/nonArrResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44388/api/"

  constructor(private httpClient:HttpClient) { }

 /*  getCars():Observable<ListResponseModel<Car>>{
    return this.httpClient
     .get<ListResponseModel<Car>>(this.apiUrl) //generic bir şekilde gelen datayı mapping ediyoruz//observable tasarımı deseni uygulanacak,subscribe olunmadı 
   } */

   getCarDetails(): Observable<ListResponseModel<CarDetail>> {
     let newPath=this.apiUrl+"Cars/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath); //generic bir şekilde gelen datayı mapping ediyoruz//observable tasarımı deseni uygulanacak,subscribe olunmadı
  }

  getCarDetailById(carId:number): Observable<NonArrResponseModel<CarDetail>> {
    let newPath=this.apiUrl+"Cars/getcardetailbycarid?carId="+carId
   return this.httpClient.get<NonArrResponseModel<CarDetail>>(newPath); //generic bir şekilde gelen datayı mapping ediyoruz//observable tasarımı deseni uygulanacak,subscribe olunmadı
 }

  GetCarByBrandId(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath= this.apiUrl +"Cars/getbybrandId?brandId="+brandId;
    return this.httpClient
     .get<ListResponseModel<CarDetail>>(newPath) 
   }

   GetCarByColorId(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath= this.apiUrl +"Cars/getbycolorId?colorId="+colorId;
    return this.httpClient
     .get<ListResponseModel<CarDetail>>(newPath) 
   }
}
