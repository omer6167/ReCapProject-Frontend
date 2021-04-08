import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';


@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  BrandAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm() {
    this.BrandAddForm = this.formBuilder.group({    
      name: ['', Validators.required],
    });
  }

  add() {
    if (this.BrandAddForm.valid) {
      let brandModel = Object.assign({}, this.BrandAddForm.value);

      this.brandService.add(brandModel).subscribe(
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



