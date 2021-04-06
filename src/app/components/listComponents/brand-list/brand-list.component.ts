import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  brands:Brand[]
  dataLoaded=false;
  selectedBrand:Brand;
  brandUpdateForm:FormGroup;
  brandDeleteForm:FormGroup;

  constructor(
    private brandService:BrandService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands=response.data;
      this.dataLoaded=true;
    })
  }

  setSelectedBrandToUpdate(brand:Brand){
    this.selectedBrand=brand;
    this.createUpdateBrandForm();
  }
  setSelectedBrandToDelete(brand:Brand){
    this.selectedBrand=brand;
    this.createDeleteBrandForm();
  }

  createUpdateBrandForm(){
    this.brandUpdateForm=this.formBuilder.group({
      id:[this.selectedBrand.id,Validators.required],
      name:[this.selectedBrand.name,Validators.required]
    })
  }

  createDeleteBrandForm(){
    this.brandDeleteForm=this.formBuilder.group({
      id:[this.selectedBrand.id,Validators.required],      
      name:[this.selectedBrand.name,Validators.required]
    })
  }

  updateBrand() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe(
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

  deleteBrand() {
    if (this.brandDeleteForm.valid) {
      
      let brandModel = Object.assign({}, this.brandDeleteForm.value);
      this.brandService.delete(brandModel).subscribe(
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

 
