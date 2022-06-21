import { DisplaybookingComponent } from './displaybooking.component';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Subject } from "rxjs";
import { TrainsService } from '../service/trains.service';
import { HttpClientModule } from '@angular/common/http';


describe('DisplaybookingComponent', () => {
  let component: DisplaybookingComponent;
  let fixture: ComponentFixture<DisplaybookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaybookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaybookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 

  xit('should Cancel Booking  form when  clicked on Cancel', fakeAsync( () => {
      fixture.detectChanges();
      spyOn(component, 'onDelete'); //method attached to the click.
      let btn = fixture.debugElement.query(By.css('#delete'));
      btn.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.onDelete).toHaveBeenCalled();
    }));
  
});
