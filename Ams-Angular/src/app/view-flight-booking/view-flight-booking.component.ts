// import { Component, OnInit } from '@angular/core';
// import { FlightBookingService, FlightBooking } from '../services/flight-booking.service';
// import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
// import { FlightService, Flight } from '../services/flight.service';
// import { CarrierService, Carrier } from '../services/carrier.service';

// @Component({
//   selector: 'app-view-flight-booking',
//   templateUrl: './view-flight-booking.component.html',
//   styleUrls: ['./view-flight-booking.component.css']
// })
// export class ViewFlightBookingComponent implements OnInit {
//   bookings: FlightBooking[] = [];
//   schedules: FlightSchedule[] = [];
//   flights: Flight[] = [];
//   carriers: Carrier[] = [];

//   message = '';
//   userId = 1; // Replace this with actual logged-in user ID

//   constructor(
//     private bookingService: FlightBookingService,
//     private scheduleService: FlightScheduleService,
//     private flightService: FlightService,
//     private carrierService: CarrierService
//   ) {}

//   ngOnInit(): void {
//     this.loadCarriers();
//     this.loadFlights();
//     this.loadSchedules();
//     this.loadBookings();
//   }

//   loadCarriers(): void {
//     this.carrierService.getAllCarriers().subscribe({
//       next: (data) => (this.carriers = data),
//       error: () => (this.message = 'Error loading carriers')
//     });
//   }

//   loadFlights(): void {
//     this.flightService.getAllFlights().subscribe({
//       next: (data) => (this.flights = data),
//       error: () => (this.message = 'Error loading flights')
//     });
//   }

//   loadSchedules(): void {
//     this.scheduleService.getAllSchedules().subscribe({
//       next: (data) => (this.schedules = data),
//       error: () => (this.message = 'Error loading flight schedules')
//     });
//   }

//   loadBookings(): void {
//     this.bookingService.getBookingsByUserId(this.userId).subscribe({
//       next: (data) => (this.bookings = data),
//       error: () => (this.message = 'Error loading bookings')
//     });
//   }

//   getSchedule(scheduleId: number): FlightSchedule | undefined {
//     return this.schedules.find(s => s.flightScheduleId === scheduleId);
//   }

//   getFlight(flightId: number): Flight | undefined {
//     return this.flights.find(f => f.flightId === flightId);
//   }

//   getCarrier(carrierId: number): Carrier | undefined {
//     return this.carriers.find(c => c.carrierID === carrierId);
//   }

//   cancelBooking(bookingId: number): void {
//     if (confirm(`Are you sure you want to cancel booking ID ${bookingId}?`)) {
//       this.bookingService.cancelBooking(bookingId).subscribe({
//         next: () => {
//           this.message = `Booking ${bookingId} cancelled successfully.`;
//           this.loadBookings();
//         },
//         error: () => {
//           this.message = 'Failed to cancel booking.';
//         }
//       });
//     }
//   }
// }




 // // // import { Component, OnInit } from '@angular/core';
// // // import { FlightBookingService, FlightBooking } from '../services/flight-booking.service';
// // // import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
// // // import { FlightService, Flight } from '../services/flight.service';
// // // import { CarrierService, Carrier } from '../services/carrier.service';
// // // import { AuthService } from '../services/auth.service';

// // // @Component({
// // //   selector: 'app-view-flight-booking',
// // //   templateUrl: './view-flight-booking.component.html',
// // //   styleUrls: ['./view-flight-booking.component.css']
// // // })
// // // export class ViewFlightBookingComponent implements OnInit {
// // //   bookings: FlightBooking[] = [];
// // //   schedules: FlightSchedule[] = [];
// // //   flights: Flight[] = [];
// // //   carriers: Carrier[] = [];

// // //   message = '';
// // //   userId = 1;
// // //    // Replace this with actual logged-in user ID

// // //   constructor(
// // //     private bookingService: FlightBookingService,
// // //     private scheduleService: FlightScheduleService,
// // //     private flightService: FlightService,
// // //     private carrierService: CarrierService
// // //   ) {}

// // //   ngOnInit(): void {
// // //     this.loadCarriers();
// // //     this.loadFlights();
// // //     this.loadSchedules();
// // //     this.loadBookings();
// // //   }

// // //   loadCarriers(): void {
// // //     this.carrierService.getAllCarriers().subscribe({
// // //       next: (data) => (this.carriers = data),
// // //       error: () => (this.message = 'Error loading carriers')
// // //     });
// // //   }

// // //   loadFlights(): void {
// // //     this.flightService.getAllFlights().subscribe({
// // //       next: (data) => (this.flights = data),
// // //       error: () => (this.message = 'Error loading flights')
// // //     });
// // //   }

// // //   loadSchedules(): void {
// // //     this.scheduleService.getAllSchedules().subscribe({
// // //       next: (data) => (this.schedules = data),
// // //       error: () => (this.message = 'Error loading flight schedules')
// // //     });
// // //   }

// // //   loadBookings(): void {
// // //     this.bookingService.getBookingsByUserId(this.userId).subscribe({
// // //       next: (data) => (this.bookings = data),
// // //       error: () => (this.message = 'Error loading bookings')
// // //     });
// // //   }

// // //   getSchedule(scheduleId: number): FlightSchedule | undefined {
// // //     return this.schedules.find(s => s.flightScheduleId === scheduleId);
// // //   }

// // //   getFlight(flightId: number): Flight | undefined {
// // //     return this.flights.find(f => f.flightId === flightId);
// // //   }

// // //   getCarrier(carrierId: number): Carrier | undefined {
// // //     return this.carriers.find(c => c.carrierID === carrierId);
// // //   }

// // //   cancelBooking(bookingId: number): void {
// // //     if (confirm(`Are you sure you want to cancel booking ID ${bookingId}?`)) {
// // //       this.bookingService.cancelBooking(bookingId).subscribe({
// // //         next: () => {
// // //           this.message = `Booking ${bookingId} cancelled successfully.`;
// // //           this.loadBookings();
// // //         },
// // //         error: () => {
// // //           this.message = 'Failed to cancel booking.';
// // //         }
// // //       });
// // //     }
// // //   }
// // // }




// // import { Component, OnInit } from '@angular/core';
// // import { FlightBookingService, FlightBooking } from '../services/flight-booking.service';
// // import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';

// // @Component({
// //   selector: 'app-view-user-bookings',
// //   templateUrl: './view-flight-booking.component.html',
// //   styleUrls: ['./view-flight-booking.component.css']
// // })
// // export class ViewFlightBookingComponent implements OnInit {
// //   userId: number | null = null;
// //   bookings: FlightBooking[] = [];
// //   loading: boolean = true;
// //   error: string = '';
// //   message: string = '';

// //   constructor(
// //     private bookingService: FlightBookingService,
// //     private scheduleService: FlightScheduleService
// //   ) {}

// //   ngOnInit(): void {
// //     const userIdStr = localStorage.getItem('userId');
// //     if (userIdStr) {
// //       this.userId = parseInt(userIdStr, 10);
// //       this.fetchUserBookings();
// //     } else {
// //       this.error = 'User not logged in. Please log in again.';
// //       this.loading = false;
// //     }
// //   }

// //   fetchUserBookings(): void {
// //     if (this.userId !== null) {
// //       this.bookingService.getBookingsByUserId(this.userId).subscribe({
// //         next: (bookings) => {
// //           this.bookings = bookings;
// //           this.loading = false;
// //           if (bookings.length === 0) {
// //             this.message = 'No bookings found for your account.';
// //           }
// //         },
// //         error: (err) => {
// //           this.error = 'Error fetching bookings.';
// //           this.loading = false;
// //           console.error('Fetch booking error:', err);
// //         }
// //       });
// //     }
// //   }


// //   getPassengerList(jsonStr: string): any[] {
// //     try {
// //       return JSON.parse(jsonStr);
// //     } catch {
// //       return [];
// //     }
// //   }

// //   cancelBooking(bookingId: number): void {
// //     if (!confirm('Are you sure you want to cancel this booking?')) return;
// //     this.bookingService.cancelBooking(bookingId).subscribe({
// //       next: () => {
// //         this.bookings = this.bookings.filter(b => b.bookingId !== bookingId);
// //         this.message = 'Booking cancelled successfully.';
// //       },
// //       error: (err) => {
// //         this.error = 'Error cancelling booking.';
// //         console.error('Cancel error:', err);
// //       }
// //     });
// //   }
// // }



// import { Component, OnInit } from '@angular/core';
// import { FlightBookingService, FlightBooking } from '../services/flight-booking.service';

// @Component({
//     selector: 'app-view-user-bookings',
//     templateUrl: './view-flight-booking.component.html',
//     styleUrls: ['./view-flight-booking.component.css']
//   })
// export class ViewFlightBookingComponent implements OnInit {
//   bookings: FlightBooking[] = [];
//   loading: boolean = true;
//   error: string = '';
//   message: string = '';

//   constructor(private bookingService: FlightBookingService) {}

//   ngOnInit(): void {
//     this.loadUserBookings();
//   }

//   loadUserBookings(): void {
//     const userIdStr = localStorage.getItem('userId');
//     if (userIdStr) {
//       const userId = parseInt(userIdStr, 10);
//       this.bookingService.getBookingsByUserId(userId).subscribe({
//         next: (bookings) => {
//           this.bookings = bookings;
//           this.loading = false;
//           if (bookings.length === 0) {
//             this.message = 'No bookings found.';
//           }
//         },
//         error: (err) => {
//           this.error = 'Error fetching bookings.';
//           this.loading = false;
//           console.error(err);
//         }
//       });
//     } else {
//       this.error = 'User not logged in. Please log in again.';
//       this.loading = false;
//     }
//   }

//   cancelBooking(bookingId: number): void {
//     if (!confirm('Are you sure you want to cancel this booking?')) return;

//     this.bookingService.cancelBooking(bookingId).subscribe({
//       next: () => {
//         this.message = 'Booking cancelled successfully.';
//         this.loadUserBookings(); // reload updated bookings
//       },
//       error: (err) => {
//         this.error = 'Failed to cancel booking.';
//         console.error(err);
//       }
//     });
//   }

//   getPassengerList(jsonStr: string): any[] {
//     try {
//       return JSON.parse(jsonStr);
//     } catch {
//       return [];
//     }
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { FlightBookingService, FlightBooking } from '../services/flight-booking.service';
// import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
// import { FlightService, Flight } from '../services/flight.service';
// import { CarrierService, Carrier } from '../services/carrier.service';

// @Component({
//   selector: 'app-view-user-bookings',
//   templateUrl: './view-flight-booking.component.html',
//   styleUrls: ['./view-flight-booking.component.css']
// })
// export class ViewFlightBookingComponent implements OnInit {
//   bookings: FlightBooking[] = [];
//   schedules: FlightSchedule[] = [];
//   flights: Flight[] = [];
//   carriers: Carrier[] = [];

//   loading: boolean = true;
//   error: string = '';
//   message: string = '';

//   constructor(
//     private bookingService: FlightBookingService,
//     private scheduleService: FlightScheduleService,
//     private flightService: FlightService,
//     private carrierService: CarrierService
//   ) {}

//   ngOnInit(): void {
//     this.loadInitialData();
//   }

//   loadInitialData(): void {
//     this.loadCarriers();
//     this.loadFlights();
//     this.loadSchedules();
//     this.loadUserBookings();
//   }

//   loadUserBookings(): void {
//     const userIdStr = localStorage.getItem('userId');
//     if (userIdStr) {
//       const userId = parseInt(userIdStr, 10);
//       this.bookingService.getBookingsByUser(userId).subscribe({
//         next: (bookings) => {
//           this.bookings = bookings;
//           this.loading = false;
//           if (bookings.length === 0) {
//             this.message = 'No bookings found.';
//           }
//         },
//         error: (err) => {
//           this.error = 'Error fetching bookings.';
//           this.loading = false;
//           console.error(err);
//         }
//       });
//     } else {
//       this.error = 'User not logged in. Please log in again.';
//       this.loading = false;
//     }
//   }

//   loadCarriers(): void {
//     this.carrierService.getAllCarriers().subscribe({
//       next: (data) => (this.carriers = data),
//       error: () => (this.message = 'Error loading carriers')
//     });
//   }

//   loadFlights(): void {
//     this.flightService.getAllFlights().subscribe({
//       next: (data) => (this.flights = data),
//       error: () => (this.message = 'Error loading flights')
//     });
//   }

//   loadSchedules(): void {
//     this.scheduleService.getAllSchedules().subscribe({
//       next: (data) => (this.schedules = data),
//       error: () => (this.message = 'Error loading schedules')
//     });
//   }

//   cancelBooking(bookingId: number): void {
//     if (!confirm('Are you sure you want to cancel this booking?')) return;

//     this.bookingService.cancelBooking(bookingId).subscribe({
//       next: () => {
//         this.message = 'Booking cancelled successfully.';
//         this.loadUserBookings(); // Reload updated bookings
//       },
//       error: (err) => {
//         this.error = 'Failed to cancel booking.';
//         console.error(err);
//       }
//     });
//   }

//   getPassengerList(jsonStr: string): any[] {
//     try {
//       return JSON.parse(jsonStr);
//     } catch {
//       return [];
//     }
//   }

//   getSchedule(scheduleId: number): FlightSchedule | undefined {
//     return this.schedules.find(s => s.flightScheduleId === scheduleId);
//   }

//   getFlight(flightId: number): Flight | undefined {
//     return this.flights.find(f => f.flightId === flightId);
//   }

//   getFlightName(flightId: number): string {
//     const flight = this.flights.find(f => f.flightId === flightId);
//     return flight ? `#${flight.flightId} -> ${flight.origin} to ${flight.destination}` : 'Unknown Flight';
//   }


//   getFlightNameFromSchedule(scheduleId: number): string {
//      const schedule = this.getSchedule(scheduleId);
//      if (!schedule) return 'Unknown Schedule';
    
//      const flight = this.getFlight(schedule.flightId);
//      return flight ? `#${flight.flightId} -> ${flight.origin} to ${flight.destination}` : 'Unknown Flight';
//     }

//   getCarrier(carrierId: number): Carrier | undefined {
//     return this.carriers.find(c => c.carrierID === carrierId);
//   }
// }


// view-flight-booking.component.ts
import { Component, OnInit } from '@angular/core';
import { FlightBookingService, FlightBooking, CancellationResponse } from '../services/flight-booking.service';
import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
import { FlightService, Flight } from '../services/flight.service';
import { CarrierService, Carrier } from '../services/carrier.service';

@Component({
  selector: 'app-view-user-bookings',
  templateUrl: './view-flight-booking.component.html',
  styleUrls: ['./view-flight-booking.component.css']
})
export class ViewFlightBookingComponent implements OnInit {
  bookings: FlightBooking[] = [];
  schedules: FlightSchedule[] = [];
  flights: Flight[] = [];
  carriers: Carrier[] = [];

  loading: boolean = true;
  error: string = '';
  message: string = '';
  processingCancellation: number | null = null;

  constructor(
    private bookingService: FlightBookingService,
    private scheduleService: FlightScheduleService,
    private flightService: FlightService,
    private carrierService: CarrierService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.loadCarriers();
    this.loadFlights();
    this.loadSchedules();
    this.loadUserBookings();
  }

  loadUserBookings(): void {
    const userIdStr = localStorage.getItem('userId');
    if (userIdStr) {
      const userId = parseInt(userIdStr, 10);
      this.bookingService.getBookingsByUser(userId).subscribe({
        next: (bookings) => {
          this.bookings = bookings;
          this.loading = false;
          if (bookings.length === 0) {
            this.message = 'No bookings found.';
          }
        },
        error: (err) => {
          this.error = 'Error fetching bookings.';
          this.loading = false;
          console.error(err);
        }
      });
    } else {
      this.error = 'User not logged in. Please log in again.';
      this.loading = false;
    }
  }

  loadCarriers(): void {
    this.carrierService.getAllCarriers().subscribe({
      next: (data) => (this.carriers = data),
      error: () => (this.message = 'Error loading carriers')
    });
  }

  loadFlights(): void {
    this.flightService.getAllFlights().subscribe({
      next: (data) => (this.flights = data),
      error: () => (this.message = 'Error loading flights')
    });
  }

  loadSchedules(): void {
    this.scheduleService.getAllSchedules().subscribe({
      next: (data) => (this.schedules = data),
      error: () => (this.message = 'Error loading schedules')
    });
  }

  cancelBooking(bookingId: number): void {
    if (!confirm('Are you sure you want to cancel this booking? Refund will be processed according to cancellation policy.')) return;

    this.processingCancellation = bookingId;
    this.message = '';
    this.error = '';

    this.bookingService.cancelBooking(bookingId).subscribe({
      next: (response: CancellationResponse) => {
        this.processingCancellation = null;
        
        if (response.success) {
          this.message = `✅ ${response.message}. Refund Amount: ₹${response.refundAmount || 0}`;
          
          // Auto-download refund receipt
          setTimeout(() => {
            this.downloadRefund(bookingId);
          }, 1000);
          
          // Reload bookings to show updated status
          this.loadUserBookings();
        } else {
          this.error = `❌ ${response.message}`;
        }
      },
      error: (err) => {
        this.processingCancellation = null;
        this.error = '❌ Failed to cancel booking. Please try again.';
        console.error(err);
      }
    });
  }

  // downloadTicket(bookingId: number): void {
  //   this.bookingService.downloadTicket(bookingId).subscribe({
  //     next: (blob) => {
  //       const url = window.URL.createObjectURL(blob);
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.download = `flight-ticket-${bookingId}.html`;
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //       window.URL.revokeObjectURL(url);
  //     },
  //     error: () => {
  //       this.error = '❌ Failed to download ticket';
  //     }
  //   });
  // }

  // downloadRefund(bookingId: number): void {
  //   this.bookingService.downloadRefund(bookingId).subscribe({
  //     next: (blob) => {
  //       const url = window.URL.createObjectURL(blob);
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.download = `refund-receipt-${bookingId}.html`;
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //       window.URL.revokeObjectURL(url);
  //     },
  //     error: () => {
  //       this.error = '❌ Failed to download refund receipt';
  //     }
  //   });
  // }


  // Update the download methods in view-flight-booking.component.ts
downloadTicket(bookingId: number): void {
  this.bookingService.downloadTicket(bookingId).subscribe({
    next: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `flight-ticket-${bookingId}.pdf`; // Changed to .pdf
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    error: () => {
      this.error = '❌ Failed to download ticket';
    }
  });
}

downloadRefund(bookingId: number): void {
  this.bookingService.downloadRefund(bookingId).subscribe({
    next: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `refund-receipt-${bookingId}.pdf`; // Changed to .pdf
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    error: () => {
      this.error = '❌ Failed to download refund receipt';
    }
  });
}


  getPassengerList(jsonStr: string): any[] {
    try {
      return JSON.parse(jsonStr);
    } catch {
      return [];
    }
  }

  getSchedule(scheduleId: number): FlightSchedule | undefined {
    return this.schedules.find(s => s.flightScheduleId === scheduleId);
  }

  getFlight(flightId: number): Flight | undefined {
    return this.flights.find(f => f.flightId === flightId);
  }

  getFlightName(flightId: number): string {
    const flight = this.flights.find(f => f.flightId === flightId);
    return flight ? `#${flight.flightId} -> ${flight.origin} to ${flight.destination}` : 'Unknown Flight';
  }

  getFlightNameFromSchedule(scheduleId: number): string {
    const schedule = this.getSchedule(scheduleId);
    if (!schedule) return 'Unknown Schedule';
    
    const flight = this.getFlight(schedule.flightId);
    return flight ? `#${flight.flightId} -> ${flight.origin} to ${flight.destination}` : 'Unknown Flight';
  }

  getCarrier(carrierId: number): Carrier | undefined {
    return this.carriers.find(c => c.carrierID === carrierId);
  }

  getEffectiveStatus(booking: FlightBooking): string {
    if (booking.bookingStatus?.toLowerCase() === 'cancelled') {
      return 'cancelled';
    }
    const schedule = this.getSchedule(booking.flightScheduleId);
    if (schedule) {
      const dateStr = schedule.departureDate || schedule.dateOfTravel;
      if (dateStr) {
        const travelDate = new Date(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        travelDate.setHours(0, 0, 0, 0);
        if (travelDate < today) {
          return 'completed';
        }
      }
    }
    return 'booked';
  }

  getStatusBadgeClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'booked': return 'status-booked';
      case 'cancelled': return 'status-cancelled';
      case 'completed': return 'status-completed';
      default: return 'status-default';
    }
  }

  canCancel(booking: FlightBooking): boolean {
    if (this.getEffectiveStatus(booking) !== 'booked') return false;
    const schedule = this.getSchedule(booking.flightScheduleId);
    if (!schedule) return false;
    
    const dateStr = schedule.departureDate || schedule.dateOfTravel;
    if (!dateStr) return false;
    const travelDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    travelDate.setHours(0, 0, 0, 0);
    return travelDate > today;
  }

  getDaysUntilTravel(scheduleId: number): number {
    const schedule = this.getSchedule(scheduleId);
    if (!schedule) return 0;
    
    const dateStr = schedule.departureDate || schedule.dateOfTravel;
    if (!dateStr) return 0;
    const travelDate = new Date(dateStr);
    const today = new Date();
    const diffTime = travelDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getActiveBookingsCount(): number {
    return this.bookings.filter(b => this.getEffectiveStatus(b) === 'booked').length;
  }

  getCompletedBookingsCount(): number {
    return this.bookings.filter(b => this.getEffectiveStatus(b) === 'completed').length;
  }

  getCancelledBookingsCount(): number {
    return this.bookings.filter(b => b.bookingStatus?.toLowerCase() === 'cancelled').length;
  }

  getCarrierName(scheduleId: number): string {
    const schedule = this.getSchedule(scheduleId);
    if (!schedule || !schedule.flightId) return 'Unknown Carrier';
    const flight = this.getFlight(schedule.flightId);
    if (!flight || !flight.carrierId) return 'Unknown Carrier';
    const carrier = this.getCarrier(flight.carrierId);
    return carrier?.carrierName || 'Unknown Carrier';
  }

}
