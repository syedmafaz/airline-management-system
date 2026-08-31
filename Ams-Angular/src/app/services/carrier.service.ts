// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface Carrier {
//   carrierID: number;
//   carrierName: string;
//   discountPercentageThirtyDaysAdvanceBooking: number;
//   discountPercentageSixtyDaysAdvanceBooking: number;
//   discountPercentageNinteyDaysAdvanceBooking: number;
//   refundPercentageForTicketCancellation2DaysBeforeTravelDate: number;
//   refundPercentageForTicketCancellation10DaysBeforeTravelDate: number;
//   refundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate: number;
//   silverUserDiscount: number;
//   goldUserDiscount: number;
//   platinumUserDiscount: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class CarrierService {
//   private baseUrl = 'http://localhost:8080/api/carrier';

//   constructor(private http: HttpClient) {}


//   addCarrier(carrier: Carrier): Observable<any> {
//     return this.http.post(`${this.baseUrl}/add`, carrier);
//   }

 
//   updateCarrier(carrier: Carrier): Observable<any> {
//     return this.http.put(`${this.baseUrl}/update`, carrier);
//   }


//   deleteCarrier(id: number): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/delete/${id}`);
//   }


//   getAllCarriers(): Observable<Carrier[]> {
//     return this.http.get<Carrier[]>(`${this.baseUrl}/list`);
//   }

 
//   getCarrierById(id: number): Observable<Carrier> {
//     return this.http.get<Carrier>(`${this.baseUrl}/search/${id}`);
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Carrier {
  carrierID: number;
  carrierName: string;
  discountPercentageThirtyDaysAdvanceBooking: number;
  discountPercentageSixtyDaysAdvanceBooking: number;
  discountPercentageNinteyDaysAdvanceBooking: number;
  refundPercentageForTicketCancellation2DaysBeforeTravelDate: number;
  refundPercentageForTicketCancellation10DaysBeforeTravelDate: number;
  refundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate: number;
  silverUserDiscount: number;
  goldUserDiscount: number;
  platinumUserDiscount: number;
}

export interface BulkUploadResponse {
  success: boolean;
  message: string;
  successCount: number;
  errorCount: number;
  errors?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CarrierService {
  private baseUrl = 'http://localhost:8080/api/carrier';

  constructor(private http: HttpClient) {}

  addCarrier(carrier: Carrier): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, carrier);
  }

  updateCarrier(carrier: Carrier): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, carrier);
  }

  deleteCarrier(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  getAllCarriers(): Observable<Carrier[]> {
    return this.http.get<Carrier[]>(`${this.baseUrl}/list`);
  }

  getCarrierById(id: number): Observable<Carrier> {
    return this.http.get<Carrier>(`${this.baseUrl}/search/${id}`);
  }

  // Bulk upload method
  bulkUploadCarriers(carriers: Carrier[]): Observable<BulkUploadResponse> {
    return this.http.post<BulkUploadResponse>(`${this.baseUrl}/bulk-upload`, carriers);
  }

  // Check for duplicate carrier names
  checkDuplicateCarrierNames(carrierNames: string[]): Observable<string[]> {
    return this.http.post<string[]>(`${this.baseUrl}/check-duplicates`, carrierNames);
  }
}