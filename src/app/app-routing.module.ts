import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandListComponent } from './components/listComponents/brand-list/brand-list.component';
import { ColorListComponent } from './components/listComponents/color-list/color-list.component';
import { BrandAddComponent } from './components/addComponents/brand-add/brand-add.component';
import { ColorAddComponent } from './components/addComponents/color-add/color-add.component';
import { CarAddComponent } from './components/addComponents/car-add/car-add.component';
import { CarListComponent } from './components/listComponents/car-list/car-list.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },

  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/brand/:brandId/color/:colorId', component: CarComponent },

  { path: 'car/car-image/:carId', component: CarImageComponent },
  { path: 'rentals', component: RentalComponent },
  { path: 'customers', component: CustomerComponent },
 
  { path: "rental/:carId", component:RentalComponent},  
  { path: "payment/:rental", component:PaymentComponent}, //  /:carDetail// Must make two json object

  {path:"brands", component:BrandListComponent},
  {path:"colors", component:ColorListComponent},
  {path:"carslist",component:CarListComponent},

  
  {path:"brands/add", component:BrandAddComponent},
  {path:"colors/add", component:ColorAddComponent},
  {path:"cars/add", component:CarAddComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
