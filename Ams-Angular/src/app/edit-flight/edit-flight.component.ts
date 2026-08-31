import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService, Flight } from '../services/flight.service';

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.css']
})
export class EditFlightComponent {
  flightId: number = 0;
  flight: Flight | null = null;
  updatedFlight: Partial<Flight> = {};
  message: string = '';

  fields: string[] = [
    'carrierId',
    'origin',
    'destination',
    'airFare',
    'seatCapacityEconomyClass',
    'seatCapacityBusinessClass',
    'seatCapacityExecutiveClass'
  ];

  constructor(
    private flightService: FlightService,
    private router: Router
  ) {}

  searchFlight(): void {
    this.flightService.getFlightById(this.flightId).subscribe({
      next: (data) => {
        this.flight = data;
        this.updatedFlight = {};
        this.message = '';
      },
      error: () => {
        this.message = 'Flight not found';
        this.flight = null;
      }
    });
  }

  getFieldValue(field: string): any {
    return this.flight ? (this.flight as any)[field] : '';
  }

  setUpdatedValue(field: string, value: string): void {
    (this.updatedFlight as any)[field] = value;
  }

  updateFlight(): void {
    if (!this.flight) return;

    const finalFlight: Flight = {
      ...this.flight,
      ...this.updatedFlight
    };

    this.flightService.updateFlight(finalFlight).subscribe({
      next: () => {
        this.message = 'Flight updated successfully!';
        setTimeout(() => this.router.navigate(['/list-flight']), 1500); // redirect after 1.5s
      },
      error: () => {
        this.message = 'Error updating flight';
      }
    });
  }
}