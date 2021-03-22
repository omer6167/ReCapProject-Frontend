import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/DTOs/carDetail';
import { Rent } from 'src/app/models/rent';
import { RentItem } from 'src/app/models/rentItem';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent-summary',
  templateUrl: './rent-summary.component.html',
  styleUrls: ['./rent-summary.component.css'],
})
export class RentSummaryComponent implements OnInit {
  rentItems: RentItem[] = []; //İlk değer boş

  constructor(
    private rentService: RentalService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  getRentt() {
    this.rentItems = this.rentService.list();
  }

  removeFromRent(rent: Rent) {
    
    // rent.customerId= carDetail.customerId
    rent.rentDate = new Date(Date.now());

    this.rentService.removeFromCart(rent);

    this.toastrService.error(rent.carId + 'sepetten silindi', 'Silindi');
  }
}
