import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NaviComponent } from './components/navi/navi.component';
import { RentalComponent } from './components/rental/rental.component';

import { CarImageComponent } from './components/car-image/car-image.component';

import { ToastrModule } from 'ngx-toastr';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentComponent } from './components/rent/rent.component';
import { CarAddComponent } from './components/addComponents/car-add/car-add.component';
import { ColorAddComponent } from './components/addComponents/color-add/color-add.component';
import { BrandAddComponent } from './components/addComponents/brand-add/brand-add.component';
import { BrandListComponent } from './components/listComponents/brand-list/brand-list.component';
import { ColorListComponent } from './components/listComponents/color-list/color-list.component';
import { CarListComponent } from './components/listComponents/car-list/car-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { FakeCardListComponent } from './components/listComponents/fake-card-list/fake-card-list.component';
import { UserInfosUpdateComponent } from './components/userOperations/user-infos-update/user-infos-update.component';
import { UserPasswordUpdateComponent } from './components/userOperations/user-password-update/user-password-update.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    NaviComponent,
    RentalComponent,
    VatAddedPipe,
    CarImageComponent,
    CarFilterPipe,
    BrandFilterPipe,
    ColorFilterPipe,
    FooterComponent,
    SidebarComponent,
    PaymentComponent,
    RentComponent,
    CarAddComponent,
    ColorAddComponent,
    BrandAddComponent,
    BrandListComponent,
    ColorListComponent,
    CarListComponent,
    LoginComponent,
    RegisterComponent,
    FakeCardListComponent,
    UserInfosUpdateComponent,
    UserPasswordUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
