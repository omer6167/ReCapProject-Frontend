import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentACarDetail } from '../models/DTOs/rentACarDetail';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44388/api/Rentals/getall';
  apiDetailUrl='https://localhost:44388/api/Rentals/getdetails';

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl); //generic bir şekilde gelen datayı mapping ediyoruz//observable tasarımı deseni uygulanacak,subscribe olunmadı
  }

  getRentalDetails(): Observable<ListResponseModel<RentACarDetail>> {
    return this.httpClient.get<ListResponseModel<RentACarDetail>>(this.apiDetailUrl); //generic bir şekilde gelen datayı mapping ediyoruz//observable tasarımı deseni uygulanacak,subscribe olunmadı
  }
}
