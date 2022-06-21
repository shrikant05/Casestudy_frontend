import { Component, OnInit ,ViewChild} from '@angular/core';
import { Booking } from '../models/booking';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { BookingserviceService } from '../service/bookingservice.service';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-bookingform',
  templateUrl: './bookingform.component.html',
  styleUrls: ['./bookingform.component.css']
})

export class BookingformComponent implements OnInit {
   export_data: any;
   alert:boolean=false;
  pnr?: number;
  booking: Booking;
  addNew: boolean;

  @ViewChild('f')bookingForm?: NgForm;
  @ViewChild('f')bookingForm2?: NgForm;

  constructor(
    //private route: ActivatedRoute,
    //private router: Router,
    private service: BookingserviceService
  ) {
    this.booking = new Booking();
    this.addNew = true;
  }

  ngOnInit(): void {
    this.addNew = true;
  }

  onSubmit() {

    
    this.booking.pnr = this.bookingForm?.value.pnr;
    this.booking.train_name = this.bookingForm?.value.trainName;
    this.booking.train_no = this.bookingForm?.value.train_no;
    this.booking.price_per_seat = this.bookingForm?.value.price;
    this.booking.seat_count = this.bookingForm?.value.seats;
    this.booking.dateOfJourney = this.bookingForm?.value.dateOfJourney;
    
    
     //console.log(this.booking);
      //this.export_data=this.booking;
  
      if (this.addNew) {
        this.service.createpayment(this.booking).subscribe(
          (train: Booking) => {
            console.log('Success! Payment Booking successful.', train);
            this.alert=true;
            this.bookingForm?.reset({});
           // this.router.navigate(['/trains']);
          },
          (error: AppError) => {
            console.log('Failed! Error occurred while adding a Train.', error);
          }
        );
      } 
    }

    closeAlert(){
      this.alert=false;
    }

    /*onSubmit2() {

    
      this.booking.pnr = this.bookingForm2?.value.pnr;
      this.booking.train_name = this.bookingForm2?.value.trainName;
      this.booking.train_no = this.bookingForm2?.value.train_no;
      this.booking.price_per_seat = this.bookingForm2?.value.price;
      this.booking.seat_count = this.bookingForm2?.value.seats;
      this.booking.dateOfJourney = this.bookingForm2?.value.dateOfJourney;
      
        //console.log(this.booking);
    //this.export_data=this.booking;

    if (this.addNew) {
      this.service.create(this.booking).subscribe(
        (train: Booking) => {
          console.log('Success! Add Booking successful.', train);
          
         // this.router.navigate(['/trains']);
        },
        (error: AppError) => {
          console.log('Failed! Error occurred while adding a Train.', error);
        }
      );
    }
     
      }
      
*/
  }

