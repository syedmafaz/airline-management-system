import { Component, OnInit } from '@angular/core';
import { FlightService, Flight } from '../services/flight.service';
import { Carrier, CarrierService } from '../services/carrier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  flight: Flight = {
    flightId:0,
    carrierId: 0,
    origin: '',
    destination: '',
    airFare: 0,
    seatCapacityEconomyClass: 20,
    seatCapacityBusinessClass: 10,
    seatCapacityExecutiveClass: 10
  };

  carriers: Carrier[] = [];
  message = '';
  isSuccess = false;
  isSubmitting = false;
  isLoadingCarriers = false;

  constructor(
    private flightService: FlightService,
    private carrierService: CarrierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCarriers();
  }

  loadCarriers(): void {
    this.isLoadingCarriers = true;
    this.carrierService.getAllCarriers().subscribe({
      next: (data) => {
        this.carriers = data;
        this.isLoadingCarriers = false;
        console.log('Carriers loaded:', this.carriers);
      },
      error: (error) => {
        console.error('Error loading carriers:', error);
        this.message = 'Error loading carriers. Please refresh the page.';
        this.isSuccess = false;
        this.isLoadingCarriers = false;
      }
    });
  }

  onSubmit(): void {
    // Reset previous messages
    this.message = '';


if (!this.carriers.length) {
  this.message = 'No available carriers. Please create a carrier first.';
  this.isSuccess = false;
  return;
}

    
    // Validate carrier selection
    if (!this.flight.carrierId || isNaN(Number(this.flight.carrierId))) {
      this.message = 'Please select a valid carrier.';
      this.isSuccess = false;
      return;
    }

    // Validate carrier exists in the loaded carriers list
    const carrierExists = this.carriers.some(c => c.carrierID === Number(this.flight.carrierId));
    if (!carrierExists) {
      this.message = 'Selected carrier is not valid. Please refresh and try again.';
      this.isSuccess = false;
      return;
    }

    // Additional validation
    if (!this.flight.origin?.trim()) {
      this.message = 'Origin is required.';
      this.isSuccess = false;
      return;
    }

    if (!this.flight.destination?.trim()) {
      this.message = 'Destination is required.';
      this.isSuccess = false;
      return;
    }

    if (this.flight.origin.trim().toLowerCase() === this.flight.destination.trim().toLowerCase()) {
      this.message = 'Origin and destination cannot be the same.';
      this.isSuccess = false;
      return;
    }

    if (this.flight.airFare <= 0) {
      this.message = 'Air fare must be greater than 0.';
      this.isSuccess = false;
      return;
    }

    // Convert carrierID to number explicitly
    this.flight.carrierId = Number(this.flight.carrierId);
    
    // Trim whitespace from strings
    this.flight.origin = this.flight.origin.trim();
    this.flight.destination = this.flight.destination.trim();

    this.isSubmitting = true;
    console.log('Submitting flight:', this.flight);

    this.flightService.addFlight(this.flight).subscribe({
      next: (response) => {
        console.log('Flight added successfully:', response);
        this.message = 'Flight added successfully!';
        this.isSuccess = true;
        this.isSubmitting = false;
        
        // Reset form after successful submission
        setTimeout(() => {
          this.resetForm();
          this.router.navigate(['/list-flight']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error adding flight:', error);
        this.isSubmitting = false;
        this.isSuccess = false;
        
        // Handle specific error messages from backend
        if (error.message) {
          this.message = error.message;
        } else if (error.error?.message) {
          this.message = error.error.message;
        } else {
          this.message = 'Failed to add flight. Please try again.';
        }
      }
    });
  }

  private resetForm(): void {
    this.flight = {
      flightId:0,
      carrierId: 0,
      origin: '',
      destination: '',
      airFare: 0,
      seatCapacityEconomyClass: 20,
      seatCapacityBusinessClass: 10,
      seatCapacityExecutiveClass: 10
    };
    this.message = '';
    this.isSuccess = false;
  }

  // Helper method to get carrier name by ID
  getCarrierName(carrierId: number): string {
    const carrier = this.carriers.find(c => c.carrierID === carrierId);
    return carrier ? carrier.carrierName : 'Unknown';
  }

  // Method to check if a carrier is valid
  isValidCarrier(carrierId: number | null): boolean {
    if (!carrierId) return false;
    return this.carriers.some(c => c.carrierID === carrierId);
  }
}