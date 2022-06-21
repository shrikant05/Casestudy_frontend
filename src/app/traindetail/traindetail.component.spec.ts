import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TraindetailComponent } from './traindetail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Subject } from "rxjs";
import { TrainsService } from '../service/trains.service';
import { HttpClientModule } from '@angular/common/http';


class ActivatedRouteStub {
  private subject = new Subject();

  push(value:any) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  }
}

describe('TraindetailComponent', () => {
  let component: TraindetailComponent;
  let fixture: ComponentFixture<TraindetailComponent>;

 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [TraindetailComponent],
      providers: [
        TrainsService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    });

    fixture = TestBed.createComponent(TraindetailComponent);
    component = fixture.componentInstance;
  });

  it('should show train details for a particular train', () => {
    component.trains = {
          train_no:1,
          train_name:"Chennai Express",
          travelDate:new Date("2019-01-16"),
          startStation:"Chennai",
          destStation:"Mumbai"
    };

    fixture.detectChanges();

    const nameElement: HTMLInputElement = fixture.debugElement.query(
      By.css('#name')
    ).nativeElement;  
    const numberElement: HTMLInputElement = fixture.debugElement.query(
      By.css('#trainno')
    ).nativeElement;
    const startingElement: HTMLInputElement = fixture.debugElement.query(
      By.css('#description')
    ).nativeElement;
    

    expect(numberElement.innerText).toContain('1');
    expect(nameElement.innerText).toContain('Chennai Express');
    expect(startingElement.innerText).toContain('Chennai --- to --- Mumbai');
  
  });

 /* xit('should redirect the user to `Train Form` component when Edit button is clicked', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    component.train_no = 1;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#edit'));
    button.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalledWith(['/trains', component.train_no, 'edit']);
  });*/



  it('should navigate the user to the `Not Found` component when an invalid train number is passed', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    fixture.detectChanges();

    const route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    route.push({train_no: 'fghf' });

    expect(spy).toHaveBeenCalledWith(['/not-found']);
  });
});