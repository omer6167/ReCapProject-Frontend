import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  colors:Color[];
  dataLoaded=false;

  colorUpdateForm:FormGroup;
  colorDeleteForm:FormGroup;
  selectedColor:Color;


  constructor(
    private colorService:ColorService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router,
  ) { }

  ngOnInit(): void {
  this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe((response)=>{
       this.colors=response.data;
       this.dataLoaded=true;
    })
  }

  setSelectedColorToUpdate(color:Color){
    this.selectedColor=color;
    this.updateCreateForm();
  }
  setSelectedColorToDelete(color:Color){
    this.selectedColor=color;
    this.deleteCreateForm();
  }
  updateCreateForm(){
    this.colorUpdateForm=this.formBuilder.group({
      id:[this.selectedColor.id,Validators.required],
      name:[this.selectedColor.name,Validators.required]
    })
  }
  deleteCreateForm(){
    this.colorDeleteForm=this.formBuilder.group({
      id:[this.selectedColor.id,Validators.required],
      name:[this.selectedColor.name,Validators.required]
    })
  }


  updateColor() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);

      this.colorService.update(colorModel).subscribe(
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

  deleteColor() {
    if (this.colorDeleteForm.valid) {
      let colorModel = Object.assign({}, this.colorDeleteForm.value);

      this.colorService.delete(colorModel).subscribe(
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
