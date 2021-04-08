import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})

export class CarListComponent implements OnInit {

  dataLoaded=false;
  cars:Car[];
  brands:Brand[];
  colors:Color[];

  carUpdateForm:FormGroup;
  carDeleteForm:FormGroup;
  selectedCar:Car;

  constructor(    
    private formBuilder:FormBuilder,    
    private carService:CarService,
    private toastrService:ToastrService,
    private brandService:BrandService,
    private colorService:ColorService
  ) { }

  ngOnInit(): void {
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  getColors(){
    this.colorService.getColors().subscribe((response)=>{
       this.colors=response.data;
       this.dataLoaded=true;
    })
  }
  
    

  setSelectedCarToUpdate(car:Car){
    this.selectedCar=car;
    this.updateCreateForm();
  }
  updateCreateForm(){
    this.carUpdateForm=this.formBuilder.group({
      id:[this.selectedCar.id,Validators.required],
      name:[this.selectedCar.name,Validators.required],
      colorId:[this.selectedCar.colorId,Validators.required],
      brandId:[this.selectedCar.brandId,Validators.required],
      dailyPrice:[this.selectedCar.dailyPrice,Validators.required],
      modelYear:[this.selectedCar.modelYear,Validators.required],
      description:[this.selectedCar.description,Validators.required]
    })
  }

  setSelectedCarToDelete(car:Car){
    this.selectedCar=car;
    this.deleteCreateForm();
  }
  deleteCreateForm(){
    this.carDeleteForm=this.formBuilder.group({
      id:[this.selectedCar.id,Validators.required],
      name:[this.selectedCar.name,Validators.required],
      colorId:[this.selectedCar.colorId,Validators.required],
      brandId:[this.selectedCar.brandId,Validators.required],
      dailyPrice:[this.selectedCar.dailyPrice,Validators.required],
      modelYear:[this.selectedCar.modelYear,Validators.required],
      description:[this.selectedCar.description,Validators.required]
    })
  }


  updateCar() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);

      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.ValidateErrors) {
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
          }else{
            this.toastrService.error(
              'Yetkininiz Yok',
              'Hata'
            );
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  deleteCar() {
    if (this.carDeleteForm.valid) {
      let carModel = Object.assign({}, this.carDeleteForm.value);

      this.carService.delete(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.ValidateErrors) {
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
          }else{
            this.toastrService.error(
              'Yetkininiz Yok',
              'Hata'
            );
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }
  }


