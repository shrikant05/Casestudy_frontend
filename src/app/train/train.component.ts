import { Component, OnInit } from '@angular/core';
import { AppError } from '../common/app-error';
import { Trains } from '../models/trains';
import { TokenStorageService } from '../service/token-storage.service';
import { TrainsService } from '../service/trains.service';


@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit {
  
  public errorMsg:any;
  trainList: Trains[] = [];
  private roles: string[] = [];
  showAdminBoard = false;
  isLoggedIn = false;

  constructor(private crudHttpService: TrainsService,private tokenStorageService: TokenStorageService) {}

  ngOnInit() {
    this.listTrain();

  
    this.isLoggedIn = this.tokenStorageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
     
    }
  }


  listTrain(){
    this.crudHttpService.getAllTrains().subscribe((response)=>{
      this.trainList = response;
    },(error:AppError)=>{
      this.errorMsg=error;
      console.log('Failed! Error occurred when getting Trains. (via Observable)',
      error);
    });
  }

  deleteTodo(train_no: any) {
    if (confirm('Are you sure?')) {
      this.crudHttpService.delete(train_no).subscribe(
        () => {
          console.log('Success! Delete Train Successful!');
         // this.listTrain();
          this.trainList = this.trainList.filter(
            train => train.train_no !== train_no
          );
        },
        (error:AppError) => {
          this.errorMsg = error;
          console.log('Failed! Error occurred when deleting Train.', error);
        }
      );
    }
  }
}


