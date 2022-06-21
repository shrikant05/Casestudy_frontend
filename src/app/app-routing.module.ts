import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingdetailsComponent } from './bookingdetails/bookingdetails.component';
import { BookingformComponent } from './bookingform/bookingform.component';
import { AuthGuard } from './common/auth.guard';
import { DisplaybookingComponent } from './displaybooking/displaybooking.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistrationComponent } from './registration/registration.component';
import { TrainComponent } from './train/train.component';
import { TrainaddformComponent } from './trainaddform/trainaddform.component';
import { TraindetailComponent } from './traindetail/traindetail.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegistrationComponent},
  {path:'trains',component:TrainComponent,canActivate:[AuthGuard]},
  {path:'trains/new',component:TrainaddformComponent,canActivate:[AuthGuard]},
  {path:'trains/:train_no',component:TraindetailComponent,canActivate:[AuthGuard]},
  {path:'trains/:train_no/edit', component: TrainaddformComponent,canActivate:[AuthGuard]},
  {path:'booking/new',component:BookingformComponent,canActivate:[AuthGuard]},
  {path:'booking/search',component:BookingdetailsComponent,canActivate:[AuthGuard]},
  {path:'booking/:pnr',component:DisplaybookingComponent,canActivate:[AuthGuard]},
  {path:'home',component:HomeComponent},
  { path:'user', component: UserComponent,canActivate:[AuthGuard]},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[LoginComponent,RegistrationComponent,UserComponent,DisplaybookingComponent,HomeComponent,TrainComponent,TrainaddformComponent,TraindetailComponent,PageNotFoundComponent,BookingformComponent,BookingdetailsComponent]
