import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Customer } from '../models/customer';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserDetail } from '../models/DTOs/userDetail';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44388/api/Customers/getall';

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl); //generic bir şekilde gelen datayı mapping ediyoruz//observable tasarımı deseni uygulanacak,subscribe olunmadı
  }

  getById(id:number):Observable<ListResponseModel<Customer>> {
    let path= environment.apiUrl +"customers/getbyid?id="+id;
    return this.httpClient.get<ListResponseModel<Customer>>(path);
  }
  getCustomerByEmail(email:string):Observable<SingleResponseModel<UserDetail>> {
    return this.httpClient.get<SingleResponseModel<UserDetail>>(environment.apiUrl +"customers/getbyemail?email=" + email);
  }
}
