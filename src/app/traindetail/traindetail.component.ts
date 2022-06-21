import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trains } from '../models/trains';

import { AppError } from '../common/app-error';
import { TrainsService } from '../service/trains.service';
import { TokenStorageService } from '../service/token-storage.service';


@Component({
  selector: 'app-traindetail',
  templateUrl: './traindetail.component.html',
  styleUrls: ['./traindetail.component.css']
})
export class TraindetailComponent implements OnInit {
  trains: Trains= new Trains();
  train_no?: number;
  private roles: string[] = [];
  showAdminBoard = false;
  isLoggedIn = false;

  constructor(
    private service: TrainsService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.tokenStorageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
     
    }
    this.route.params.subscribe(params => {
      this.train_no = +params['train_no'];

      if (isNaN(this.train_no) || !this.train_no) {
        console.log(
          `Train trainNo is not a number (or) is 0. (train_no = ${params['train_no']})`
        );
        this.router.navigate(['/not-found']);
        return;
      }

      this.service.getTrainById(this.train_no).subscribe(
        (train: Trains) => {
          console.log('Success! Get Train Successful!');
          this.trains = train;
        },
        (error: AppError) => {
          console.log('Failed! Error occurred when getting Train.', error);
        }
      );
    });
    

  }


  onDelete() {
    if (confirm('Are you sure?')) {
      this.service.delete(this.train_no).subscribe(
        () => {
          console.log('Success! Delete Train Successful!');
          this.router.navigate(['/trains']);
        },
        (error: AppError) => {
          console.log('Failed! Error occurred when deleting Train.', error);
        }
      );
    }
  }

  onEdit() {
    this.router.navigate(['/trains', this.train_no, 'edit']);
  }

}
