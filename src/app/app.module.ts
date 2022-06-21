import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { TraindetailComponent } from './traindetail/traindetail.component';
import { TrainComponent } from './train/train.component';
import { TrainaddformComponent } from './trainaddform/trainaddform.component';
import { BookingformComponent } from './bookingform/bookingform.component';
import { BookingdetailsComponent } from './bookingdetails/bookingdetails.component';
import { HomeComponent } from './home/home.component';
import { DisplaybookingComponent } from './displaybooking/displaybooking.component';
import { UserComponent } from './user/user.component';
import { httpInterceptorProviders } from './common/http.interceptor';
import { TokenStorageService } from './service/token-storage.service';
import { AuthService } from './service/auth.service';
import { BookingserviceService } from './service/bookingservice.service';
import { TrainsService } from './service/trains.service';
import { AuthGuard } from './common/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PageNotFoundComponent,
    TraindetailComponent,
    TrainComponent,
    TrainaddformComponent,
    BookingformComponent,
    BookingdetailsComponent,
    HomeComponent,
    DisplaybookingComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, FormsModule ,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders,AuthGuard,TokenStorageService,AuthService,BookingserviceService,TrainsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

