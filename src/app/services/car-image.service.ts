import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl="https://localhost:44388/api/";
  
  constructor(
    private httpClient:HttpClient) { }
   

  getImagesByCarId(carId:number){
   let pathImage=this.apiUrl+ "CarImages/getbycarid?carId="+carId
   let response= this.httpClient.get<ListResponseModel<CarImage>>(pathImage);
   return response;
  }
}
