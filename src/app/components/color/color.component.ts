import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { Filters } from 'src/app/models/filters';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  constructor(
    private colorService: ColorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

  //colorfilterText=""

  colors: Color[] = [];
  currentColor : Color | null;
  allColor?: Color;
  Filters = {brandId: '', colorId: ''};

  dataLoaded = false;

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors= response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentColor() {
       this.currentColor !== undefined
      ? (Filters.colorId = this.currentColor.id)
      : (Filters.colorId = null);
  }

  allColorsSelected() {
    return this.currentColor == undefined ? true : false;
  }

  setCurrentColorClass(color: Color) {
    if (color== this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
}
