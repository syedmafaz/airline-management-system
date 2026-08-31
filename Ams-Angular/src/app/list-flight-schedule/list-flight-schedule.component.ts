// import { Component, OnInit } from '@angular/core';
// import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
// import { FlightService, Flight } from '../services/flight.service';
// import { CarrierService, Carrier } from '../services/carrier.service';

// @Component({
//   selector: 'app-list-flight-schedule',
//   templateUrl: './list-flight-schedule.component.html',
//   styleUrls: ['./list-flight-schedule.component.css']
// })
// export class ListFlightScheduleComponent implements OnInit {
//   schedules: FlightSchedule[] = [];
//   flights: Flight[] = [];
//   carriers: Carrier[] = [];
//   message = '';

//   constructor(
//     private scheduleService: FlightScheduleService,
//     private flightService: FlightService,
//     private carrierService: CarrierService
//   ) {}

//   ngOnInit(): void {
//     this.loadCarriers();
//     this.loadFlights();
//     this.loadSchedules();
//   }

//   loadCarriers(): void {
//     this.carrierService.getAllCarriers().subscribe({
//       next: (data) => (this.carriers = data),
//       error: () => (this.message = 'Error loading carriers')
//     });
//   }

//   loadFlights(): void {
//     this.flightService.getAllFlights().subscribe({
//       next: (data) => {
//         this.flights = data;
//         console.log('Loaded flights:', this.flights);
//       },
//       error: () => (this.message = 'Error loading flights')
//     });
//   }

//   loadSchedules(): void {
//     this.scheduleService.getAllSchedules().subscribe({
//       next: (data) => {
//         this.schedules = data;
//         console.log('Loaded schedules:', this.schedules);
//         if (data.length === 0) {
//           this.message = 'No flight schedules available.';
//         }
//       },
//       error: () => (this.message = 'Error loading flight schedules')
//     });
//   }

//   getFlightName(flightId: number): string {
//     const flight = this.flights.find(f => f.flightId === flightId);
//     if (flight) {
//       return `#${flight.flightId} - ${flight.origin} to ${flight.destination}`;
//     }
//     return 'Unknown Flight';
//   }
  
//   getCarrierName(flightId: number): string {
//     const flight = this.flights.find(f => f.flightId === flightId);
//     if (!flight) return 'Unknown Carrier';
    
//     const carrier = this.carriers.find(c => c.carrierID === flight.carrierId);
//     return carrier ? carrier.carrierName : 'Unknown Carrier';
//   }

//   deleteSchedule(scheduleId: number): void {
//     if (confirm(`Are you sure you want to delete schedule ID ${scheduleId}?`)) {
//       this.scheduleService.deleteSchedule(scheduleId).subscribe({
//         next: () => {
//           this.message = `Schedule ${scheduleId} deleted successfully.`;
//           this.loadSchedules(); // Refresh list
//         },
//         error: () => {
//           this.message = 'Failed to delete schedule.';
//         }
//       });
//     }
//   }
// }



import { Component, OnInit } from '@angular/core';
import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
import { FlightService, Flight } from '../services/flight.service';
import { CarrierService, Carrier } from '../services/carrier.service';

@Component({
  selector: 'app-list-flight-schedule',
  templateUrl: './list-flight-schedule.component.html',
  styleUrls: ['./list-flight-schedule.component.css']
})
export class ListFlightScheduleComponent implements OnInit {
  schedules: FlightSchedule[] = [];
  flights: Flight[] = [];
  carriers: Carrier[] = [];
  message = '';

  constructor(
    private scheduleService: FlightScheduleService,
    private flightService: FlightService,
    private carrierService: CarrierService
  ) {}

  ngOnInit(): void {
    this.loadCarriers();
    this.loadFlights();
    this.loadSchedules();
  }

  loadCarriers(): void {
    this.carrierService.getAllCarriers().subscribe({
      next: (data) => this.carriers = data,
      error: () => this.message = '❌ Error loading carriers.'
    });
  }

  loadFlights(): void {
    this.flightService.getAllFlights().subscribe({
      next: (data) => {
        this.flights = data;
        console.log('✅ Flights loaded:', this.flights);
      },
      error: () => this.message = '❌ Error loading flights.'
    });
  }

  loadSchedules(): void {
    this.scheduleService.getAllSchedules().subscribe({
      next: (data) => {
        this.schedules = data;
        console.log(' Schedules loaded:', this.schedules);
        if (data.length === 0) {
          this.message = ' No flight schedules available.';
        }
      },
      error: () => this.message = ' Error loading flight schedules.'
    });
  }

  getFlightName(flightId: number): string {
    const flight = this.flights.find(f => f.flightId === flightId);
    return flight ? `#${flight.flightId} - ${flight.origin} to ${flight.destination}` : 'Unknown Flight';
  }

  getCarrierName(flightId: number): string {
    const flight = this.flights.find(f => f.flightId === flightId);
    if (!flight) return 'Unknown Carrier';
    const carrier = this.carriers.find(c => c.carrierID === flight.carrierId);
    return carrier ? carrier.carrierName : 'Unknown Carrier';
  }

  deleteSchedule(scheduleId: number): void {
    if (confirm(`Are you sure you want to delete schedule ID ${scheduleId}?`)) {
      this.scheduleService.deleteSchedule(scheduleId).subscribe({
        next: () => {
          this.message = ` Schedule ${scheduleId} deleted successfully.`;
          this.loadSchedules();
        },
        error: () => this.message = ' Failed to delete schedule.'
      });
    }
  }
}
