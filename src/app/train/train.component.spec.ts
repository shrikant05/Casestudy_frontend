import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { from,throwError,EMPTY ,of} from 'rxjs';
import { Trains } from '../models/trains';
import { TokenStorageService } from '../service/token-storage.service';
import { TrainsService } from '../service/trains.service';

import { TrainComponent } from './train.component';
import { AppError } from '../common/app-error';


describe('TrainComponent', () => {
  let component: TrainComponent;
  let fixture: ComponentFixture<TrainComponent>;
  let service: TrainsService;
  let token=new TokenStorageService;
  

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', { post: of({}), get: of({}) })
    service = new TrainsService(spy);
    component = new TrainComponent(service,token);
  });

  it('should set trains property with the items returned from the server', () => {
    // Arrange - Setup
    const trains: Trains[] = [
      {
     
          train_no:1,
          train_name:"Chennai Express",
          travelDate:new Date("2019-01-16"),
          startStation:"Chennai",
          destStation:"Mumbai"
      },
      {
          train_no:2,
          train_name:"Pune Express",
          travelDate:new Date("2019-01-16"),
          startStation:"Pune",
          destStation:"Mumbai"
      },
      {
        train_no:3,
        train_name:"Mumbai Express",
        travelDate:new Date("2019-01-16"),
        startStation:"Mumbai",
        destStation:"Pune"
      }
    ];

    spyOn(service, 'getAllTrains').and.callFake(() => {
      return from([trains]);
    });
    

    // Act - Make the actual call
    component.ngOnInit();

    // Assert - Check and report whether the test is pass or fail
    expect(component.trainList).toEqual(trains);
  });

  it('should set the error property if server returns an error when getting trains', () => {
    const error = new AppError('server error');
    spyOn(service, 'getAllTrains').and.returnValue(throwError(error));

    expect(component.errorMsg).not.toBeDefined();

    component.ngOnInit();

    expect(component.errorMsg).toBeDefined();
    expect(component.errorMsg.originalError).toEqual('server error');
  });

  it('should call the server to delete a train if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(service, 'delete').and.returnValue(
      EMPTY
    );

    const productId = 1;
    component.deleteTodo(productId);

    expect(spy).toHaveBeenCalledWith(productId);
  });

  it('should NOT call the server to delete a train if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const spy = spyOn(service, 'delete').and.returnValue(
      EMPTY
    );

    const productId = 1;
    component.deleteTodo(productId);

    expect(spy).not.toHaveBeenCalledWith(productId);
  });

  it('should delete the train from the trains array within the component', () => {
    component.trainList = [
      {
        train_no:1,
        train_name:"Chennai Express",
        travelDate:new Date("2019-01-16"),
        startStation:"Chennai",
        destStation:"Mumbai"
    },
    {
        train_no:2,
        train_name:"Pune Express",
        travelDate:new Date("2019-01-16"),
        startStation:"Pune",
        destStation:"Mumbai"
    }
    ];

    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(service, 'delete').and.returnValue(
      from([null])
    );
    

    const trainno = 2;
    component.deleteTodo(trainno);

    const index = component.trainList.findIndex(
      train => train.train_no === trainno
    );
    expect(index).toBeLessThan(0);
  });
});