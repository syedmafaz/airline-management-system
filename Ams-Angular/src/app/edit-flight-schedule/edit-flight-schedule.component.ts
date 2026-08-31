// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';

// @Component({
//   selector: 'app-edit-flight-schedule',
//   templateUrl: './edit-flight-schedule.component.html',
//   styleUrls: ['./edit-flight-schedule.component.css']
// })
// export class EditFlightScheduleComponent {
//   scheduleId: number = 0;
//   schedule: FlightSchedule | null = null;
//   updatedSchedule: Partial<FlightSchedule> = {};
//   message: string = '';

//   fields: string[] = [
//     'flightId',
//     'dateOfTravel',
//     'businessClassFare',
//     'economyClassFare',
//     'executiveClassFare'
//   ];

//   constructor(
//     private scheduleService: FlightScheduleService,
//     private router: Router
//   ) {}

//   searchSchedule(): void {
//     if (!this.scheduleId) {
//       this.message = 'Please enter a valid Schedule ID';
//       this.schedule = null;
//       return;
//     }

//     this.scheduleService.getFlightScheduleById(this.scheduleId).subscribe({
//       next: (data) => {
//         if (data) {
//           this.schedule = data;
//           this.updatedSchedule = {};
//           this.message = 'Schedule found successfully';
//         } else {
//           this.message = 'Schedule not found';
//           this.schedule = null;
//         }
//       },
//       error: (err) => {
//         this.message = err.error?.message;
//         this.schedule = null;
//       }
//     });
//   }

//   updateSchedule(): void {
//     if (!this.schedule) return;

//     const finalSchedule: FlightSchedule = {
//       ...this.schedule,
//       ...this.updatedSchedule
//     };

//     this.scheduleService.updateSchedule(finalSchedule).subscribe({
//       next: () => {
//         this.message = 'Flight Schedule updated successfully!';
//         setTimeout(() => this.router.navigate(['/list-flight-schedule']), 1500);
//       },
//       error: (err) => {
//         this.message = err.error?.message || 'Error updating schedule';
//       }
//     });
//   }

//   getFieldValue(field: string): any {
//     return this.schedule ? (this.schedule as any)[field] : '';
//   }

//   setUpdatedValue(field: string, value: any): void {
//     (this.updatedSchedule as any)[field] = value;
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';

@Component({
  selector: 'app-edit-flight-schedule',
  templateUrl: './edit-flight-schedule.component.html',
  styleUrls: ['./edit-flight-schedule.component.css']
})
export class EditFlightScheduleComponent {
  scheduleId: number = 0;
  schedule: FlightSchedule | null = null;
  updatedSchedule: Partial<FlightSchedule> = {};
  message: string = '';

  fields: string[] = [
    'flightId',
    'dateOfTravel',
    'departureDate',
    'departureTime',
    'arrivalDate',
    'arrivalTime',
    'businessClassFare',
    'economyClassFare',
    'executiveClassFare'
  ];

  constructor(
    private scheduleService: FlightScheduleService,
    private router: Router
  ) {}

  searchSchedule(): void {
    this.message = '';
    this.schedule = null;

    if (!this.scheduleId || this.scheduleId <= 0) {
      this.message = 'Please enter a valid Schedule ID';
      return;
    }

    this.scheduleService.getFlightScheduleById(this.scheduleId).subscribe({
      next: (data) => {
        if (data) {
          this.schedule = data;
          this.updatedSchedule = {};
          // this.message = '✅ Schedule found successfully';
        } else {
          this.message = ' Schedule not found';
        }
      },
      error: (err) => {
        this.message = err?.error?.message || ' Error fetching schedule';
      }
    });
  }

  updateSchedule(): void {
    if (!this.schedule) return;

    const finalSchedule: FlightSchedule = {
      ...this.schedule,
      ...this.updatedSchedule
    };

    this.scheduleService.updateSchedule(finalSchedule).subscribe({
      next: () => {
        this.message = 'Flight Schedule updated successfully!';
        setTimeout(() => this.router.navigate(['/list-flight-schedule']), 1500);
      },
      error: (err) => {
        this.message = err?.error?.message || ' Error updating schedule';
      }
    });
  }

  getFieldValue(field: string): any {
    return this.schedule ? (this.schedule as any)[field] : '';
  }

  setUpdatedValue(field: string, value: any): void {
    (this.updatedSchedule as any)[field] = value;
  }
}
