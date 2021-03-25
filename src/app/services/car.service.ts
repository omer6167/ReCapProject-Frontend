import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetail } from '../models/DTOs/carDetail';
import { NonArrResponseModel } from '../models/nonArrResponseModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private httpClient: HttpClient) {}

  /*  getCars():Observable<ListResponseModel<Car>>{
    return this.httpClient
     .get<ListResponseModel<Car>>(this.apiUrl) //generic bir şekilde gelen datayı mapping ediyoruz//observable tasarımı deseni uygulanacak,subscribe olunmadı 
   } */

  getCarDetails(): Observable<ListResponseModel<CarDetail>> {
    let newPath = environment.apiUrl + 'Cars/getcardetails';
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath); //generic bir şekilde gelen datayı mapping ediyoruz//observable tasarımı deseni uygulanacak,subscribe olunmadı
  }

  getCarDetailById(carId: number): Observable<NonArrResponseModel<CarDetail>> {
    let newPath =
      environment.apiUrl + 'Cars/getcardetailbycarid?carId=' + carId;
    return this.httpClient.get<NonArrResponseModel<CarDetail>>(newPath); //generic bir şekilde gelen datayı mapping ediyoruz//observable tasarımı deseni uygulanacak,subscribe olunmadı
  }

  GetCarByBrandId(brandId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = environment.apiUrl + 'Cars/getbybrandId?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  GetCarByColorId(colorId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = environment.apiUrl + 'Cars/getbycolorId?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  add(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'Cars/Add',
      car
    );
  }
  update(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'Cars/update',
      car
    );
  }
  delete(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'Cars/delete',
      car
    );
  }
}
