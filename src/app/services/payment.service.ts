import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private httpClient:HttpClient
  ) { }

  pay(payment:Payment): Observable<ResponseModel>{
    let path = environment.apiUrl + "payments/pay";
    //rental.returnDate = undefined;
    console.log(payment);
    return this.httpClient.post<ResponseModel>(path,payment)
  }
}