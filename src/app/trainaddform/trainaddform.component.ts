import { Component, OnInit,ViewChild } from '@angular/core';
import { Trains } from '../models/trains';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../common/app-error';
import { TrainsService } from '../service/trains.service';

@Component({
  selector: 'app-trainaddform',
  templateUrl: './trainaddform.component.html',
  styleUrls: ['./trainaddform.component.css']
})
export class TrainaddformComponent implements OnInit {
  train_no?: number;
  train: Trains;
  addNew: boolean;
  isEnabled = false;

  @ViewChild('f')trainForm?: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TrainsService
  ) {
    this.train = new Trains();
    this.addNew = true;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const train_no = params.get('train_no');
      if (train_no) {
        this.train_no = +train_no;
        this.service.getTrainById(this.train_no).subscribe(
          (train: Trains) => {
            console.log('Success! Get Train Successful!');
            this.train = train;
            this.addNew = false;
            this.isEnabled=true;
          },
          (error: AppError) => {
            console.log('Failed! Error occurred when getting Train.', error);
          }
        );
      }
    });
  }

  onSubmit() {
    this.train.train_no = this.trainForm?.value.id;
    this.train.train_name = this.trainForm?.value.trainName;
    this.train.travelDate = this.trainForm?.value.travelDate;
    this.train.startStation = this.trainForm?.value.startStation;
    this.train.destStation = this.trainForm?.value.destStation;
 
    if (this.addNew) {
      this.service.create(this.train).subscribe(
        (train: Trains) => {
          console.log('Success! Add train successful.', train);
          this.router.navigate(['/trains']);
        },
        (error: AppError) => {
          console.log('Failed! Error occurred while adding a Train.', error);
        }
      );
    } else {
      this.service.update(this.train_no, this.train).subscribe(
        (train: Trains) => {
          console.log('Success! Update Train successful.', train);
          this.router.navigate(['/trains']);
          
        },
        (error: AppError) => {
          console.log(
            'Failed! Error occurred while updating a Train.',
            error
          );
        }
      );
    }
  }

}
