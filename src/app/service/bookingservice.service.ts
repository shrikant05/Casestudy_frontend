import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingserviceService {
  private apiUrl = 'http://localhost:8083/api/v1/booking';
  
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  //get All Trains
  getAllTrains():Observable<Booking[]>{
    return this.http.get<Booking[]>(this.apiUrl + '/getAllBooking').pipe(catchError(this.handleError));
  }

 
 
  // Create
  create(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.http.post(API_URL + '/placeBooking', data)
      .pipe(
        catchError(this.handleError)
      )
  }
  // Create
  createpayment(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.http.post(API_URL + '/placeBooking/Payment', data)
      .pipe(
        catchError(this.handleError)
      )
  }

 //get Train By ID
 getBookingById(pnr: number) {
   let API_URL=`${this.apiUrl}`+`/getBookingByPnr/${pnr}`;
  return this.http.get(API_URL).pipe(catchError(this.handleError));
}

  // Update Train Details
  update(pnr: any, data: any): Observable<any> {
    let API_URL = `${this.apiUrl}`+`/updateBooking/${pnr}`;
      return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }


// Delete
delete(pnr: any): Observable<any> {
  var API_URL = `${this.apiUrl}` +`/cancelBookingByPnr/${pnr}`;
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
