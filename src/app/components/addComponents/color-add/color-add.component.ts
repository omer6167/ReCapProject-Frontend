import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  ColorAddForm: FormGroup;
  

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm() {
    this.ColorAddForm = this.formBuilder.group({    
      name: ['', Validators.required],
    });
  }

  add() {
    if (this.ColorAddForm.valid) {
      let colorModel = Object.assign({}, this.ColorAddForm.value);

      this.colorService.add(colorModel).subscribe(
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


