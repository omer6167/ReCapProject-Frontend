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
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FakeCardListComponent } from './components/listComponents/fake-card-list/fake-card-list.component';
import { UserInfosUpdateComponent } from './components/userOperations/user-infos-update/user-infos-update.component';
import { UserPasswordUpdateComponent } from './components/userOperations/user-password-update/user-password-update.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },

  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/brand/:brandId/color/:colorId', component: CarComponent },

  { path: 'car/car-image/:carId', component: CarImageComponent },
  { path: 'rentals', component: RentalComponent },
  { path: 'customers', component: CustomerComponent },
 
  { path: "rental/:carId", component:RentalComponent,canActivate:[LoginGuard]},  
  { path: "payment/:rental", component:PaymentComponent,canActivate:[LoginGuard]}, //  /:carDetail// Must make two json object

  {path:"brands", component:BrandListComponent,canActivate:[LoginGuard]},
  {path:"colors", component:ColorListComponent,canActivate:[LoginGuard]},
  {path:"carslist",component:CarListComponent,canActivate:[LoginGuard]},
  {path:"cardslist",component:FakeCardListComponent,canActivate:[LoginGuard]},
  
  {path:"brands/add", component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"colors/add", component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"cars/add", component:CarAddComponent,canActivate:[LoginGuard]}, //Componente guard ekledik, Bu sayfanın görüntülenmesi için korunma sağlıyacak

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  
  { path: 'updateinfos', component: UserInfosUpdateComponent ,canActivate:[LoginGuard]},
  { path: 'updatepassword', component: UserPasswordUpdateComponent ,canActivate:[LoginGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
