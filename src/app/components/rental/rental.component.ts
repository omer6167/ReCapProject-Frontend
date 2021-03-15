import { Component, OnInit } from '@angular/core';
import { RentACarDetail } from 'src/app/models/DTOs/rentACarDetail';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  constructor(private rentalService: RentalService) {}

  rentals: Rental[] = [];
  rentalDetails:RentACarDetail[] =[];
  dataLoaded = true;

  ngOnInit(): void {
    this.getRentalDetails();
  }

  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }
  getRentalDetails() {
    this.rentalService.getRentalDetails().subscribe((response) => {
      this.rentalDetails = response.data;
      this.dataLoaded = true;
    });
  }
}
