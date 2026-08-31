// import { Component } from '@angular/core';
// import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
// import { FlightService, Flight } from '../services/flight.service';
// import { CarrierService, Carrier } from '../services/carrier.service';

// @Component({
//   selector: 'app-search-flight-schedule',
//   templateUrl: './search-flight-schedule.component.html',
//   styleUrls: ['./search-flight-schedule.component.css']
// })
// export class SearchFlightScheduleComponent {
//   scheduleId: number = 0;
//   schedule: FlightSchedule | null = null;
//   flight: Flight | null = null;
//   carrierName: string = '';
//   message: string = '';
//   isFound: boolean = false;

//   constructor(
//     private scheduleService: FlightScheduleService,
//     private flightService: FlightService,
//     private carrierService: CarrierService
//   ) {}

//   onSearch(): void {
//     this.message = '';
//     this.isFound = false;
//     this.schedule = null;
//     this.flight = null;
//     this.carrierName = '';

//     if (this.scheduleId <= 0) {
//       this.message = 'Please enter a valid Schedule ID.';
//       return;
//     }

//     this.scheduleService.getFlightScheduleById(this.scheduleId).subscribe({
//       next: (schedule: FlightSchedule) => {
//         if (schedule) {
//           this.schedule = schedule;
//           this.isFound = true;
//           this.message = 'Schedule found successfully.';
//           this.loadFlight(schedule.flightId);
//         } else {
//           this.message = `Schedule not found with ID: ${this.scheduleId}`;
//         }
//       },
//       error: (err) => {
//         console.error('Error fetching schedule:', err);
//         this.message = `Schedule not found with ID: ${this.scheduleId}`;
//       }
//     });
//   }

//   private loadFlight(flightId: number): void {
//     this.flightService.getFlightById(flightId).subscribe({
//       next: (flightData) => {
//         this.flight = flightData;
//         this.loadCarrierName(flightData.carrierId);
//       },
//       error: (err) => {
//         console.error('Error loading flight:', err);
//         this.carrierName = 'Unknown Carrier';
//       }
//     });
//   }

//   private loadCarrierName(carrierId: number): void {
//     this.carrierService.getCarrierById(carrierId).subscribe({
//       next: (carrier: Carrier) => {
//         this.carrierName = carrier.carrierName;
//       },
//       error: (err) => {
//         console.error('Error loading carrier:', err);
//         this.carrierName = 'Unknown Carrier';
//       }
//     });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
import { FlightService, Flight } from '../services/flight.service';
import { CarrierService, Carrier } from '../services/carrier.service';

@Component({
  selector: 'app-search-flight-schedule',
  templateUrl: './search-flight-schedule.component.html',
  styleUrls: ['./search-flight-schedule.component.css']
})
export class SearchFlightScheduleComponent implements OnInit {
  scheduleId: number = 0;
  schedule: FlightSchedule | null = null;
  flight: Flight | null = null;
  carrierName: string = '';
  message: string = '';
  isFound: boolean = false;

  constructor(
    private scheduleService: FlightScheduleService,
    private flightService: FlightService,
    private carrierService: CarrierService
  ) {}

  ngOnInit(): void {
    // Nothing to load on init
  }

  onSearch(): void {
    this.message = '';
    this.isFound = false;
    this.schedule = null;
    this.flight = null;
    this.carrierName = '';

    if (this.scheduleId <= 0) {
      this.message = 'Please enter a valid Schedule ID.';
      return;
    }

    this.scheduleService.getFlightScheduleById(this.scheduleId).subscribe({
      next: (schedule: FlightSchedule) => {
        if (schedule) {
          this.schedule = schedule;
          this.isFound = true;
          this.message = 'Schedule found successfully.';
          this.loadFlight(schedule.flightId);
        } else {
          this.message = `Schedule not found with ID: ${this.scheduleId}`;
        }
      },
      error: (err) => {
        console.error('Error fetching schedule:', err);
        this.message = `Schedule not found with ID: ${this.scheduleId}`;
      }
    });
  }
  

  loadFlight(flightId: number): void {
    this.flightService.getFlightById(flightId).subscribe({
      next: (data) => {
        this.flight = data;
        this.loadCarrierName(data.carrierId);
      },
      error: () => {
        this.flight = null;
        this.carrierName = 'Unknown Carrier';
      }
    });
  }

  loadCarrierName(carrierId: number): void {
    this.carrierService.getCarrierById(carrierId).subscribe({
      next: (data) => this.carrierName = data.carrierName,
      error: () => this.carrierName = 'Unknown Carrier'
    });
  }

  reset(): void {
    this.schedule = null;
    this.flight = null;
    this.carrierName = '';
    this.message = '';
    this.isFound = false;
  }
}
