
import { Component } from '@angular/core';
import { Carrier, CarrierService } from '../services/carrier.service';

@Component({
  selector: 'app-search-carrier',
  templateUrl: './search-carrier.component.html',
  styleUrls: ['./search-carrier.component.css']
})
export class SearchCarrierComponent {
  carrierId: number = 0;
  carrier: Carrier | null = null;
  message: string = '';
  isFound: boolean = false;

  constructor(private carrierService: CarrierService) {}

  onSearch(): void {
    if (this.carrierId <= 0) {
      this.message = 'Please enter a valid Carrier ID.';
      this.carrier = null;
      this.isFound = false;
      return;
    }

    

    this.carrierService.getCarrierById(this.carrierId).subscribe({
      next: (response: Carrier) => {
        this.carrier = response;
        this.isFound = true;
        this.message = 'Carrier found successfully.';
      },
      error: (err) => {
        this.message = 'Carrier not found with ID: ' + this.carrierId;
        this.carrier = null;
        this.isFound = false;
        console.error(err);
      }
    });
  }
}