import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-cud',
  templateUrl: './car-cud.component.html',
  styleUrls: ['./car-cud.component.css'],
})
export class CarCudComponent implements OnInit {
  CarForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createCarForm();
  }

  //3 tane add,update,delete için carform oluşturulacak 
  createCarForm() {
    this.CarForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

 

  update() {
    if (this.CarForm.valid) {
      let carModel = Object.assign({}, this.CarForm.value);

      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.ValidateErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidateErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidateErrors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  delete() {
    if (this.CarForm.valid) {
      let carModel = Object.assign({}, this.CarForm.value);

      this.carService.delete(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.ValidateErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidateErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidateErrors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }
}
