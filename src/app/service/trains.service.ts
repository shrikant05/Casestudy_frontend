import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs'
import { catchError,map } from 'rxjs/operators'
import { Trains } from '../models/trains';



@Injectable({
  providedIn: 'root'
})
export class TrainsService {
  private apiUrl = 'http://localhost:8082/api/v1/traindetail';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  //get All Trains
  getAllTrains():Observable<Trains[]>{
    return this.http.get<Trains[]>(this.apiUrl + '/getAllTrain').pipe(catchError(this.handleError));
  }

 
 
  // Create
  create(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.http.post(API_URL + '/addTrain', data)
      .pipe(
        catchError(this.handleError)
      )
  }

 //get Train By ID
 getTrainById(train_no: number) {
   let API_URL=`${this.apiUrl}`+`/getTrainById/${train_no}`;
  return this.http.get(API_URL).pipe(catchError(this.handleError));
}

  // Update Train Details
  update(train_no: any, data: any): Observable<any> {
    let API_URL = `${this.apiUrl}`+`/updateTrain/${train_no}`;
      return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }


// Delete
delete(train_no: any): Observable<any> {
  var API_URL = `${this.apiUrl}` +`/deleteTrainById/${train_no}`;
  return this.http.delete(API_URL).pipe(
    catchError(this.handleError)
  )
}


    // Handle API errors
    handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError(
        'Something bad happened; please try again later.');
    };

  
}
