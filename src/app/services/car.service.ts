import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { CarDetail } from '../models/DTOs/carDetail';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44388/api/Cars/getall"
  apiDetailUrl='https://localhost:44388/api/Cars/getcardetails';

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    return this.httpClient
     .get<ListResponseModel<Car>>(this.apiUrl) //generic bir şekilde gelen datayı mapping ediyoruz//observable tasarımı deseni uygulanacak,subscribe olunmadı 
   }

   getCarDetails(): Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiDetailUrl); //generic bir şekilde gelen datayı mapping ediyoruz//observable tasarımı deseni uygulanacak,subscribe olunmadı
  }
}
