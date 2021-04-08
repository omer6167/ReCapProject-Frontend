import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FakeCard } from '../models/fakeCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FakeCardService {

  constructor(
    private httpClient:HttpClient
  ) { }

  isCardExist(fakeCard:FakeCard):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "fakecards/iscardexist";
    console.log(fakeCard);
    return this.httpClient.post<ResponseModel>(newPath,fakeCard);
  }

  getCreditCardsByCustomerId(customerId:number):Observable<ListResponseModel<FakeCard>> {
    return this.httpClient.get<ListResponseModel<FakeCard>>(environment.apiUrl + "fakecard/getbycustomerid?customerId=" + customerId);
  }

  getCardByNumber(cardNumber:string):Observable<ListResponseModel<FakeCard>>{
    let newPath =  environment.apiUrl+ "fakecards/getbycardnumber?cardnumber=" + cardNumber;
    return this.httpClient.get<ListResponseModel<FakeCard>>(newPath);
  }

  addCreditCard(fakeCard:FakeCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "fakecard/add", fakeCard)
  }

  updateCard(fakeCard:FakeCard):Observable<ResponseModel>{
    let newPath =  environment.apiUrl+ "fakecards/update";
    return this.httpClient.post<ResponseModel>(newPath,fakeCard)
  }
  deleteCard(fakeCard:FakeCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "fakecard/delete", fakeCard)
  }

}
