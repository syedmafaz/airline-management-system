// import { Component, OnInit } from '@angular/core';
// import { CarrierService, Carrier } from '../services/carrier.service';
// import { FlightService, Flight } from '../services/flight.service';

// @Component({
//   selector: 'app-list-flight',
//   templateUrl: './list-flight.component.html',
//   styleUrls: ['./list-flight.component.css']
// })
// export class ListFlightComponent implements OnInit {
//   flights: Flight[] = [];
//   carriers: Carrier[] = [];
//   message = '';

//   constructor(
//     private flightService: FlightService,
//     private carrierService: CarrierService
//   ) {}

//   ngOnInit(): void {
//     this.loadCarriers();
//     this.loadFlights();
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

//  // Change the method signature to accept null or undefined
// getCarrierName(carrierId: number): string {
//   const carrier = this.carriers.find(c => c.carrierID === carrierId);

//   return carrier ? carrier.carrierName : 'Unknown';
// }

// deleteFlight(flightID: number | undefined): void {
//   if (flightID === undefined) {
//     this.message = 'Invalid flight ID.';
//     return;
//   }

//   if (confirm('Are you sure you want to delete this flight?')) {
//     this.flightService.deleteFlight(flightID).subscribe({
//       next: () => {
//         this.message = `Flight ${flightID} deleted successfully.`;
//         this.loadFlights(); // Refresh list
//       },
//       error: () => {
//         this.message = 'Failed to delete flight.';
//       }
//     });
//   }
// }

// }




import { Component, OnInit } from '@angular/core';
import { CarrierService, Carrier } from '../services/carrier.service';
import { FlightService, Flight } from '../services/flight.service';

@Component({
 selector: 'app-list-flight',
 templateUrl: './list-flight.component.html',
 styleUrls: ['./list-flight.component.css']
})
export class ListFlightComponent implements OnInit {
 flights: Flight[] = [];
 carriers: Carrier[] = [];
 message = '';

 showConfirmDialog = false;
 selectedFlightId: number | null = null;

 constructor(
 private flightService: FlightService,
 private carrierService: CarrierService
 ) {}

 ngOnInit(): void {
 this.loadCarriers();
 this.loadFlights();
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

 getCarrierName(carrierId: number): string {
 const carrier = this.carriers.find(c => c.carrierID === carrierId);
 return carrier ? carrier.carrierName : 'Unknown';
}



 openDeleteDialog(flightID: number): void {
 this.selectedFlightId = flightID;
 this.showConfirmDialog = true;
 }

 confirmDelete(): void {
 if (this.selectedFlightId != null) {
 this.flightService.deleteFlight(this.selectedFlightId).subscribe({
 next: () => {
this.message = `Flight ${this.selectedFlightId} deleted successfully.`;
 this.loadFlights();
 this.resetDialog();
 },
 error: () => {
 this.message = 'Failed to delete flight.Because the flight is linked with flight schedule.';
 this.resetDialog();
 }
 });
 }
 }

 cancelDelete(): void {
 this.resetDialog();
 }

 private resetDialog(): void {
 this.showConfirmDialog = false;
 this.selectedFlightId = null;
 }
}