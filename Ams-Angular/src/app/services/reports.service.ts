// // reports.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface BookingReport {
//   bookingId: number;
//   flightScheduleId: number;
//   userId: number;
//   userName?: string;
//   userEmail?: string;
//   seatCategory: string;
//   numberOfTickets: number;
//   totalAmount: number;
//   baseFare?: number;
//   discountAmount?: number;
//   refundAmount?: number;
//   passengerDetailsJson: string;
//   bookingStatus: string;
//   bookingDate?: string;
//   // Flight Schedule details
//   dateOfTravel?: string;
//   departureTime?: string;
//   arrivalTime?: string;
//   // Flight details
//   flightNumber?: string;
//   origin?: string;
//   destination?: string;
//   // Carrier details
//   carrierName?: string;
// }

// export interface ReportSummary {
//   totalBookings: number;
//   totalRevenue: number;
//   totalRefunds: number;
//   activeBookings: number;
//   cancelledBookings: number;
//   totalPassengers: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ReportsService {
//   private baseUrl = 'http://localhost:8080/api/reports';

//   constructor(private http: HttpClient) {}

//   getBookingsByCarrier(carrierId: number): Observable<BookingReport[]> {
//     return this.http.get<BookingReport[]>(`${this.baseUrl}/carrier/${carrierId}/bookings`);
//   }

//   getBookingsByFlight(flightId: number): Observable<BookingReport[]> {
//     return this.http.get<BookingReport[]>(`${this.baseUrl}/flight/${flightId}/bookings`);
//   }

//   getBookingsBySchedule(scheduleId: number): Observable<BookingReport[]> {
//     return this.http.get<BookingReport[]>(`${this.baseUrl}/schedule/${scheduleId}/bookings`);
//   }

//   getReportSummary(carrierId?: number, flightId?: number): Observable<ReportSummary> {
//     let url = `${this.baseUrl}/summary`;
//     const params = [];
//     if (carrierId) params.push(`carrierId=${carrierId}`);
//     if (flightId) params.push(`flightId=${flightId}`);
//     if (params.length > 0) url += '?' + params.join('&');
    
//     return this.http.get<ReportSummary>(url);
//   }

//   getAllBookings(): Observable<BookingReport[]> {
//     return this.http.get<BookingReport[]>(`${this.baseUrl}/all-bookings`);
//   }

//   exportBookingsToCSV(carrierId?: number, flightId?: number): Observable<Blob> {
//     let url = `${this.baseUrl}/export/csv`;
//     const params = [];
//     if (carrierId) params.push(`carrierId=${carrierId}`);
//     if (flightId) params.push(`flightId=${flightId}`);
//     if (params.length > 0) url += '?' + params.join('&');
    
//     return this.http.get(url, { responseType: 'blob' });
//   }
// }



// reports.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, throwError } from 'rxjs';

// export interface BookingReport {
//   bookingId: number;
//   flightScheduleId: number;
//   userId: number;
//   userName?: string;
//   userEmail?: string;
//   seatCategory: string;
//   numberOfTickets: number;
//   totalAmount: number;
//   baseFare?: number;
//   discountAmount?: number;
//   refundAmount?: number;
//   passengerDetailsJson: string;
//   bookingStatus: string;
//   bookingDate?: string;
//   // Flight Schedule details
//   dateOfTravel?: string;
//   departureTime?: string;
//   arrivalTime?: string;
//   // Flight details
//   flightNumber?: string;
//   origin?: string;
//   destination?: string;
//   // Carrier details
//   carrierName?: string;
// }


export interface BookingReport {
  bookingId: number;
  flightScheduleId: number;
  userId: number;
  userName?: string;
  userEmail?: string;
  seatCategory: string;
  numberOfTickets: number;
  totalAmount: number;
  baseFare?: number;
  discountAmount?: number;
  refundAmount?: number;
  passengerDetailsJson: string;
  bookingStatus: string;
  bookingDate?: string;
  dateOfTravel?: string;
  departureTime?: string;
  arrivalTime?: string;
  flightNumber?: string;
  origin?: string;
  destination?: string;
  carrierName?: string;
  
  // Add these if they exist in your backend
  cancellationDate?: string;
  cancellationReason?: string;
  paymentMethod?: string;
  paymentStatus?: string;
}
export interface ReportSummary {
  totalBookings: number;
  totalRevenue: number;
  totalRefunds: number;
  activeBookings: number;
  cancelledBookings: number;
  totalPassengers: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private baseUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  getBookingsByCarrier(carrierId: number): Observable<BookingReport[]> {
    return this.http.get<BookingReport[]>(`${this.baseUrl}/carrier/${carrierId}/bookings`);
  }

  getBookingsByFlight(flightId: number): Observable<BookingReport[]> {
    return this.http.get<BookingReport[]>(`${this.baseUrl}/flight/${flightId}/bookings`);
  }

//   getBookingsBySchedule(scheduleId: number): Observable<BookingReport[]> {
//     return this.http.get<BookingReport[]>(`${this.baseUrl}/schedule/${scheduleId}/bookings`);
//   }

getBookingsBySchedule(scheduleId: number): Observable<BookingReport[]> {
  if (!scheduleId || isNaN(scheduleId)) {
    return throwError(() => new Error('Invalid schedule ID'));
  }
  
  return this.http.get<BookingReport[]>(`${this.baseUrl}/schedule/${scheduleId}/bookings`).pipe(
    catchError(error => {
      console.error('API Error:', error);
      return throwError(() => new Error('Failed to fetch bookings. Please try again later.'));
    }),
    map((response: BookingReport[] | any) => {
      // Transform the response if needed
      if (Array.isArray(response)) {
        return response;
      }
      // Handle case where backend returns a different structure
      if (response && response.data) {
        return response.data;
      }
      return [];
    })
  );
}

  getReportSummary(carrierId?: number, flightId?: number): Observable<ReportSummary> {
    let url = `${this.baseUrl}/summary`;
    const params = [];
    if (carrierId) params.push(`carrierId=${carrierId}`);
    if (flightId) params.push(`flightId=${flightId}`);
    if (params.length > 0) url += '?' + params.join('&');
    
    return this.http.get<ReportSummary>(url);
  }

  getAllBookings(): Observable<BookingReport[]> {
    return this.http.get<BookingReport[]>(`${this.baseUrl}/all-bookings`);
  }

  exportBookingsToCSV(carrierId?: number, flightId?: number): Observable<Blob> {
    let url = `${this.baseUrl}/export/csv`;
    const params = [];
    if (carrierId) params.push(`carrierId=${carrierId}`);
    if (flightId) params.push(`flightId=${flightId}`);
    if (params.length > 0) url += '?' + params.join('&');
    
    return this.http.get(url, { responseType: 'blob' });
  }
}
