// // reports.component.ts
// import { Component, OnInit } from '@angular/core';
// import { ReportsService, BookingReport, ReportSummary } from '../services/reports.service';
// import { CarrierService, Carrier } from '../services/carrier.service';
// import { FlightService, Flight } from '../services/flight.service';
// import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';

// interface FilterState {
//   selectedCarrier: Carrier | null;
//   selectedFlight: Flight | null;
//   selectedSchedule: FlightSchedule | null;
//   statusFilter: string;
//   dateFrom: string;
//   dateTo: string;
// }

// @Component({
//   selector: 'app-reports',
//   templateUrl: './reports.component.html',
//   styleUrls: ['./reports.component.css']
// })
// export class ReportsComponent implements OnInit {
//   // Data
//   carriers: Carrier[] = [];
//   flights: Flight[] = [];
//   schedules: FlightSchedule[] = [];
//   bookings: BookingReport[] = [];
//   filteredBookings: BookingReport[] = [];
  
//   // UI State
//   loading = false;
//   error = '';
//   message = '';
  
//   // Filter State
//   filters: FilterState = {
//     selectedCarrier: null,
//     selectedFlight: null,
//     selectedSchedule: null,
//     statusFilter: 'all',
//     dateFrom: '',
//     dateTo: ''
//   };
  
//   // Report Summary
//   reportSummary: ReportSummary | null = null;
  
//   // View State
//   currentView: 'carriers' | 'flights' | 'schedules' | 'bookings' = 'carriers';
//   showPassengerDetails = false;

//   constructor(
//     private reportsService: ReportsService,
//     private carrierService: CarrierService,
//     private flightService: FlightService,
//     private scheduleService: FlightScheduleService
//   ) {}

//   ngOnInit(): void {
//     this.loadCarriers();
//   }

//   loadCarriers(): void {
//     this.loading = true;
//     this.carrierService.getAllCarriers().subscribe({
//       next: (carriers) => {
//         this.carriers = carriers;
//         this.loading = false;
//         this.currentView = 'carriers';
//       },
//       error: () => {
//         this.error = 'Failed to load carriers';
//         this.loading = false;
//       }
//     });
//   }

//   selectCarrier(carrier: Carrier): void {
//     this.filters.selectedCarrier = carrier;
//     this.filters.selectedFlight = null;
//     this.filters.selectedSchedule = null;
//     this.loadFlightsByCarrier(carrier.carrierID);
//   }

//   loadFlightsByCarrier(carrierId: number): void {
//     this.loading = true;
//     this.flightService.getFlightsByCarrier(carrierId).subscribe({
//       next: (flights) => {
//         this.flights = flights;
//         this.loading = false;
//         this.currentView = 'flights';
//         this.loadReportSummary();
//       },
//       error: () => {
//         this.error = 'Failed to load flights';
//         this.loading = false;
//       }
//     });
//   }

//   selectFlight(flight: Flight): void {
//     this.filters.selectedFlight = flight;
//     this.filters.selectedSchedule = null;
//     this.loadSchedulesByFlight(flight.flightId);
//   }

//   loadSchedulesByFlight(flightId: number): void {
//     this.loading = true;
//     this.scheduleService.getSchedulesByFlightId(flightId).subscribe({
//       next: (schedules) => {
//         this.schedules = schedules;
//         this.loading = false;
//         this.currentView = 'schedules';
//         this.loadReportSummary();
//       },
//       error: () => {
//         this.error = 'Failed to load schedules';
//         this.loading = false;
//       }
//     });
//   }

//   selectSchedule(schedule: FlightSchedule): void {
//     this.filters.selectedSchedule = schedule;
//     this.loadBookingsBySchedule(schedule.flightScheduleId);
//   }

//   loadBookingsBySchedule(scheduleId: number): void {
//     this.loading = true;
//     this.reportsService.getBookingsBySchedule(scheduleId).subscribe({
//       next: (bookings) => {
//         this.bookings = bookings;
//         this.applyFilters();
//         this.loading = false;
//         this.currentView = 'bookings';
//       },
//       error: () => {
//         this.error = 'Failed to load bookings';
//         this.loading = false;
//       }
//     });
//   }

//   loadBookingsByFlight(flightId: number): void {
//     this.loading = true;
//     this.reportsService.getBookingsByFlight(flightId).subscribe({
//       next: (bookings) => {
//         this.bookings = bookings;
//         this.applyFilters();
//         this.loading = false;
//         this.currentView = 'bookings';
//       },
//       error: () => {
//         this.error = 'Failed to load bookings';
//         this.loading = false;
//       }
//     });
//   }

//   loadBookingsByCarrier(carrierId: number): void {
//     this.loading = true;
//     this.reportsService.getBookingsByCarrier(carrierId).subscribe({
//       next: (bookings) => {
//         this.bookings = bookings;
//         this.applyFilters();
//         this.loading = false;
//         this.currentView = 'bookings';
//       },
//       error: () => {
//         this.error = 'Failed to load bookings';
//         this.loading = false;
//       }
//     });
//   }

//   loadReportSummary(): void {
//     const carrierId = this.filters.selectedCarrier?.carrierID;
//     const flightId = this.filters.selectedFlight?.flightId;
    
//     this.reportsService.getReportSummary(carrierId, flightId).subscribe({
//       next: (summary) => {
//         this.reportSummary = summary;
//       },
//       error: () => {
//         console.error('Failed to load report summary');
//       }
//     });
//   }

//   applyFilters(): void {
//     let filtered = [...this.bookings];
    
//     // Status filter
//     if (this.filters.statusFilter !== 'all') {
//       filtered = filtered.filter(b => b.bookingStatus.toLowerCase() === this.filters.statusFilter);
//     }
    
//     // Date range filter
//     if (this.filters.dateFrom) {
//       filtered = filtered.filter(b => {
//         const bookingDate = new Date(b.bookingDate || '');
//         return bookingDate >= new Date(this.filters.dateFrom);
//       });
//     }
    
//     if (this.filters.dateTo) {
//       filtered = filtered.filter(b => {
//         const bookingDate = new Date(b.bookingDate || '');
//         return bookingDate <= new Date(this.filters.dateTo);
//       });
//     }
    
//     this.filteredBookings = filtered;
//   }

//   onFilterChange(): void {
//     this.applyFilters();
//   }

//   resetFilters(): void {
//     this.filters = {
//       selectedCarrier: null,
//       selectedFlight: null,
//       selectedSchedule: null,
//       statusFilter: 'all',
//       dateFrom: '',
//       dateTo: ''
//     };
//     this.loadCarriers();
//   }

//   getPassengerList(jsonStr: string): any[] {
//     try {
//       return JSON.parse(jsonStr);
//     } catch {
//       return [];
//     }
//   }

//   getStatusBadgeClass(status: string): string {
//     switch (status?.toLowerCase()) {
//       case 'booked': return 'status-booked';
//       case 'cancelled': return 'status-cancelled';
//       case 'completed': return 'status-completed';
//       default: return 'status-default';
//     }
//   }

//   exportToCSV(): void {
//     const carrierId = this.filters.selectedCarrier?.carrierID;
//     const flightId = this.filters.selectedFlight?.flightId;
    
//     this.reportsService.exportBookingsToCSV(carrierId, flightId).subscribe({
//       next: (blob) => {
//         const url = window.URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = `bookings-report-${new Date().toISOString().split('T')[0]}.csv`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         window.URL.revokeObjectURL(url);
//         this.message = '✅ Report exported successfully!';
//       },
//       error: () => {
//         this.error = '❌ Failed to export report';
//       }
//     });
//   }

//   navigateBack(): void {
//     if (this.currentView === 'bookings') {
//       if (this.filters.selectedSchedule) {
//         this.filters.selectedSchedule = null;
//         this.currentView = 'schedules';
//       } else if (this.filters.selectedFlight) {
//         this.filters.selectedFlight = null;
//         this.currentView = 'flights';
//       } else {
//         this.currentView = 'carriers';
//       }
//     } else if (this.currentView === 'schedules') {
//       this.filters.selectedFlight = null;
//       this.currentView = 'flights';
//     } else if (this.currentView === 'flights') {
//       this.filters.selectedCarrier = null;
//       this.currentView = 'carriers';
//     }
//   }

//   getTotalPassengers(): number {
//     return this.filteredBookings.reduce((sum, booking) => sum + booking.numberOfTickets, 0);
//   }

//   getTotalRevenue(): number {
//     return this.filteredBookings
//       .filter(b => b.bookingStatus.toLowerCase() === 'booked')
//       .reduce((sum, booking) => sum + booking.totalAmount, 0);
//   }

//   getTotalRefunds(): number {
//     return this.filteredBookings
//       .filter(b => b.bookingStatus.toLowerCase() === 'cancelled')
//       .reduce((sum, booking) => sum + (booking.refundAmount || 0), 0);
//   }
// }


// reports.component.ts
// import { Component, OnInit } from '@angular/core';
// import { ReportsService, BookingReport, ReportSummary } from '../services/reports.service';
// import { CarrierService, Carrier } from '../services/carrier.service';
// import { FlightService, Flight } from '../services/flight.service';
// import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';

// interface FilterState {
//   selectedCarrier: Carrier | null;
//   selectedFlight: Flight | null;
//   selectedSchedule: FlightSchedule | null;
//   statusFilter: string;
//   dateFrom: string;
//   dateTo: string;
// }

// @Component({
//   selector: 'app-reports',
//   templateUrl: './reports.component.html',
//   styleUrls: ['./reports.component.css']
// })
// export class ReportsComponent implements OnInit {
//   // Data
//   carriers: Carrier[] = [];
//   flights: Flight[] = [];
//   schedules: FlightSchedule[] = [];
//   bookings: BookingReport[] = [];
//   filteredBookings: BookingReport[] = [];
  
//   // UI State
//   loading = false;
//   error = '';
//   message = '';
  
//   // Filter State
//   filters: FilterState = {
//     selectedCarrier: null,
//     selectedFlight: null,
//     selectedSchedule: null,
//     statusFilter: 'all',
//     dateFrom: '',
//     dateTo: ''
//   };
  
//   // Report Summary
//   reportSummary: ReportSummary | null = null;
  
//   // View State - Fix the type to match HTML template
//   currentView: 'carriers' | 'flights' | 'schedules' | 'bookings' = 'carriers';
//   showPassengerDetails = false;

//   constructor(
//     private reportsService: ReportsService,
//     private carrierService: CarrierService,
//     private flightService: FlightService,
//     private scheduleService: FlightScheduleService
//   ) {}

//   ngOnInit(): void {
//     this.loadCarriers();
//   }

//   loadCarriers(): void {
//     this.loading = true;
//     this.carrierService.getAllCarriers().subscribe({
//       next: (carriers) => {
//         this.carriers = carriers;
//         this.loading = false;
//         this.currentView = 'carriers';
//       },
//       error: () => {
//         this.error = 'Failed to load carriers';
//         this.loading = false;
//       }
//     });
//   }

//   selectCarrier(carrier: Carrier): void {
//     this.filters.selectedCarrier = carrier;
//     this.filters.selectedFlight = null;
//     this.filters.selectedSchedule = null;
//     this.loadFlightsByCarrier(carrier.carrierID);
//   }

//   loadFlightsByCarrier(carrierId: number): void {
//     this.loading = true;
//     this.flightService.getFlightsByCarrier(carrierId).subscribe({
//       next: (flights) => {
//         this.flights = flights;
//         this.loading = false;
//         this.currentView = 'flights';
//         this.loadReportSummary();
//       },
//       error: () => {
//         this.error = 'Failed to load flights';
//         this.loading = false;
//       }
//     });
//   }

//   selectFlight(flight: Flight): void {
//     this.filters.selectedFlight = flight;
//     this.filters.selectedSchedule = null;
//     this.loadSchedulesByFlight(flight.flightId);
//   }

//   loadSchedulesByFlight(flightId: number): void {
//     this.loading = true;
//     this.scheduleService.getSchedulesByFlightId(flightId).subscribe({
//       next: (schedules) => {
//         this.schedules = schedules;
//         this.loading = false;
//         this.currentView = 'schedules';
//         this.loadReportSummary();
//       },
//       error: () => {
//         this.error = 'Failed to load schedules';
//         this.loading = false;
//       }
//     });
//   }

//   selectSchedule(schedule: FlightSchedule): void {
//     this.filters.selectedSchedule = schedule;
//     this.loadBookingsBySchedule(schedule.flightScheduleId);
//   }

//   loadBookingsBySchedule(scheduleId: number): void {
//     this.loading = true;
//     this.reportsService.getBookingsBySchedule(scheduleId).subscribe({
//       next: (bookings) => {
//         this.bookings = bookings;
//         this.applyFilters();
//         this.loading = false;
//         this.currentView = 'bookings';
//       },
//       error: () => {
//         this.error = 'Failed to load bookings';
//         this.loading = false;
//       }
//     });
//   }

//   loadBookingsByFlight(flightId: number): void {
//     this.loading = true;
//     this.reportsService.getBookingsByFlight(flightId).subscribe({
//       next: (bookings) => {
//         this.bookings = bookings;
//         this.applyFilters();
//         this.loading = false;
//         this.currentView = 'bookings';
//       },
//       error: () => {
//         this.error = 'Failed to load bookings';
//         this.loading = false;
//       }
//     });
//   }

//   loadBookingsByCarrier(carrierId: number): void {
//     this.loading = true;
//     this.reportsService.getBookingsByCarrier(carrierId).subscribe({
//       next: (bookings) => {
//         this.bookings = bookings;
//         this.applyFilters();
//         this.loading = false;
//         this.currentView = 'bookings';
//       },
//       error: () => {
//         this.error = 'Failed to load bookings';
//         this.loading = false;
//       }
//     });
//   }

//   loadReportSummary(): void {
//     const carrierId = this.filters.selectedCarrier?.carrierID;
//     const flightId = this.filters.selectedFlight?.flightId;
    
//     this.reportsService.getReportSummary(carrierId, flightId).subscribe({
//       next: (summary) => {
//         this.reportSummary = summary;
//       },
//       error: () => {
//         console.error('Failed to load report summary');
//       }
//     });
//   }

//   applyFilters(): void {
//     let filtered = [...this.bookings];
    
//     // Status filter
//     if (this.filters.statusFilter !== 'all') {
//       filtered = filtered.filter(b => b.bookingStatus.toLowerCase() === this.filters.statusFilter);
//     }
    
//     // Date range filter
//     if (this.filters.dateFrom) {
//       filtered = filtered.filter(b => {
//         const bookingDate = new Date(b.bookingDate || '');
//         return bookingDate >= new Date(this.filters.dateFrom);
//       });
//     }
    
//     if (this.filters.dateTo) {
//       filtered = filtered.filter(b => {
//         const bookingDate = new Date(b.bookingDate || '');
//         return bookingDate <= new Date(this.filters.dateTo);
//       });
//     }
    
//     this.filteredBookings = filtered;
//   }

//   onFilterChange(): void {
//     this.applyFilters();
//   }

//   resetFilters(): void {
//     this.filters = {
//       selectedCarrier: null,
//       selectedFlight: null,
//       selectedSchedule: null,
//       statusFilter: 'all',
//       dateFrom: '',
//       dateTo: ''
//     };
//     this.loadCarriers();
//   }

//   getPassengerList(jsonStr: string): any[] {
//     try {
//       return JSON.parse(jsonStr);
//     } catch {
//       return [];
//     }
//   }

//   getStatusBadgeClass(status: string): string {
//     switch (status?.toLowerCase()) {
//       case 'booked': return 'status-booked';
//       case 'cancelled': return 'status-cancelled';
//       case 'completed': return 'status-completed';
//       default: return 'status-default';
//     }
//   }

//   exportToCSV(): void {
//     const carrierId = this.filters.selectedCarrier?.carrierID;
//     const flightId = this.filters.selectedFlight?.flightId;
    
//     this.reportsService.exportBookingsToCSV(carrierId, flightId).subscribe({
//       next: (blob) => {
//         const url = window.URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = `bookings-report-${new Date().toISOString().split('T')[0]}.csv`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         window.URL.revokeObjectURL(url);
//         this.message = '✅ Report exported successfully!';
//       },
//       error: () => {
//         this.error = '❌ Failed to export report';
//       }
//     });
//   }

//   navigateBack(): void {
//     if (this.currentView === 'bookings') {
//       if (this.filters.selectedSchedule) {
//         this.filters.selectedSchedule = null;
//         this.currentView = 'schedules';
//       } else if (this.filters.selectedFlight) {
//         this.filters.selectedFlight = null;
//         this.currentView = 'flights';
//       } else {
//         this.currentView = 'carriers';
//       }
//     } else if (this.currentView === 'schedules') {
//       this.filters.selectedFlight = null;
//       this.currentView = 'flights';
//     } else if (this.currentView === 'flights') {
//       this.filters.selectedCarrier = null;
//       this.currentView = 'carriers';
//     }
//   }

//   getTotalPassengers(): number {
//     return this.filteredBookings.reduce((sum, booking) => sum + booking.numberOfTickets, 0);
//   }

//   getTotalRevenue(): number {
//     return this.filteredBookings
//       .filter(b => b.bookingStatus.toLowerCase() === 'booked')
//       .reduce((sum, booking) => sum + booking.totalAmount, 0);
//   }

//   getTotalRefunds(): number {
//     return this.filteredBookings
//       .filter(b => b.bookingStatus.toLowerCase() === 'cancelled')
//       .reduce((sum, booking) => sum + (booking.refundAmount || 0), 0);
//   }

//   // Add these helper methods for Flight calculations
//   getTotalSeats(flight: Flight): number {
//     return (flight.seatCapacityEconomyClass || 0) + 
//            (flight.seatCapacityBusinessClass || 0) + 
//            (flight.seatCapacityExecutiveClass || 0);
//   }

//   getAircraftInfo(flight: Flight): string {
//     const totalSeats = this.getTotalSeats(flight);
//     if (totalSeats > 300) return 'Wide-body Aircraft';
//     if (totalSeats > 150) return 'Narrow-body Aircraft';
//     return 'Regional Aircraft';
//   }

//   getCapacityInfo(flight: Flight): string {
//     const economy = flight.seatCapacityEconomyClass || 0;
//     const business = flight.seatCapacityBusinessClass || 0;
//     const executive = flight.seatCapacityExecutiveClass || 0;
    
//     return `E:${economy} | B:${business} | Ex:${executive}`;
//   }

//   // Helper methods for counting
//   getActiveBookingsCount(): number {
//     return this.bookings.filter(b => b.bookingStatus?.toLowerCase() === 'booked').length;
//   }

//   getCancelledBookingsCount(): number {
//     return this.bookings.filter(b => b.bookingStatus?.toLowerCase() === 'cancelled').length;
//   }
// }



// reports.component.ts - Updated with validation messages
import { Component, OnInit } from '@angular/core';
import { ReportsService, BookingReport } from '../services/reports.service';
import { CarrierService, Carrier } from '../services/carrier.service';
import { FlightService, Flight } from '../services/flight.service';
import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';

interface FilterState {
  selectedCarrier: Carrier | null;
  selectedFlight: Flight | null;
  selectedSchedule: FlightSchedule | null;
  statusFilter: string;
  dateFrom: string;
  dateTo: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  // Data
  carriers: Carrier[] = [];
  flights: Flight[] = [];
  schedules: FlightSchedule[] = [];
  bookings: BookingReport[] = [];
  filteredBookings: BookingReport[] = [];
  
  // UI State
  loading = false;
  error = '';
  message = '';
  
  // Filter State
  filters: FilterState = {
    selectedCarrier: null,
    selectedFlight: null,
    selectedSchedule: null,
    statusFilter: 'all',
    dateFrom: '',
    dateTo: ''
  };
  
  // View State
  currentView: 'carriers' | 'flights' | 'schedules' | 'bookings' = 'carriers';
  showPassengerDetails = false;

  constructor(
    private reportsService: ReportsService,
    private carrierService: CarrierService,
    private flightService: FlightService,
    private scheduleService: FlightScheduleService
  ) {}

  ngOnInit(): void {
    this.loadCarriers();
  }

  loadCarriers(): void {
    this.loading = true;
    this.error = '';
    this.carrierService.getAllCarriers().subscribe({
      next: (carriers) => {
        if (carriers && carriers.length > 0) {
          this.carriers = carriers;
          this.currentView = 'carriers';
        } else {
          this.error = '❌ No carriers found in the system';
          this.carriers = [];
        }
        this.loading = false;
      },
      error: () => {
        this.error = '❌ Failed to load carriers. Please check your connection.';
        this.loading = false;
      }
    });
  }

  selectCarrier(carrier: Carrier): void {
    this.filters.selectedCarrier = carrier;
    this.filters.selectedFlight = null;
    this.filters.selectedSchedule = null;
    this.loadFlightsByCarrier(carrier.carrierID);
  }

  loadFlightsByCarrier(carrierId: number): void {
    this.loading = true;
    this.error = '';
    this.flightService.getFlightsByCarrier(carrierId).subscribe({
      next: (flights) => {
        if (flights && flights.length > 0) {
          this.flights = flights;
          this.currentView = 'flights';
        } else {
          this.error = `❌ No flights found for ${this.filters.selectedCarrier?.carrierName}`;
          this.flights = [];
          this.currentView = 'flights'; // Still show flights view but with error
        }
        this.loading = false;
      },
      error: () => {
        this.error = `❌ Failed to load flights for ${this.filters.selectedCarrier?.carrierName}`;
        this.flights = [];
        this.currentView = 'flights';
        this.loading = false;
      }
    });
  }

  selectFlight(flight: Flight): void {
    this.filters.selectedFlight = flight;
    this.filters.selectedSchedule = null;
    this.loadSchedulesByFlight(flight.flightId);
  }

  loadSchedulesByFlight(flightId: number): void {
    this.loading = true;
    this.error = '';
    this.scheduleService.getSchedulesByFlightId(flightId).subscribe({
      next: (schedules) => {
        if (schedules && schedules.length > 0) {
          this.schedules = schedules;
          this.currentView = 'schedules';
        } else {
          this.error = ` No flight schedules found for Flight #${this.filters.selectedFlight?.flightId}`;
          this.schedules = [];
          this.currentView = 'schedules';
        }
        this.loading = false;
      },
      error: () => {
        this.error = ` Failed to load schedules for Flight #${this.filters.selectedFlight?.flightId}`;
        this.schedules = [];
        this.currentView = 'schedules';
        this.loading = false;
      }
    });
  }

  // selectSchedule(schedule: FlightSchedule): void {
  //   this.filters.selectedSchedule = schedule;
  //   this.loadBookingsBySchedule(schedule.flightScheduleId);
  // }


  selectSchedule(schedule: FlightSchedule): void {
  if (!schedule || !schedule.flightScheduleId) {
    this.error = 'Invalid flight schedule selected';
    return;
  }
  
  // Verify the schedule belongs to the selected flight
  if (this.filters.selectedFlight && 
      schedule.flightId !== this.filters.selectedFlight.flightId) {
    this.error = 'Schedule does not belong to selected flight';
    return;
  }
  
  this.filters.selectedSchedule = schedule;
  this.loadBookingsBySchedule(schedule.flightScheduleId);
}

  // loadBookingsBySchedule(scheduleId: number): void {
  //   this.loading = true;
  //   this.error = '';
  //   console.log('Loading bookings for schedule:', scheduleId);
    
  //   this.reportsService.getBookingsBySchedule(scheduleId).subscribe({
  //     next: (bookings) => {
  //       console.log('Received bookings:', bookings);
  //       if (bookings && bookings.length > 0) {
  //         this.bookings = bookings;
  //         this.applyFilters();
  //         this.message = ` Found ${bookings.length} booking(s) for this flight schedule`;
  //       } else {
  //         this.error = `❌ No passengers have booked tickets for Flight Schedule #${scheduleId}`;
  //         this.bookings = [];
  //         this.filteredBookings = [];
  //       }
  //       this.currentView = 'bookings';
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       console.error('Error loading bookings:', err);
  //       this.error = `❌ Failed to load booking details for Flight Schedule #${scheduleId}`;
  //       this.bookings = [];
  //       this.filteredBookings = [];
  //       this.currentView = 'bookings';
  //       this.loading = false;
  //     }
  //   });
  // }

  loadBookingsBySchedule(scheduleId: number): void {
  this.loading = true;
  this.error = '';
  this.message = '';
  console.log('Attempting to load bookings for schedule ID:', scheduleId);
  
  this.reportsService.getBookingsBySchedule(scheduleId).subscribe({
    next: (bookings) => {
      console.log('API Response - Bookings:', bookings);
      if (bookings && Array.isArray(bookings) && bookings.length > 0) {
        this.bookings = bookings.map(booking => ({
          ...booking,
          // Ensure all required fields are present
          bookingId: booking.bookingId || 0,
          flightScheduleId: booking.flightScheduleId || scheduleId,
          userId: booking.userId || 0,
          seatCategory: booking.seatCategory || 'unknown',
          numberOfTickets: booking.numberOfTickets || 0,
          totalAmount: booking.totalAmount || 0,
          passengerDetailsJson: booking.passengerDetailsJson || '[]',
          bookingStatus: booking.bookingStatus || 'unknown',
          bookingDate: booking.bookingDate || new Date().toISOString()
        }));
        
        this.applyFilters();
        this.message = `Found ${this.bookings.length} booking(s)`;
        this.currentView = 'bookings';
      } else {
        this.bookings = [];
        this.filteredBookings = [];
        this.error = ` No bookings found for Schedule #${scheduleId}`;
        this.currentView = 'bookings';
      }
      this.loading = false;
    },
    error: (err) => {
      console.error('Error loading bookings:', err);
      this.error = ` Failed to load bookings: ${err.message || 'Unknown error'}`;
      this.bookings = [];
      this.filteredBookings = [];
      this.currentView = 'bookings';
      this.loading = false;
    }
  });
}

  getEffectiveStatus(booking: any): string {
    if (booking.bookingStatus?.toLowerCase() === 'cancelled') {
      return 'cancelled';
    }
    const travelDateStr = booking.dateOfTravel || booking.departureDate || this.filters.selectedSchedule?.dateOfTravel || this.filters.selectedSchedule?.departureDate;
    if (travelDateStr) {
      const travelDate = new Date(travelDateStr);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      travelDate.setHours(0, 0, 0, 0);
      if (travelDate < today) {
        return 'completed';
      }
    }
    return 'booked';
  }

  applyFilters(): void {
    let filtered = [...this.bookings];
    
    if (this.filters.statusFilter !== 'all') {
      const target = this.filters.statusFilter.toLowerCase();
      filtered = filtered.filter(b => {
        const effective = this.getEffectiveStatus(b);
        if (target === 'active' || target === 'booked') {
          return effective === 'booked';
        }
        return effective === target;
      });
    }
    
    if (this.filters.dateFrom) {
      filtered = filtered.filter(b => {
        const dateStr = b.dateOfTravel || b.bookingDate || '';
        const bookingDate = new Date(dateStr);
        return bookingDate >= new Date(this.filters.dateFrom);
      });
    }
    
    if (this.filters.dateTo) {
      filtered = filtered.filter(b => {
        const dateStr = b.dateOfTravel || b.bookingDate || '';
        const bookingDate = new Date(dateStr);
        return bookingDate <= new Date(this.filters.dateTo);
      });
    }
    
    this.filteredBookings = filtered;
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  resetFilters(): void {
    this.filters = {
      selectedCarrier: null,
      selectedFlight: null,
      selectedSchedule: null,
      statusFilter: 'all',
      dateFrom: '',
      dateTo: ''
    };
    this.error = '';
    this.message = '';
    this.loadCarriers();
  }

  getPassengerList(jsonStr: string): any[] {
    try {
      return JSON.parse(jsonStr);
    } catch {
      return [];
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'booked': return 'status-booked';
      case 'cancelled': return 'status-cancelled';
      case 'completed': return 'status-completed';
      default: return 'status-default';
    }
  }

  navigateBack(): void {
    this.error = '';
    this.message = '';
    
    if (this.currentView === 'bookings') {
      if (this.filters.selectedSchedule) {
        this.filters.selectedSchedule = null;
        this.currentView = 'schedules';
      } else if (this.filters.selectedFlight) {
        this.filters.selectedFlight = null;
        this.currentView = 'flights';
      } else {
        this.currentView = 'carriers';
      }
    } else if (this.currentView === 'schedules') {
      this.filters.selectedFlight = null;
      this.currentView = 'flights';
    } else if (this.currentView === 'flights') {
      this.filters.selectedCarrier = null;
      this.currentView = 'carriers';
    }
  }

  // Helper methods
  getTotalSeats(flight: Flight): number {
    return (flight.seatCapacityEconomyClass || 0) + 
           (flight.seatCapacityBusinessClass || 0) + 
           (flight.seatCapacityExecutiveClass || 0);
  }

  getCapacityInfo(flight: Flight): string {
    const economy = flight.seatCapacityEconomyClass || 0;
    const business = flight.seatCapacityBusinessClass || 0;
    const executive = flight.seatCapacityExecutiveClass || 0;
    
    return `E:${economy} | B:${business} | Ex:${executive}`;
  }

  // ── Booking stats helpers ─────────────────────────────────────────────────

  getActiveBookingsCount(): number {
    return this.filteredBookings.filter(b => this.getEffectiveStatus(b) === 'booked').length;
  }

  getCompletedBookingsCount(): number {
    return this.filteredBookings.filter(b => this.getEffectiveStatus(b) === 'completed').length;
  }

  getCancelledBookingsCount(): number {
    return this.filteredBookings.filter(b => b.bookingStatus?.toLowerCase() === 'cancelled').length;
  }

  getTotalRevenue(): number {
    return this.filteredBookings
      .filter(b => b.bookingStatus?.toLowerCase() === 'booked')
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  }

  getTotalRefunds(): number {
    return this.filteredBookings
      .filter(b => b.bookingStatus?.toLowerCase() === 'cancelled')
      .reduce((sum, b) => sum + (b.refundAmount || 0), 0);
  }
}
