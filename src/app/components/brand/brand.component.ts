import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import {FormsModule} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Filters } from 'src/app/models/filters';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  constructor(
    private brandService: BrandService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

   //brandfilterText=""

  brands: Brand[] = [];  
  dataLoaded = false;

  currentBrand: Brand;
  allBrand?: Brand;
  Filters ={}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentBrand() {
    this.currentBrand !== undefined
    ? (Filters.brandId = this.currentBrand.id)
    : (Filters.brandId = null);  } //strictNullChecks

  allBrandSelected(){
    return this.currentBrand == undefined ? true : false;
  } 

  setCurrentBrandClass(brand: Brand) {
    if (brand== this.currentBrand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
}
