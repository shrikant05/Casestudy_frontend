import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Booking } from '../models/booking';

@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.css']
})
export class BookingdetailsComponent implements OnInit {
  booking: Booking= new Booking();
  pnr?: number;
  

  @ViewChild('f')bookingSearch?: NgForm;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
  }

  onSubmit(){
    this.booking.pnr = this.bookingSearch?.value.pnr;
    console.log(this.booking.pnr);
    this.router.navigate(['/booking/'+this.booking.pnr]);
  }
}
