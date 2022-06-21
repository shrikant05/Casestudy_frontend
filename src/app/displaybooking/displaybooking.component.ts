import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../common/app-error';
import { Booking } from '../models/booking';
import { BookingserviceService } from '../service/bookingservice.service';

@Component({
  selector: 'app-displaybooking',
  templateUrl: './displaybooking.component.html',
  styleUrls: ['./displaybooking.component.css']
})
export class DisplaybookingComponent implements OnInit {
  booking: Booking= new Booking();
  pnr?: number;
  alert:boolean=false;
  constructor(
    private service: BookingserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pnr = +params['pnr'];

      if (isNaN(this.pnr) || !this.pnr) {
        console.log(
          `Booking pnr is not a number (or) is 0. (pnr = ${params['pnr']})`
        );
        this.router.navigate(['/not-found']);
        return;
      }

      this.service.getBookingById(this.pnr).subscribe(
        (product: Booking) => {
          console.log('Success! Get Booking Successful!');
          this.booking = product;
        },
        (error: AppError) => {
          console.log('Failed! Error occurred when getting Booking.', error);
        }
      );
    });
  }


  onDelete() {
    if (confirm('Are you sure you want to Cancel Booking?')) {
      this.service.delete(this.pnr).subscribe(
        () => {
          console.log('Success! Cancelled Booking Successful!');
          this.alert=true;
        },
        (error: AppError) => {
          console.log('Failed! Error occurred when Cancelling Booking.', error);
        }
      );
    }
  }
  closeAlert(){
    this.alert=false;
  }

  onEdit() {
    //this.router.navigate(['/trains', this.pnr, 'edit']);
  }
}
