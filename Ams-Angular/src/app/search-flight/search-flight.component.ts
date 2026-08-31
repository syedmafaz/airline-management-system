
import { Component } from '@angular/core';
import { FlightService, Flight } from '../services/flight.service';
import { CarrierService } from '../services/carrier.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent {
  flightId: number = 0;
  flight: Flight | null = null;
  message: string = '';
  isFound: boolean = false;
  carrierNames: Map<number, string> = new Map();

  constructor(
    private flightService: FlightService,
    private carrierService: CarrierService
  ) {}

  onSearch(): void {
    if (this.flightId <= 0) {
      this.message = 'Please enter a valid Flight ID.';
      this.flight = null;
      this.isFound = false;
      return;
    }
    
    this.flightService.getFlightById(this.flightId).subscribe({
      next: (response: Flight) => {
        this.flight = response;
        this.isFound = true;
        this.message = 'Flight found successfully.';
        if (response.carrierId) {
          this.loadCarrierName(response.carrierId);
        }
      },
      error: (err) => {
        this.message = 'Flight not found with ID: ' + this.flightId;
        this.flight = null;
        this.isFound = false;
        console.error(err);
      }
    });
  }

  private loadCarrierName(carrierId: number): void {
    if (!this.carrierNames.has(carrierId)) {
      this.carrierService.getCarrierById(carrierId).subscribe({
        next: (carrier) => {
          this.carrierNames.set(carrierId, carrier.carrierName);
        },
        error: (err) => {
          console.error('Error loading carrier name:', err);
          this.carrierNames.set(carrierId, 'Unknown Carrier');
        }
      });
    }
  }

  getCarrierName(carrierId: number): string {
    return this.carrierNames.get(carrierId) || 'Loading...';
  }
}