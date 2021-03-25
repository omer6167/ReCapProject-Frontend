import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarCudComponent } from './components/car-cud/car-cud.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarComponent } from './components/car/car.component';

const routes: Routes = [
  { path: "", pathMatch: "full",component: CarComponent },
  { path: "cars",  component: CarComponent },
  { path: "cars/brand/:brandId", component: CarComponent },
  { path: "cars/color/:colorId", component: CarComponent },
  { path: "car/car-image/:carId", pathMatch: "full",component: CarImageComponent},
  { path: "car-cud/", pathMatch: "full",component: CarCudComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
