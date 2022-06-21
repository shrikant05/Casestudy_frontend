import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BookingserviceService } from '../service/bookingservice.service';

import { BookingdetailsComponent } from './bookingdetails.component';

import { FormsModule } from '@angular/forms';

import {EMPTY} from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {By} from "@angular/platform-browser";
import { Router,ActivatedRoute } from '@angular/router';



import { Subject } from "rxjs";


class ActivatedRouteStub {
  private subject = new Subject();

  push(value:any) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  }
}


describe('BookingdetailsComponent', () => {
  let component: BookingdetailsComponent;
  let fixture: ComponentFixture<BookingdetailsComponent>;


  beforeEach(() => {
   TestBed.configureTestingModule({
      declarations: [ BookingdetailsComponent ],
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      providers: [BookingserviceService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }]
    });
    fixture = TestBed.createComponent(BookingdetailsComponent);
    component = fixture.componentInstance;
     
  });
  

  it('should call Booking Details form when submitted', fakeAsync( () => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit'); //method attached to the click.
    let btn = fixture.debugElement.query(By.css('#save'));
    btn.triggerEventHandler('click', null);
    tick // simulates the passage of time until all pending asynchronous activities finish
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
}));
});