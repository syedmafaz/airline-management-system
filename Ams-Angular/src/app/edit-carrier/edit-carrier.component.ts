import { Component } from '@angular/core';
import { CarrierService, Carrier } from '../services/carrier.service';

@Component({
  selector: 'app-edit-carrier',
  templateUrl: './edit-carrier.component.html',
  styleUrls: ['./edit-carrier.component.css']
})
export class EditCarrierComponent {
  carrierId: number = 0;
  carrier: Carrier | null = null;
  updatedCarrier: Partial<Carrier> = {};
  message: string = '';

  fields: string[] = [
    'carrierName',
    'discountPercentageThirtyDaysAdvanceBooking',
    'discountPercentageSixtyDaysAdvanceBooking',
    'discountPercentageNinteyDaysAdvanceBooking',
    'refundPercentageForTicketCancellation2DaysBeforeTravelDate',
    'refundPercentageForTicketCancellation10DaysBeforeTravelDate',
    'refundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate',
    'silverUserDiscount',
    'goldUserDiscount',
    'platinumUserDiscount'
  ];

  constructor(private carrierService: CarrierService) {}

  searchCarrier(): void {
    this.carrierService.getCarrierById(this.carrierId).subscribe({
      next: (data) => {
        this.carrier = data;
        this.updatedCarrier = {}; // start with empty update
        this.message = '';
      },
      error: () => {
        this.message = 'Carrier not found';
        this.carrier = null;
      }
    });
  }

  getFieldValue(field: string): any {
    return this.carrier ? (this.carrier as any)[field] : '';
  }

  setUpdatedValue(field: string, value: string): void {
    (this.updatedCarrier as any)[field] = value;
  }

  updateCarrier(): void {
    if (!this.carrier) return;
    const finalCarrier: Carrier = {
      ...this.carrier,
      ...this.updatedCarrier
    };

    this.carrierService.updateCarrier(finalCarrier).subscribe({
      next: () => this.message = 'Carrier updated successfully!',
      error: () => this.message = 'Error updating carrier'
    });
  }
}