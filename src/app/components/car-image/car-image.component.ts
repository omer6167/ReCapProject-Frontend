import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarDetail } from 'src/app/models/DTOs/carDetail';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css'],
})
export class CarImageComponent implements OnInit {
  imageBasePath = environment.baseUrl;

  carDetail: CarDetail;
  carImage: CarImage[] = [];
  imageLoaded = false;
  carDetailLoaded = false;

  constructor(
    private carImageService: CarImageService,
    private activetedRoot: ActivatedRoute,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.activetedRoot.params.subscribe((params) => {
      if (params['carId']) {
        this.getImagesByCarId(params['carId']);
        this.getCarDetailById(params['carId']);
      }
    });
  }

  getCarDetailById(carId: number) {
    this.carService.getCarDetailById(carId).subscribe((response) => {
      this.carDetail = response.data;
      this.carDetailLoaded = true;
    });
  }

  getImagesByCarId(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((response) => {
      this.carImage = response.data;
      this.imageLoaded = true;
    });
  }

  // getSliderClassName(index: Number) {
  //   if (index == 0) {
  //     return 'carousel-item active';
  //   } else {
  //     return 'carousel-item';
  //   }
  // }
}
