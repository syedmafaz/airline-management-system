import { Component } from '@angular/core';
import { CarrierService, Carrier } from '../services/carrier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-carrier',
  templateUrl: './add-carrier.component.html',
  styleUrls: ['./add-carrier.component.css']
})
export class AddCarrierComponent {
  carrier: Carrier = {
    carrierID: 0,
    carrierName: '',
    discountPercentageThirtyDaysAdvanceBooking: 0,
    discountPercentageSixtyDaysAdvanceBooking: 0,
    discountPercentageNinteyDaysAdvanceBooking: 0,
    refundPercentageForTicketCancellation2DaysBeforeTravelDate: 0,
    refundPercentageForTicketCancellation10DaysBeforeTravelDate: 0,
    refundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate: 0,
    silverUserDiscount: 0,
    goldUserDiscount: 0,
    platinumUserDiscount: 0
  };

  message: string = '';
  isSuccess: boolean = false;

  constructor(private carrierService: CarrierService, private router: Router) {}

  onSubmit(): void {
    this.carrierService.addCarrier(this.carrier).subscribe({
      next: (response) => {
        this.message = response.message || 'Carrier created successfully!';
        this.isSuccess = true;

        // Clear form
        this.carrier = {
          carrierID: 0,
          carrierName: '',
          discountPercentageThirtyDaysAdvanceBooking: 0,
          discountPercentageSixtyDaysAdvanceBooking: 0,
          discountPercentageNinteyDaysAdvanceBooking: 0,
          refundPercentageForTicketCancellation2DaysBeforeTravelDate: 0,
          refundPercentageForTicketCancellation10DaysBeforeTravelDate: 0,
          refundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate: 0,
          silverUserDiscount: 0,
          goldUserDiscount: 0,
          platinumUserDiscount: 0
        };

        // Redirect after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/list-carrier']);
        }, 2000);
      },
      error: (err) => {
        this.message = 'Error: Carrier creation failed.';
        this.isSuccess = false;
        console.error(err);
      }
    });
  }
}
