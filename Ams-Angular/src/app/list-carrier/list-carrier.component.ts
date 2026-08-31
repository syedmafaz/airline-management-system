import { Component, OnInit } from '@angular/core';
import { Carrier, CarrierService } from '../services/carrier.service';

@Component({
  selector: 'app-list-carrier',
  templateUrl: './list-carrier.component.html',
  styleUrls: ['./list-carrier.component.css']
})
// export class ListCarrierComponent implements OnInit {
//   carriers: Carrier[] = [];
//   message = '';

//   constructor(private carrierService: CarrierService) {}

//   ngOnInit(): void {
//     this.fetchCarriers();
//   }

//   fetchCarriers(): void {
//     this.carrierService.getAllCarriers().subscribe({
//       next: data => this.carriers = data,
//       error: err => this.message = 'Error fetching carriers'
//     });
//   }

//   deleteCarrier(id: number): void {
//     if (confirm('Are you sure you want to delete this carrier?')) {
//       this.carrierService.deleteCarrier(id).subscribe({
//         next: res => {
//           this.message = res.message || 'Carrier deleted successfully';
//           this.fetchCarriers();
//         },
//         error: err => this.message = 'Failed to delete carrier because the carrier has been linked with flight '
//       });
//     }
//   }
// }



export class ListCarrierComponent implements OnInit {
 carriers: Carrier[] = [];
 message = '';
  showConfirmDialog = false;
   selectedCarrierId: number | null = null;
  
   constructor(private carrierService: CarrierService) {}
  
   ngOnInit(): void {
   this.fetchCarriers();
   }
  
   fetchCarriers(): void {
   this.carrierService.getAllCarriers().subscribe({
   next: data => this.carriers = data,
   error: err => this.message = 'Error fetching carriers'
   });
   }
  
   deleteCarrier(id: number): void {
   this.selectedCarrierId = id;
   this.showConfirmDialog = true;
   }
  
 confirmDelete(): void {
  if (this.selectedCarrierId !== null) {
   this.carrierService.deleteCarrier(this.selectedCarrierId).subscribe({
   next: res => {
  this.message = res.message || 'Carrier deleted successfully';
   this.fetchCarriers();
   this.resetDialog();
  },
  error: err => {
  this.message = 'Failed to delete carrier because the carrier has been linked with flight';
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
   this.selectedCarrierId = null;
   }
  }