import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PriceBreakdown {
  baseFare: number;
  discountPercentage: number;
  discountAmount: number;
  totalAmount: number;
  daysUntilTravel: number;
}

export interface FlightBookingRequest {
  flightScheduleId: number;
  userId: number;
  seatCategory: string;
  numberOfTickets: number;
  totalAmount: number;
  baseFare: number;
  discountAmount: number;
  passengerDetailsJson: string;
  bookingStatus: string;
}

// export interface FlightBooking {
//   bookingId: number;
//   flightScheduleId: number;
//   userId: number;
//   seatCategory: string;
//   numberOfTickets: number;
//   totalAmount: number;
//   passengerDetailsJson: string;
//   bookingStatus: string;
//   bookingDate: string;
//   refundAmount: number;
//   flightInfo?: string;
//   refundPercentage?: number;
// }


// flight-booking.service.ts
export interface FlightBooking {
  bookingId: number;
  flightScheduleId: number;
  userId: number;
  seatCategory: string;
  numberOfTickets: number;
  totalAmount: number;
  baseFare?: number;           // Add this
  discountAmount?: number;     // Add this
  refundAmount?: number;       // Add this
  passengerDetailsJson: string;
  bookingStatus: string;
  bookingDate?: string;
}


export interface CancellationResponse {
  success: boolean;
  message: string;
  refundAmount?: number;
  refundPercentage?: number;
}
@Injectable({
  providedIn: 'root'
})
export class FlightBookingService {
  private baseUrl = 'http://localhost:8080/api/flightbooking';

  constructor(private http: HttpClient) {}

  bookFlight(booking: FlightBookingRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/book`, booking);
  }

  calculatePrice(scheduleId: number, seatCategory: string, numberOfTickets: number, travelDate: string): Observable<PriceBreakdown> {
    return this.http.get<PriceBreakdown>(`${this.baseUrl}/calculate-price`, {
      params: {
        scheduleId: scheduleId.toString(),
        seatCategory,
        numberOfTickets: numberOfTickets.toString(),
        travelDate
      }
    });
  }

  cancelBooking(bookingId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/cancel/${bookingId}`, {});
  }

  getBookingsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }

  downloadTicket(bookingId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download-ticket/${bookingId}`, {
      responseType: 'blob'
    });
  }

  downloadRefund(bookingId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download-refund/${bookingId}`, {
      responseType: 'blob'
    });
  }
}
