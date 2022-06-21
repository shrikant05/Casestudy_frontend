import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrainaddformComponent } from './trainaddform.component';
import {EMPTY} from 'rxjs';
import { TrainsService } from '../service/trains.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {By} from "@angular/platform-browser";


describe('TrainaddformComponent', () => {
  let fixture: ComponentFixture<TrainaddformComponent>;
  let component: TrainaddformComponent;
  let service: TrainsService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainaddformComponent],
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      providers: [TrainsService]
    });

    fixture = TestBed.createComponent(TrainaddformComponent);
    component = fixture.componentInstance;

    // Get service instance if registered with providers array of module
    service = TestBed.get(TrainsService);

    // Get service instance if registered with providers array within the component
    // service = fixture.debugElement.injector.get(TrainsService);
  });

  it(
    'should show train details for a particular train',
    waitForAsync(() => {
      const train = {
          train_no:1,
          train_name:"Chennai Express",
          travelDate:new Date("2019-01-16"),
          startStation:"Chennai",
          destStation:"Mumbai"
      };

      component.train = train;

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const numberElement: HTMLInputElement = fixture.debugElement.query(
          By.css('#trainNo')
        ).nativeElement;
        const nameElement: HTMLInputElement = fixture.debugElement.query(
          By.css('#trainName')
        ).nativeElement;
        const dateElement: HTMLInputElement = fixture.debugElement.query(
          By.css('#trainTravelDate')
        ).nativeElement;
        const startingElement: HTMLInputElement = fixture.debugElement.query(
          By.css('#trainStartStation')
        ).nativeElement;
        const destElement: HTMLInputElement = fixture.debugElement.query(
          By.css('#trainDestinationStation')
        ).nativeElement;

        expect(numberElement.value).toContain(train.train_no.toString());
        expect(nameElement.value).toContain(train.train_name);
        expect(dateElement.value).toContain(train.travelDate.toDateString());
        expect(startingElement.value).toContain(train.startStation);
        expect(destElement.value).toContain(train.destStation);
      });
    })
  );

  it('should save train details when form is submitted', () => {
    component.addNew = true;
    const spy = spyOn(service, 'create').and.returnValue(
      EMPTY
    );

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    // const button = fixture.debugElement.query(By.css('#save'));
    // button.nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });
});
