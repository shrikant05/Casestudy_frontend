import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BookingserviceService } from '../service/bookingservice.service';

import { BookingformComponent } from './bookingform.component';
import {EMPTY} from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {By} from "@angular/platform-browser";

describe('BookingformComponent', () => {
  let component: BookingformComponent;
  let fixture: ComponentFixture<BookingformComponent>;
  let service: BookingserviceService;

  beforeEach(() => {
   TestBed.configureTestingModule({
      declarations: [ BookingformComponent ],
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      providers: [BookingserviceService]
    });
    fixture = TestBed.createComponent(BookingformComponent);
    component = fixture.componentInstance;
       // Get service instance if registered with providers array of module
       service = TestBed.get(BookingserviceService);
  });
  


it('should save Booking Details  when form is submitted', () => {
  component.addNew = true;
  const spy = spyOn(service, 'createpayment').and.returnValue(
    EMPTY
  );

  const form = fixture.debugElement.query(By.css('form'));
  form.triggerEventHandler('submit', null);

  // const button = fixture.debugElement.query(By.css('#save'));
  // button.nativeElement.click();

  expect(spy).toHaveBeenCalled();
});
});


