// import { Component, OnInit } from '@angular/core';
// import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
// import { FlightService, Flight } from '../services/flight.service';
// import { CarrierService, Carrier } from '../services/carrier.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-flight-booking-management',
//   templateUrl: './flight-booking-management.component.html',
//   styleUrls: ['./flight-booking-management.component.css']
// })
// export class FlightBookingManagementComponent implements OnInit {
//   schedules: FlightSchedule[] = [];
//   filteredSchedules: FlightSchedule[] = [];
//   flights: { [key: number]: Flight } = {};
//   carriers: { [key: number]: Carrier } = {};

//   originFilter = '';
//   destinationFilter = '';
//   travelDateFilter = '';
//   seatCategoryFilter = '';
//   message = '';

//   seatCategories = ['Economy', 'Business', 'Executive'];

//   constructor(
//     private scheduleService: FlightScheduleService,
//     private flightService: FlightService,
//     private carrierService: CarrierService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.loadSchedules();
//   }

//   loadSchedules(): void {
//     this.scheduleService.getAllSchedules().subscribe({
//       next: (data) => {
//         this.schedules = data;
//         this.filteredSchedules = data;
//         this.loadFlightDetails();
//       },
//       error: () => this.message = 'Failed to load schedules.'
//     });
//   }

//   loadFlightDetails(): void {
//     const flightIds = [...new Set(this.schedules.map(s => s.flightId))];
//     flightIds.forEach(flightId => {
//       this.flightService.getFlightById(flightId).subscribe({
//         next: (flight) => {
//           this.flights[flightId] = flight;
//           this.loadCarrierDetails(flight.carrierId);
//         },
//         error: () => console.error(`Failed to load flight details for ID: ${flightId}`)
//       });
//     });
//   }

//   loadCarrierDetails(carrierId: number): void {
//     if (!this.carriers[carrierId]) {
//       this.carrierService.getCarrierById(carrierId).subscribe({
//         next: (carrier) => {
//           this.carriers[carrierId] = carrier;
//         },
//         error: () => console.error(`Failed to load carrier details for ID: ${carrierId}`)
//       });
//     }
//   }

//   getCarrierName(flightId: number): string {
//     const flight = this.flights[flightId];
//     if (flight) {
//       const carrier = this.carriers[flight.carrierId];
//       return carrier ? carrier.carrierName : 'Loading...';
//     }
//     return 'Unknown';
//   }

//   getFlightOrigin(flightId: number): string {
//     return this.flights[flightId]?.origin || 'Loading...';
//   }

//   getFlightDestination(flightId: number): string {
//     return this.flights[flightId]?.destination || 'Loading...';
//   }

//   applyFilter(): void {
//     this.filteredSchedules = this.schedules.filter(schedule => {
//       const matchesOrigin = this.originFilter ? this.getFlightOrigin(schedule.flightId).toLowerCase().includes(this.originFilter.toLowerCase()) : true;
//       const matchesDestination = this.destinationFilter ? this.getFlightDestination(schedule.flightId).toLowerCase().includes(this.destinationFilter.toLowerCase()) : true;
//       const matchesDate = this.travelDateFilter ? schedule.dateOfTravel === this.travelDateFilter : true;
//       const matchesSeat = this.seatCategoryFilter ? true : true;

//       return matchesOrigin && matchesDestination && matchesDate && matchesSeat;
//     });
//   }

//   bookFlight(scheduleId: number): void {
//     this.router.navigate(['/user/book-flight', scheduleId]);
//   }

//   viewAll(): void {
//     this.filteredSchedules = this.schedules;
//   }

//   // Placeholder values (replace with actual logic from FlightService)

// }



// import { Component, OnInit } from '@angular/core';
// import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
// import { FlightService, Flight } from '../services/flight.service';
// import { CarrierService, Carrier } from '../services/carrier.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-flight-booking-management',
//   templateUrl: './flight-booking-management.component.html',
//   styleUrls: ['./flight-booking-management.component.css']
// })
// export class FlightBookingManagementComponent implements OnInit {
//   schedules: FlightSchedule[] = [];
//   filteredSchedules: FlightSchedule[] = [];
//   availableSchedules: FlightSchedule[] = [];
//   flights: { [key: number]: Flight } = {};
//   carriers: { [key: number]: Carrier } = {};

//   originFilter = '';
//   destinationFilter = '';
//   travelDateFilter = '';
//   seatCategoryFilter = '';
//   message = '';
//   loading = false;

//   seatCategories = ['economy', 'business', 'executive'];

//   constructor(
//     private scheduleService: FlightScheduleService,
//     private flightService: FlightService,
//     private carrierService: CarrierService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.loadSchedules();
//   }

//   loadSchedules(): void {
//     this.loading = true;
//     this.scheduleService.getAllSchedules().subscribe({
//       next: (data) => {
//         this.schedules = data;
//         this.filterAvailableSchedules();
//         this.loadFlightDetails();
//         this.loading = false;
//       },
//       error: () => {
//         this.message = 'Failed to load schedules.';
//         this.loading = false;
//       }
//     });
//   }

//   filterAvailableSchedules(): void {
//     const currentDateTime = new Date();
    
//     this.availableSchedules = this.schedules.filter(schedule => {
//       // Combine departure date and time
//       const departureDateTime = this.combineDateAndTime(
//         schedule.departureDate, 
//         schedule.departureTime
//       );
      
//       if (!departureDateTime) return false;
      
//       // Check if departure is more than 3 hours from now
//       const timeDifference = departureDateTime.getTime() - currentDateTime.getTime();
//       const threeHoursInMs = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
      
//       return timeDifference > threeHoursInMs;
//     });
    
//     this.filteredSchedules = this.availableSchedules;
//     console.log(`Filtered ${this.availableSchedules.length} available schedules from ${this.schedules.length} total schedules`);
//   }

//   combineDateAndTime(dateStr: string, timeStr: string): Date | null {
//     try {
//       if (!dateStr || !timeStr) return null;
      
//       // Combine date and time strings
//       const dateTimeStr = `${dateStr} ${timeStr}`;
//       const dateTime = new Date(dateTimeStr);
      
//       // Check if date is valid
//       return isNaN(dateTime.getTime()) ? null : dateTime;
//     } catch (error) {
//       console.error('Error parsing date/time:', error);
//       return null;
//     }
//   }

//   loadFlightDetails(): void {
//     const flightIds = [...new Set(this.availableSchedules.map(s => s.flightId))];
//     flightIds.forEach(flightId => {
//       this.flightService.getFlightById(flightId).subscribe({
//         next: (flight) => {
//           this.flights[flightId] = flight;
//           this.loadCarrierDetails(flight.carrierId);
//         },
//         error: () => console.error(`Failed to load flight details for ID: ${flightId}`)
//       });
//     });
//   }

//   loadCarrierDetails(carrierId: number): void {
//     if (!this.carriers[carrierId]) {
//       this.carrierService.getCarrierById(carrierId).subscribe({
//         next: (carrier) => {
//           this.carriers[carrierId] = carrier;
//         },
//         error: () => console.error(`Failed to load carrier details for ID: ${carrierId}`)
//       });
//     }
//   }

//   getCarrierName(flightId: number): string {
//     const flight = this.flights[flightId];
//     if (flight) {
//       const carrier = this.carriers[flight.carrierId];
//       return carrier ? carrier.carrierName : 'Loading...';
//     }
//     return 'Unknown';
//   }

//   getFlightOrigin(flightId: number): string {
//     return this.flights[flightId]?.origin || 'Loading...';
//   }

//   getFlightDestination(flightId: number): string {
//     return this.flights[flightId]?.destination || 'Loading...';
//   }

//   // Get available seats for each category
//   getAvailableSeats(schedule: FlightSchedule, category: string): number {
//     const flight = this.flights[schedule.flightId];
//     if (!flight) return 0;

//     switch (category.toLowerCase()) {
//       case 'economy':
//         return flight.seatCapacityEconomyClass - (schedule.economyClassBookedCount || 0);
//       case 'business':
//         return flight.seatCapacityBusinessClass - (schedule.businessClassBookedCount || 0);
//       case 'executive':
//         return flight.seatCapacityExecutiveClass - (schedule.executiveClassBookedCount || 0);
//       default:
//         return 0;
//     }
//   }

//   // Get fare for specific category
//   getFare(schedule: FlightSchedule, category: string): number {
//     switch (category.toLowerCase()) {
//       case 'economy':
//         return schedule.economyClassFare || 0;
//       case 'business':
//         return schedule.businessClassFare || 0;
//       case 'executive':
//         return schedule.executiveClassFare || 0;
//       default:
//         return 0;
//     }
//   }

//   // Check if category has available seats
//   hasAvailableSeats(schedule: FlightSchedule, category: string): boolean {
//     return this.getAvailableSeats(schedule, category) > 0;
//   }

//   // Get time until departure
//   getTimeUntilDeparture(schedule: FlightSchedule): string {
//     const departureDateTime = this.combineDateAndTime(
//       schedule.departureDate, 
//       schedule.departureTime
//     );
    
//     if (!departureDateTime) return 'Unknown';
    
//     const now = new Date();
//     const timeDiff = departureDateTime.getTime() - now.getTime();
    
//     if (timeDiff <= 0) return 'Departed';
    
//     const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
//     if (days > 0) {
//       return `${days}d ${hours}h`;
//     } else if (hours > 0) {
//       return `${hours}h ${minutes}m`;
//     } else {
//       return `${minutes}m`;
//     }
//   }

//   applyFilter(): void {
//     this.filteredSchedules = this.availableSchedules.filter(schedule => {
//       const matchesOrigin = this.originFilter ? 
//         this.getFlightOrigin(schedule.flightId).toLowerCase().includes(this.originFilter.toLowerCase()) : true;
      
//       const matchesDestination = this.destinationFilter ? 
//         this.getFlightDestination(schedule.flightId).toLowerCase().includes(this.destinationFilter.toLowerCase()) : true;
      
//       const matchesDate = this.travelDateFilter ? 
//         schedule.dateOfTravel === this.travelDateFilter : true;
      
//       const matchesSeat = this.seatCategoryFilter ? 
//         this.hasAvailableSeats(schedule, this.seatCategoryFilter) : true;

//       return matchesOrigin && matchesDestination && matchesDate && matchesSeat;
//     });

//     if (this.filteredSchedules.length === 0) {
//       this.message = 'No flights match your search criteria.';
//     } else {
//       this.message = `Found ${this.filteredSchedules.length} available flights.`;
//     }
//   }

//   bookFlight(scheduleId: number): void {
//     this.router.navigate(['/user/book-flight', scheduleId]);
//   }

//   viewAll(): void {
//     this.filteredSchedules = this.availableSchedules;
//     this.message = `Showing ${this.filteredSchedules.length} available flights.`;
//   }

//   clearFilters(): void {
//     this.originFilter = '';
//     this.destinationFilter = '';
//     this.travelDateFilter = '';
//     this.seatCategoryFilter = '';
//     this.viewAll();
//   }

//   // Check if schedule is bookable (more than 3 hours until departure)
//   isBookable(schedule: FlightSchedule): boolean {
//     const departureDateTime = this.combineDateAndTime(
//       schedule.departureDate, 
//       schedule.departureTime
//     );
    
//     if (!departureDateTime) return false;
    
//     const currentDateTime = new Date();
//     const timeDifference = departureDateTime.getTime() - currentDateTime.getTime();
//     const threeHoursInMs = 3 * 60 * 60 * 1000;
    
//     return timeDifference > threeHoursInMs;
//   }
//   // Add this method to your component
// getCurrentDate(): string {
//   const today = new Date();
//   return today.toISOString().split('T')[0];
// }


//   // Get booking status message
//   getBookingStatus(schedule: FlightSchedule): string {
//     if (!this.isBookable(schedule)) {
//       return 'Booking closed (less than 3 hours to departure)';
//     }
    
//     const hasAnySeats = this.seatCategories.some(category => 
//       this.hasAvailableSeats(schedule, category)
//     );
    
//     return hasAnySeats ? 'Available for booking' : 'Fully booked';
//   }
// }



import { Component, OnInit } from '@angular/core';
import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
import { FlightService, Flight } from '../services/flight.service';
import { CarrierService, Carrier } from '../services/carrier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-booking-management',
  templateUrl: './flight-booking-management.component.html',
  styleUrls: ['./flight-booking-management.component.css']
})
export class FlightBookingManagementComponent implements OnInit {
  schedules: FlightSchedule[] = [];
  filteredSchedules: FlightSchedule[] = [];
  availableSchedules: FlightSchedule[] = [];
  flights: { [key: number]: Flight } = {};
  carriers: { [key: number]: Carrier } = {};

  originFilter = '';
  destinationFilter = '';
  travelDateFilter = '';
  seatCategoryFilter = '';
  message = '';
  loading = false;

  seatCategories = ['economy', 'business', 'executive'];

  constructor(
    private scheduleService: FlightScheduleService,
    private flightService: FlightService,
    private carrierService: CarrierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSchedules();
  }

  // Add the missing method
  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  loadSchedules(): void {
    this.loading = true;
    this.scheduleService.getAllSchedules().subscribe({
      next: (data) => {
        this.schedules = data;
        this.filterAvailableSchedules();
        this.loadFlightDetails();
        this.loading = false;
      },
      error: () => {
        this.message = 'Failed to load schedules.';
        this.loading = false;
      }
    });
  }

  filterAvailableSchedules(): void {
    const currentDateTime = new Date();
    
    this.availableSchedules = this.schedules.filter(schedule => {
      const departureDateTime = this.combineDateAndTime(
        schedule.departureDate, 
        schedule.departureTime
      );
      
      if (!departureDateTime) return false;
      
      const timeDifference = departureDateTime.getTime() - currentDateTime.getTime();
      const threeHoursInMs = 3 * 60 * 60 * 1000;
      
      return timeDifference > threeHoursInMs;
    });
    
    this.filteredSchedules = this.availableSchedules;
    console.log(`Filtered ${this.availableSchedules.length} available schedules from ${this.schedules.length} total schedules`);
  }

  combineDateAndTime(dateStr: string, timeStr: string): Date | null {
    try {
      if (!dateStr || !timeStr) return null;
      
      const dateTimeStr = `${dateStr} ${timeStr}`;
      const dateTime = new Date(dateTimeStr);
      
      return isNaN(dateTime.getTime()) ? null : dateTime;
    } catch (error) {
      console.error('Error parsing date/time:', error);
      return null;
    }
  }

  loadFlightDetails(): void {
    const flightIds = [...new Set(this.availableSchedules.map(s => s.flightId))];
    flightIds.forEach(flightId => {
      this.flightService.getFlightById(flightId).subscribe({
        next: (flight) => {
          this.flights[flightId] = flight;
          this.loadCarrierDetails(flight.carrierId);
        },
        error: () => console.error(`Failed to load flight details for ID: ${flightId}`)
      });
    });
  }

  loadCarrierDetails(carrierId: number): void {
    if (!this.carriers[carrierId]) {
      this.carrierService.getCarrierById(carrierId).subscribe({
        next: (carrier) => {
          this.carriers[carrierId] = carrier;
        },
        error: () => console.error(`Failed to load carrier details for ID: ${carrierId}`)
      });
    }
  }

  getCarrierName(flightId: number): string {
    const flight = this.flights[flightId];
    if (flight) {
      const carrier = this.carriers[flight.carrierId];
      return carrier ? carrier.carrierName : 'Loading...';
    }
    return 'Unknown';
  }

  getFlightOrigin(flightId: number): string {
    return this.flights[flightId]?.origin || 'Loading...';
  }

  getFlightDestination(flightId: number): string {
    return this.flights[flightId]?.destination || 'Loading...';
  }

  getAvailableSeats(schedule: FlightSchedule, category: string): number {
    const flight = this.flights[schedule.flightId];
    if (!flight) return 0;

    switch (category.toLowerCase()) {
      case 'economy':
        return flight.seatCapacityEconomyClass - (schedule.economyClassBookedCount || 0);
      case 'business':
        return flight.seatCapacityBusinessClass - (schedule.businessClassBookedCount || 0);
      case 'executive':
        return flight.seatCapacityExecutiveClass - (schedule.executiveClassBookedCount || 0);
      default:
        return 0;
    }
  }

  getFare(schedule: FlightSchedule, category: string): number {
    switch (category.toLowerCase()) {
      case 'economy':
        return schedule.economyClassFare || 0;
      case 'business':
        return schedule.businessClassFare || 0;
      case 'executive':
        return schedule.executiveClassFare || 0;
      default:
        return 0;
    }
  }

  hasAvailableSeats(schedule: FlightSchedule, category: string): boolean {
    return this.getAvailableSeats(schedule, category) > 0;
  }

  getTimeUntilDeparture(schedule: FlightSchedule): string {
    const departureDateTime = this.combineDateAndTime(
      schedule.departureDate, 
      schedule.departureTime
    );
    
    if (!departureDateTime) return 'Unknown';
    
    const now = new Date();
    const timeDiff = departureDateTime.getTime() - now.getTime();
    
    if (timeDiff <= 0) return 'Departed';
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  }

  applyFilter(): void {
    this.filteredSchedules = this.availableSchedules.filter(schedule => {
      const matchesOrigin = this.originFilter ? 
        this.getFlightOrigin(schedule.flightId).toLowerCase().includes(this.originFilter.toLowerCase()) : true;
      
      const matchesDestination = this.destinationFilter ? 
        this.getFlightDestination(schedule.flightId).toLowerCase().includes(this.destinationFilter.toLowerCase()) : true;
      
      const matchesDate = this.travelDateFilter ? 
        schedule.dateOfTravel === this.travelDateFilter : true;
      
      const matchesSeat = this.seatCategoryFilter ? 
        this.hasAvailableSeats(schedule, this.seatCategoryFilter) : true;

      return matchesOrigin && matchesDestination && matchesDate && matchesSeat;
    });

    if (this.filteredSchedules.length === 0) {
      this.message = 'No flights match your search criteria.';
    } else {
      this.message = `Found ${this.filteredSchedules.length} available flights.`;
    }
  }

  bookFlight(scheduleId: number): void {
    this.router.navigate(['/user/book-flight', scheduleId]);
  }

  viewAll(): void {
    this.filteredSchedules = this.availableSchedules;
    this.message = `Showing ${this.filteredSchedules.length} available flights.`;
  }

  clearFilters(): void {
    this.originFilter = '';
    this.destinationFilter = '';
    this.travelDateFilter = '';
    this.seatCategoryFilter = '';
    this.viewAll();
  }

  isBookable(schedule: FlightSchedule): boolean {
    const departureDateTime = this.combineDateAndTime(
      schedule.departureDate, 
      schedule.departureTime
    );
    
    if (!departureDateTime) return false;
    
    const currentDateTime = new Date();
    const timeDifference = departureDateTime.getTime() - currentDateTime.getTime();
    const threeHoursInMs = 3 * 60 * 60 * 1000;
    
    return timeDifference > threeHoursInMs;
  }

  getBookingStatus(schedule: FlightSchedule): string {
    if (!this.isBookable(schedule)) {
      return 'Booking closed (less than 3 hours to departure)';
    }
    
    const hasAnySeats = this.seatCategories.some(category => 
      this.hasAvailableSeats(schedule, category)
    );
    
    return hasAnySeats ? 'Available for booking' : 'Fully booked';
  }

  // Helper methods for template
  hasAnySeatAvailable(schedule: FlightSchedule): boolean {
    return this.seatCategories.some(category => this.hasAvailableSeats(schedule, category));
  }

  isScheduleBookable(schedule: FlightSchedule): boolean {
    return this.isBookable(schedule) && this.hasAnySeatAvailable(schedule);
  }
}

