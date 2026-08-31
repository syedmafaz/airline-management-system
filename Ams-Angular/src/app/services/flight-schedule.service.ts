// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// export interface FlightSchedule {
//   flightScheduleId: number;
//   flightId: number;
//   dateOfTravel: string;
//   businessClassBookedCount: number;
//   economyClassBookedCount: number;
//   executiveClassBookedCount: number;
//   businessClassFare: number;
//   economyClassFare: number;
//   executiveClassFare: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class FlightScheduleService {
//   private scheduleBaseUrl = 'http://localhost:8080/api/flightschedule';

//   constructor(private http: HttpClient) {}

//   addSchedule(schedule: FlightSchedule): Observable<any> {
//     console.log('FlightScheduleService: Adding schedule', schedule);
//     return this.http.post(`${this.scheduleBaseUrl}/add`, schedule, { responseType: 'text' })
//       .pipe(catchError(this.handleError));
//   }

//   private handleError(error: HttpErrorResponse): Observable<never> {
//     console.error('FlightScheduleService: Error occurred', error);
//     let errorMessage = 'An error occurred.';

//     if (error.error instanceof ErrorEvent) {
//       // Client-side error
//       errorMessage = `Client Error: ${error.error.message}`;
//     } else {
//       // Server-side error
//       switch (error.status) {
//         case 0:
//           errorMessage = 'Unable to connect to server.';
//           break;
//         case 400:
//           errorMessage = error.error?.message || 'Invalid request.';
//           break;
//         case 404:
//           errorMessage = 'Schedule not found.';
//           break;
//         case 500:
//           errorMessage = 'Server error.';
//           break;
//         default:
//           errorMessage = `Server Error: ${error.status}`;
//       }
//     }

//     return throwError(() => ({ success: false, message: errorMessage }));
//   }

//   getAllSchedules(): Observable<FlightSchedule[]> {
//     return this.http.get<FlightSchedule[]>(`${this.scheduleBaseUrl}/list`)
//       .pipe(catchError(this.handleError));
//   }

//   deleteSchedule(scheduleId: number): Observable<any> {
//     return this.http.delete(`${this.scheduleBaseUrl}/delete/${scheduleId}`, { responseType: 'text' })
//       .pipe(catchError(this.handleError));
//   }

//   getFlightScheduleById(scheduleId: number): Observable<FlightSchedule> {
//     return this.http.get<FlightSchedule>(`${this.scheduleBaseUrl}/search/${scheduleId}`)
//       .pipe(catchError(this.handleError));
//   }

//   updateSchedule(schedule: FlightSchedule): Observable<any> {
//     return this.http.put(`${this.scheduleBaseUrl}/update`, schedule, { responseType: 'text' })
//       .pipe(catchError(this.handleError));
//   }
// }




import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface FlightSchedule {
  flightScheduleId: number;
  flightId: number;
  dateOfTravel: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  businessClassBookedCount: number;
  economyClassBookedCount: number;
  executiveClassBookedCount: number;
  businessClassFare: number;
  economyClassFare: number;
  executiveClassFare: number;
}

@Injectable({
  providedIn: 'root'
})
export class FlightScheduleService {
  private scheduleBaseUrl = 'http://localhost:8080/api/flightschedule';

  constructor(private http: HttpClient) {}

  // ✅ Add Schedule
  addSchedule(schedule: FlightSchedule): Observable<any> {
    console.log('FlightScheduleService: Adding schedule', schedule);
    return this.http.post(`${this.scheduleBaseUrl}/add`, schedule, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  // ✅ Get All Schedules
  getAllSchedules(): Observable<FlightSchedule[]> {
    return this.http.get<FlightSchedule[]>(`${this.scheduleBaseUrl}/list`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Get Schedule by ID
  getFlightScheduleById(scheduleId: number): Observable<FlightSchedule> {
    return this.http.get<FlightSchedule>(`${this.scheduleBaseUrl}/search/${scheduleId}`)
      .pipe(catchError(this.handleError));
  }

  // ✅ Update Schedule
  updateSchedule(schedule: FlightSchedule): Observable<any> {
    return this.http.put(`${this.scheduleBaseUrl}/update`, schedule, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  // ✅ Delete Schedule
  deleteSchedule(scheduleId: number): Observable<any> {
    return this.http.delete(`${this.scheduleBaseUrl}/delete/${scheduleId}`, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }


  // Add these methods to your existing FlightScheduleService

/**
 * Get schedules by flight ID
 */
getSchedulesByFlightId(flightId: number): Observable<FlightSchedule[]> {
  return this.http.get<FlightSchedule[]>(`${this.scheduleBaseUrl}/flight/${flightId}`)
    .pipe(catchError(this.handleError));
}

/**
 * Validate bulk schedules for duplicates
 */
bulkValidate(flightId: number, schedules: FlightSchedule[]): Observable<any> {
  return this.http.post(`${this.scheduleBaseUrl}/bulk/${flightId}`, schedules)
    .pipe(catchError(this.handleError));
}

/**
 * Insert bulk schedules
 */
bulkInsert(flightId: number, schedules: FlightSchedule[]): Observable<any> {
  return this.http.post(`${this.scheduleBaseUrl}/bulk/insert/${flightId}`, schedules)
    .pipe(catchError(this.handleError));
}

  // ✅ Error Handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('FlightScheduleService: Error occurred', error);
    let errorMessage = 'An error occurred.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 0:
          errorMessage = 'Unable to connect to server.';
          break;
        case 400:
          errorMessage = error.error?.message || 'Invalid request.';
          break;
        case 404:
          errorMessage = 'Schedule not found.';
          break;
        case 500:
          errorMessage = 'Server error.';
          break;
        default:
          errorMessage = `Server Error: ${error.status}`;
      }
    }

    return throwError(() => ({ success: false, message: errorMessage }));
  }
}
