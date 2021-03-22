import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/DTOs/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  constructor(
    private carService: CarService,
    private activatedRoot: ActivatedRoute,
    private toastrService:ToastrService
  ) {}

  // carImage: CarImage[] = [];
   //carDetail: CarDetail;

  filterText="";
  carDetails: CarDetail[] = [];
  dataLoaded = false;

  ngOnInit(): void {
    this.activatedRoot.params.subscribe((params) => {
      if (params['brandId']) {
        this.GetCarByBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.GetCarByColorId(params['colorId']);
      } else {
        this.getCarDetails();
      }
    });
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  GetCarByBrandId(brandId: number) {
    this.carService.GetCarByBrandId(brandId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  GetCarByColorId(colorId: number) {
    this.carService.GetCarByColorId(colorId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
}

  // getCarDetailById(carId: number) {
  //   this.carService.getCarDetailsById(carId).subscribe((response) => {
  //     this.carDetail = response.data[0];
  //     this.dataLoaded = true;
  //   });
  // }

  // getImagesByCarId(carId: number) {
  //   this.carImageService.getImagesByCarId(carId).subscribe((response) => {
  //     this.carImage = response.data;
  //     this.dataLoaded = true;
  //   });
  // }

 

/*   getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  } */
