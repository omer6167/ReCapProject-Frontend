import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentACarDetail } from '../models/DTOs/rentACarDetail';
import { Rent } from '../models/rent';
import { RentItems } from '../models/rentItems';
import { RentItem } from '../models/rentItem';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44388/api/Rentals/getall';
  apiDetailUrl='https://localhost:44388/api/Rentals/getdetails';

  constructor(private httpClient: HttpClient) {}



  addToRentt(rent: Rent) {
    let item = RentItems.find(r=>r.rent.carId==rent.carId)
    if(item){
      item.quantity +=1;
    }else{
      let rentItem = new RentItem();
      rentItem.rent =rent;
      rentItem.quantity=1;

      RentItems.push(rentItem);
    }
  }

  removeFromCart(rent: Rent) {
    let item:any = RentItems.find(r=>r.rent.carId==rent.carId);
    RentItems.splice(RentItems.indexOf(item),1)
  }
  
  list():RentItem[]{
    return RentItems;
  }



  //Get işlemleri
  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl); //generic bir şekilde gelen datayı mapping ediyoruz//observable tasarımı deseni uygulanacak,subscribe olunmadı
  }

  getRentalDetails(): Observable<ListResponseModel<RentACarDetail>> {
    return this.httpClient.get<ListResponseModel<RentACarDetail>>(this.apiDetailUrl); //generic bir şekilde gelen datayı mapping ediyoruz//observable tasarımı deseni uygulanacak,subscribe olunmadı
  }
}
