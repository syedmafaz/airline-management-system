import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Flight {
  flightId: number;  // <-- use `flightId`, not `flightID`
  carrierId: number;
  origin: string;
  destination: string;
  airFare: number;
  seatCapacityEconomyClass: number;
  seatCapacityBusinessClass: number;
  seatCapacityExecutiveClass: number;
}


import { Carrier } from './carrier.service';
import { FlightSchedule } from './flight-schedule.service';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private flightBaseUrl = 'http://localhost:8080/api/flight';

  constructor(private http: HttpClient) {}

  // Flight Operations
  
  /**
   * Add a new flight
   */
  addFlight(flight: Flight): Observable<any> {
    console.log('FlightService: Adding flight', flight);
    return this.http.post(`${this.flightBaseUrl}/add`, flight).pipe(
      tap(response => console.log('FlightService: Flight added successfully', response)),
      catchError(this.handleError)
    );
  }

  /**
   * Update an existing flight
   */
  updateFlight(flight: Flight): Observable<any> {
    console.log('FlightService: Updating flight', flight);
    return this.http.put(`${this.flightBaseUrl}/update`, flight).pipe(
      tap(response => console.log('FlightService: Flight updated successfully', response)),
      catchError(this.handleError)
    );
  }

  /**
   * Delete a flight by ID
   */
  deleteFlight(id: number): Observable<any> {
    console.log('FlightService: Deleting flight with ID', id);
    return this.http.delete(`${this.flightBaseUrl}/delete/${id}`).pipe(
      tap(response => console.log('FlightService: Flight deleted successfully', response)),
      catchError(this.handleError)
    );
  }

  /**
   * Get all flights
   */
  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.flightBaseUrl}/list`).pipe(
      tap(flights => console.log('FlightService: Retrieved flights', flights)),
      catchError(this.handleError)
    );
  }

  /**
   * Get flight by ID
   */
  getFlightById(id: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.flightBaseUrl}/search/${id}`).pipe(
      tap(flight => console.log('FlightService: Retrieved flight', flight)),
      catchError(this.handleError)
    );
  }



  // Utility Methods

  /**
   * Get flights by carrier ID
   */
  // getFlightsByCarrierId(carrierId: number): Observable<Flight[]> {
  //   return this.http.get<Flight[]>(`${this.flightBaseUrl}/carrier/${carrierId}`).pipe(
  //     tap(flights => console.log('FlightService: Retrieved flights by carrier', flights)),
  //     catchError(this.handleError)
  //   );
  // }


  getFlightsByCarrierId(carrierId: number): Observable<Flight[]> {
  return this.http.get<Flight[]>(`${this.flightBaseUrl}/carrier/${carrierId}`).pipe(
    catchError(this.handleError)
  );
}

  /**
   * Search flights by origin and destination
   */
  searchFlights(origin: string, destination: string): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.flightBaseUrl}/search`, {
      params: { origin, destination }
    }).pipe(
      tap(flights => console.log('FlightService: Search results', flights)),
      catchError(this.handleError)
    );
  }

  // Add these methods to your existing FlightService

/**
 * Validate bulk flights for duplicates
 */
bulkValidate(carrierId: number, flights: Flight[]): Observable<any> {
  return this.http.post(`${this.flightBaseUrl}/bulk/${carrierId}`, flights).pipe(
    catchError(this.handleError)
  );
}

/**
 * Insert bulk flights
 */
bulkInsert(carrierId: number, flights: Flight[]): Observable<any> {
  return this.http.post(`${this.flightBaseUrl}/bulk/insert/${carrierId}`, flights).pipe(
    catchError(this.handleError)
  );
}

// Add this method to flight.service.ts
getFlightsByCarrier(carrierId: number): Observable<Flight[]> {
  return this.http.get<Flight[]>(`${this.flightBaseUrl}/carrier/${carrierId}`)
    .pipe(catchError(this.handleError));
}

getSchedulesByFlightId(flightId: number): Observable<FlightSchedule[]> {
  return this.http.get<FlightSchedule[]>(`${this.flightBaseUrl}/schedule/${flightId}`)
    .pipe(catchError(this.handleError));
}


  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('FlightService: An error occurred', error);
    
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 0) {
        errorMessage = 'Unable to connect to the server. Please check your connection.';
      } else if (error.status === 404) {
        errorMessage = 'The requested resource was not found.';
      } else if (error.status === 400) {
        errorMessage = error.error?.message || 'Bad request. Please check your data.';
      } else if (error.status === 500) {
        errorMessage = error.error?.message || 'Server error. Please try again later.';
      } else {
        errorMessage = error.error?.message || `Server Error: ${error.status}`;
      }
    }
    
    return throwError(() => ({
      ...error,
      message: errorMessage
    }));
  }
}