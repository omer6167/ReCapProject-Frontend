import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarCudComponent } from './components/car-cud/car-cud.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PaymentComponent } from './components/payment/payment.component';


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
  { path: "payment/:rental", component:PaymentComponent}, //  /:carDetail

  { path: 'car-cud/', pathMatch: 'full', component: CarCudComponent },//Create-update-delete
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
