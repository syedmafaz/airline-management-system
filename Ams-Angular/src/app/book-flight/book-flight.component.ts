


// // // // // import { Component, OnInit } from '@angular/core';
// // // // // import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// // // // // import { ActivatedRoute } from '@angular/router';
// // // // // import { FlightBookingService, FlightBooking } from '../services/flight-booking.service';
// // // // // import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
// // // // // import { AuthService } from '../services/auth.service';
// // // // // import { Router } from '@angular/router';
// // // // // import { CarrierService, Carrier } from '../services/carrier.service';
// // // // // import { jsPDF } from 'jspdf';
// // // // // import * as moment from 'moment';

// // // // // @Component({
// // // // //   selector: 'app-book-flight',
// // // // //   templateUrl: './book-flight.component.html',
// // // // //   styleUrls: ['./book-flight.component.css']
// // // // // })
// // // // // export class BookFlightComponent implements OnInit {
// // // // //   bookingForm!: FormGroup;
// // // // //   totalAmount: number = 0;
// // // // //   message: string = '';
// // // // //   schedule!: FlightSchedule;
// // // // //   flightInfo: string = '';
// // // // //   userId: number | null = null;
// // // // //   carrier!: Carrier;
// // // // //   paymentDetails: any = {};
// // // // //   showPaymentDetails: boolean = false;
// // // // //   bookingComplete: boolean = false;
// // // // //   bookingId: number | null = null;

// // // // //   get passengers(): FormArray {
// // // // //     return this.bookingForm.get('passengers') as FormArray;
// // // // //   }

// // // // //   constructor(
// // // // //     private fb: FormBuilder,
// // // // //     private route: ActivatedRoute,
// // // // //     private bookingService: FlightBookingService,
// // // // //     private scheduleService: FlightScheduleService,
// // // // //     private authService: AuthService,
// // // // //     private router: Router,
// // // // //     private carrierService: CarrierService
// // // // //   ) {}

// // // // //   ngOnInit(): void {
// // // // //     this.userId = this.authService.getUserId();
// // // // //     if (!this.userId) {
// // // // //       this.message = '❌ User not logged in';
// // // // //       return;
// // // // //     }
    
// // // // //     this.initializeForm();

// // // // //     const scheduleId = Number(this.route.snapshot.paramMap.get('id'));
// // // // //     this.scheduleService.getFlightScheduleById(scheduleId).subscribe({
// // // // //       next: (data) => {
// // // // //         this.schedule = data;
// // // // //         this.flightInfo = `#${data.flightId} (${data.departureTime} - ${data.arrivalTime})`;
// // // // //         this.updatePassengerArray();
        
// // // // //         // Fetch carrier details for discounts
// // // // //         this.carrierService.getCarrierById(data.flightId).subscribe(carrier => {
// // // // //           this.carrier = carrier;
// // // // //           this.calculateFare();
// // // // //         });
// // // // //       },
// // // // //       error: () => {
// // // // //         this.message = '❌ Failed to load flight schedule.';
// // // // //       }
// // // // //     });
// // // // //   }

// // // // //   initializeForm(): void {
// // // // //     this.bookingForm = this.fb.group({
// // // // //       seatCategory: ['', Validators.required],
// // // // //       numberOfTickets: [1, [Validators.required, Validators.min(1)]],
// // // // //       passengers: this.fb.array([])
// // // // //     });
// // // // //   }

// // // // //   updatePassengerArray(): void {
// // // // //     const num = this.bookingForm.get('numberOfTickets')?.value || 1;
// // // // //     const passengersArray = this.fb.array(
// // // // //       Array.from({ length: num }, () => 
// // // // //         this.fb.group({
// // // // //           name: ['', Validators.required],
// // // // //           age: ['', [Validators.required, Validators.min(0)]],
// // // // //           gender: ['Male', Validators.required],
          
// // // // //         })
// // // // //       )
// // // // //     );
// // // // //     this.bookingForm.setControl('passengers', passengersArray);
// // // // //     this.calculateFare();
// // // // //   }

// // // // //   calculateFare(): void {
// // // // //     if (!this.schedule || !this.carrier) return;

// // // // //     const seatCategory = this.bookingForm.value.seatCategory;
// // // // //     const count = this.bookingForm.value.numberOfTickets;
// // // // //     if (!seatCategory) return;

// // // // //     // Get base fare
// // // // //     let baseFare = 0;
// // // // //     switch (seatCategory) {
// // // // //       case 'business': baseFare = this.schedule.businessClassFare; break;
// // // // //       case 'economy': baseFare = this.schedule.economyClassFare; break;
// // // // //       case 'executive': baseFare = this.schedule.executiveClassFare; break;
// // // // //     }

// // // // //     // Calculate days difference
// // // // //     const travelDate = moment(this.schedule.dateOfTravel);
// // // // //     const today = moment();
// // // // //     const daysDifference = travelDate.diff(today, 'days');

// // // // //     // Apply discount based on advance booking
// // // // //     let discountPercentage = 0;
// // // // //     if (daysDifference >= 90) {
// // // // //       discountPercentage = this.carrier.discountPercentageNinteyDaysAdvanceBooking;
// // // // //     } else if (daysDifference >= 60) {
// // // // //       discountPercentage = this.carrier.discountPercentageSixtyDaysAdvanceBooking;
// // // // //     } else if (daysDifference >= 30) {
// // // // //       discountPercentage = this.carrier.discountPercentageThirtyDaysAdvanceBooking;
// // // // //     }

// // // // //     // Calculate total
// // // // //     const discountAmount = (baseFare * discountPercentage) / 100;
// // // // //     const discountedFare = baseFare - discountAmount;
// // // // //     this.totalAmount = discountedFare * count;

// // // // //     // Prepare payment details
// // // // //     this.paymentDetails = {
// // // // //       baseFare: baseFare,
// // // // //       discountPercentage: discountPercentage,
// // // // //       discountAmount: discountAmount,
// // // // //       discountedFare: discountedFare,
// // // // //       totalAmount: this.totalAmount,
// // // // //       daysDifference: daysDifference,
// // // // //       seatCategory: seatCategory,
// // // // //       numberOfTickets: count
// // // // //     };

// // // // //     this.showPaymentDetails = true;
// // // // //   }

// // // // //   confirmBooking(): void {
// // // // //     if (!this.userId || this.bookingForm.invalid) {
// // // // //       this.message = '❌ Please fill all required fields';
// // // // //       return;
// // // // //     }

// // // // //     const formValue = this.bookingForm.value;
// // // // //     const payload: FlightBooking = {
// // // // //         flightScheduleId: this.schedule.flightScheduleId,
// // // // //         userId: this.userId,
// // // // //         seatCategory: formValue.seatCategory,
// // // // //         numberOfTickets: formValue.numberOfTickets,
// // // // //         totalAmount: this.totalAmount,
// // // // //         passengerDetailsJson: JSON.stringify(formValue.passengers),
// // // // //         bookingStatus: 'booked',
// // // // //         bookingId: 0, // Will be assigned by backend
// // // // //         bookingDate: new Date().toISOString(),
// // // // //         refundAmount: 0,
// // // // //         flightInfo: this.flightInfo // Optional field
// // // // //     };

// // // // //     this.bookingService.bookFlight(payload).subscribe({
// // // // //       next: (response: any) => {
// // // // //         this.message = '✅ Flight booked successfully!';
// // // // //         this.bookingComplete = true;
// // // // //         this.bookingId = response.bookingId;
// // // // //         this.generateTicket();
// // // // //         setTimeout(() => {
// // // // //           this.router.navigate(['/user/view-flight-booking']);
// // // // //         }, 5000);
// // // // //       },
// // // // //       error: () => {
// // // // //         this.message = '❌ Booking failed. Please try again.';
// // // // //       }
// // // // //     });
// // // // //   }
// // // // //   generateCancellationReceipt(booking: any): void {
// // // // //     const doc = new jsPDF();
    
// // // // //     // Receipt Header
// // // // //     doc.setFontSize(20);
// // // // //     doc.text('Cancellation Receipt', 105, 15, { align: 'center' });
// // // // //     doc.setFontSize(12);
// // // // //     doc.text(`Booking #${booking.bookingId}`, 105, 22, { align: 'center' });
    
// // // // //     // Booking Details
// // // // //     doc.setFontSize(14);
// // // // //     doc.text('Booking Details', 14, 35);
// // // // //     doc.setFontSize(12);
// // // // //     doc.text(`Flight: ${booking.flightInfo}`, 14, 45);
// // // // //     doc.text(`Original Amount: ₹${booking.totalAmount}`, 14, 55);
// // // // //     doc.text(`Cancellation Date: ${new Date().toLocaleDateString()}`, 14, 65);
    
// // // // //     // Refund Details
// // // // //     doc.setFontSize(14);
// // // // //     doc.text('Refund Details', 14, 80);
// // // // //     doc.setFontSize(12);
// // // // //     doc.text(`Refund Percentage: ${booking.refundPercentage}%`, 14, 90);
// // // // //     doc.text(`Refund Amount: ₹${booking.refundAmount}`, 14, 100);
    
// // // // //     // Save the PDF
// // // // //     doc.save(`cancellation_receipt_${booking.bookingId}.pdf`);
// // // // // }

// // // // //   generateTicket(): void {
// // // // //     const doc = new jsPDF();
    
// // // // //     // Ticket Header
// // // // //     doc.setFontSize(20);
// // // // //     doc.text('Flight Ticket', 105, 15, { align: 'center' });
// // // // //     doc.setFontSize(12);
// // // // //     doc.text(`Ticket #${this.bookingId}`, 105, 22, { align: 'center' });
    
// // // // //     // Flight Details
// // // // //     doc.setFontSize(14);
// // // // //     doc.text('Flight Details', 14, 35);
// // // // //     doc.setFontSize(12);
// // // // //     doc.text(`Flight: ${this.flightInfo}`, 14, 45);
// // // // //     doc.text(`Date: ${this.schedule.dateOfTravel}`, 14, 55);
// // // // //     doc.text(`Departure: ${this.schedule.departureTime}`, 14, 65);
// // // // //     doc.text(`Arrival: ${this.schedule.arrivalTime}`, 14, 75);
// // // // //     doc.text(`Class: ${this.bookingForm.value.seatCategory}`, 14, 85);
    
// // // // //     // Passenger Details
// // // // //     doc.setFontSize(14);
// // // // //     doc.text('Passenger Details', 14, 100);
// // // // //     doc.setFontSize(12);
    
// // // // //     let yPos = 110;
// // // // //     this.bookingForm.value.passengers.forEach((passenger: any, index: number) => {
// // // // //       doc.text(`Passenger ${index + 1}: ${passenger.name}`, 14, yPos);
// // // // //       doc.text(`Age: ${passenger.age}`, 14, yPos + 10);
// // // // //       doc.text(`Gender: ${passenger.gender}`, 14, yPos + 20);
// // // // //       yPos += 40;
// // // // //     });
    
// // // // //     // Payment Details
// // // // //     doc.setFontSize(14);
// // // // //     doc.text('Payment Details', 14, yPos + 10);
// // // // //     doc.setFontSize(12);
// // // // //     doc.text(`Base Fare: ₹${this.paymentDetails.baseFare}`, 14, yPos + 20);
// // // // //     doc.text(`Discount (${this.paymentDetails.discountPercentage}%): ₹${this.paymentDetails.discountAmount}`, 14, yPos + 30);
// // // // //     doc.text(`Total Amount: ₹${this.paymentDetails.totalAmount}`, 14, yPos + 40);
    
// // // // //     // Save the PDF
// // // // //     doc.save(`flight_ticket_${this.bookingId}.pdf`);
// // // // //   }
// // // // // }



// // // // // book-flight.component.ts
// // // // import { Component, OnInit } from '@angular/core';
// // // // import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// // // // import { ActivatedRoute, Router } from '@angular/router';
// // // // import { FlightBookingService, PriceBreakdown } from '../services/flight-booking.service';
// // // // import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
// // // // import { AuthService } from '../services/auth.service';

// // // // @Component({
// // // //   selector: 'app-book-flight',
// // // //   templateUrl: './book-flight.component.html',
// // // //   styleUrls: ['./book-flight.component.css']
// // // // })
// // // // export class BookFlightComponent implements OnInit {
// // // //   bookingForm!: FormGroup;
// // // //   totalAmount: number = 0;
// // // //   baseFare: number = 0;
// // // //   discountAmount: number = 0;
// // // //   discountPercentage: number = 0;
// // // //   daysUntilTravel: number = 0;
// // // //   message: string = '';
// // // //   schedule!: FlightSchedule;
// // // //   flightInfo: string = '';
// // // //   userId: number | null = null;
// // // //   isCalculating: boolean = false;
// // // //   priceBreakdown: PriceBreakdown | null = null;

// // // //   get passengers(): FormArray {
// // // //     return this.bookingForm.get('passengers') as FormArray;
// // // //   }

// // // //   constructor(
// // // //     private fb: FormBuilder,
// // // //     private route: ActivatedRoute,
// // // //     private bookingService: FlightBookingService,
// // // //     private scheduleService: FlightScheduleService,
// // // //     private authService: AuthService,
// // // //     private router: Router
// // // //   ) {}

// // // //   ngOnInit(): void {
// // // //     this.userId = this.authService.getUserId();
// // // //     if (!this.userId) {
// // // //       this.message = '❌ User not logged in';
// // // //       return;
// // // //     }

// // // //     this.initializeForm();
// // // //     this.loadFlightSchedule();
// // // //   }

// // // //   initializeForm(): void {
// // // //     this.bookingForm = this.fb.group({
// // // //       seatCategory: ['economy', Validators.required],
// // // //       numberOfTickets: [1, [Validators.required, Validators.min(1)]],
// // // //       passengers: this.fb.array([])
// // // //     });
// // // //   }

// // // //   loadFlightSchedule(): void {
// // // //     const scheduleId = Number(this.route.snapshot.paramMap.get('id'));
// // // //     this.scheduleService.getFlightScheduleById(scheduleId).subscribe({
// // // //       next: (data) => {
// // // //         this.schedule = data;
// // // //         this.flightInfo = `#${data.flightId} (${data.departureTime} - ${data.arrivalTime})`;
// // // //         this.updatePassengerArray();
// // // //         this.calculatePrice();
// // // //       },
// // // //       error: () => {
// // // //         this.message = '❌ Failed to load flight schedule.';
// // // //       }
// // // //     });
// // // //   }

// // // //   updatePassengerArray(): void {
// // // //     const num = this.bookingForm.get('numberOfTickets')?.value || 1;
// // // //     const passengersArray = this.fb.array(
// // // //       Array.from({ length: num }, () => 
// // // //         this.fb.group({
// // // //           name: ['', Validators.required],
// // // //           age: ['', [Validators.required, Validators.min(0)]],
// // // //           gender: ['Male', Validators.required]
// // // //         })
// // // //       )
// // // //     );
// // // //     this.bookingForm.setControl('passengers', passengersArray);
// // // //     this.calculatePrice();
// // // //   }

// // // //   calculatePrice(): void {
// // // //     if (!this.schedule || !this.bookingForm.value.seatCategory) return;

// // // //     this.isCalculating = true;
// // // //     const seatCategory = this.bookingForm.value.seatCategory;
// // // //     const numberOfTickets = this.bookingForm.value.numberOfTickets || 1;
// // // //     const travelDate = this.schedule.dateOfTravel;

// // // //     this.bookingService.calculatePrice(
// // // //       this.schedule.flightScheduleId,
// // // //       seatCategory,
// // // //       numberOfTickets,
// // // //       travelDate
// // // //     ).subscribe({
// // // //       next: (breakdown: PriceBreakdown) => {
// // // //         this.priceBreakdown = breakdown;
// // // //         this.baseFare = breakdown.baseFare;
// // // //         this.discountAmount = breakdown.discountAmount;
// // // //         this.discountPercentage = breakdown.discountPercentage;
// // // //         this.totalAmount = breakdown.totalAmount;
// // // //         this.daysUntilTravel = breakdown.daysUntilTravel;
// // // //         this.isCalculating = false;
// // // //       },
// // // //       error: () => {
// // // //         this.message = '❌ Failed to calculate price';
// // // //         this.isCalculating = false;
// // // //       }
// // // //     });
// // // //   }

// // // //   confirmBooking(): void {
// // // //     if (!this.userId || this.bookingForm.invalid) {
// // // //       this.message = '❌ Please fill all required fields';
// // // //       return;
// // // //     }

// // // //     const formValue = this.bookingForm.value;
// // // //     const payload = {
// // // //       flightScheduleId: this.schedule.flightScheduleId,
// // // //       userId: this.userId,
// // // //       seatCategory: formValue.seatCategory,
// // // //       numberOfTickets: formValue.numberOfTickets,
// // // //       totalAmount: this.totalAmount,
// // // //       baseFare: this.baseFare,
// // // //       discountAmount: this.discountAmount,
// // // //       passengerDetailsJson: JSON.stringify(formValue.passengers),
// // // //       bookingStatus: 'booked'
// // // //     };

// // // //     this.bookingService.bookFlight(payload).subscribe({
// // // //       next: (response) => {
// // // //         this.message = '✅ Flight booked successfully!';
        
// // // //         // Auto-download ticket
// // // //         if (response.bookingId) {
// // // //           this.downloadTicket(response.bookingId);
// // // //         }
        
// // // //         setTimeout(() => {
// // // //           this.router.navigate(['/user/view-flight-booking']);
// // // //         }, 3000);
// // // //       },
// // // //       error: () => {
// // // //         this.message = '❌ Booking failed. Please try again.';
// // // //       }
// // // //     });
// // // //   }

// // // //   downloadTicket(bookingId: number): void {
// // // //     this.bookingService.downloadTicket(bookingId).subscribe({
// // // //       next: (blob) => {
// // // //         const url = window.URL.createObjectURL(blob);
// // // //         const link = document.createElement('a');
// // // //         link.href = url;
// // // //         link.download = `ticket-${bookingId}.pdf`;
// // // //         document.body.appendChild(link);
// // // //         link.click();
// // // //         document.body.removeChild(link);
// // // //         window.URL.revokeObjectURL(url);
// // // //       },
// // // //       error: () => {
// // // //         console.error('Failed to download ticket');
// // // //       }
// // // //     });
// // // //   }
// // // // }


// // // // book-flight.component.ts
// // // // import { Component, OnInit } from '@angular/core';
// // // // import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// // // // import { ActivatedRoute, Router } from '@angular/router';
// // // // import { FlightBookingService, PriceBreakdown } from '../services/flight-booking.service';
// // // // import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
// // // // import { AuthService } from '../services/auth.service';

// // // // @Component({
// // // //   selector: 'app-book-flight',
// // // //   templateUrl: './book-flight.component.html',
// // // //   styleUrls: ['./book-flight.component.css']
// // // // })
// // // // export class BookFlightComponent implements OnInit {
// // // //   bookingForm!: FormGroup;
// // // //   totalAmount: number = 0;
// // // //   baseFare: number = 0;
// // // //   discountAmount: number = 0;
// // // //   discountPercentage: number = 0;
// // // //   daysUntilTravel: number = 0;
// // // //   message: string = '';
// // // //   schedule!: FlightSchedule;
// // // //   flightInfo: string = '';
// // // //   userId: number | null = null;
// // // //   isCalculating: boolean = false;
// // // //   priceBreakdown: PriceBreakdown | null = null;

// // // //   get passengers(): FormArray {
// // // //     return this.bookingForm.get('passengers') as FormArray;
// // // //   }

// // // //   constructor(
// // // //     private fb: FormBuilder,
// // // //     private route: ActivatedRoute,
// // // //     private bookingService: FlightBookingService,
// // // //     private scheduleService: FlightScheduleService,
// // // //     private authService: AuthService,
// // // //     private router: Router
// // // //   ) {}

// // // //   ngOnInit(): void {
// // // //     this.userId = this.authService.getUserId();
// // // //     if (!this.userId) {
// // // //       this.message = '❌ User not logged in';
// // // //       return;
// // // //     }

// // // //     this.initializeForm();
// // // //     this.loadFlightSchedule();
// // // //   }

// // // //   initializeForm(): void {
// // // //     this.bookingForm = this.fb.group({
// // // //       seatCategory: ['economy', Validators.required],
// // // //       numberOfTickets: [1, [Validators.required, Validators.min(1)]],
// // // //       passengers: this.fb.array([])
// // // //     });
// // // //   }

// // // //   loadFlightSchedule(): void {
// // // //     const scheduleId = Number(this.route.snapshot.paramMap.get('id'));
// // // //     this.scheduleService.getFlightScheduleById(scheduleId).subscribe({
// // // //       next: (data) => {
// // // //         this.schedule = data;
// // // //         this.flightInfo = `#${data.flightId} (${data.departureTime} - ${data.arrivalTime})`;
// // // //         this.updatePassengerArray();
// // // //         this.calculatePrice();
// // // //       },
// // // //       error: () => {
// // // //         this.message = '❌ Failed to load flight schedule.';
// // // //       }
// // // //     });
// // // //   }

// // // //   updatePassengerArray(): void {
// // // //     const num = this.bookingForm.get('numberOfTickets')?.value || 1;
// // // //     const passengersArray = this.fb.array(
// // // //       Array.from({ length: num }, () => 
// // // //         this.fb.group({
// // // //           name: ['', Validators.required],
// // // //           age: ['', [Validators.required, Validators.min(0)]],
// // // //           gender: ['Male', Validators.required]
// // // //         })
// // // //       )
// // // //     );
// // // //     this.bookingForm.setControl('passengers', passengersArray);
// // // //     this.calculatePrice();
// // // //   }

// // // //   calculatePrice(): void {
// // // //     if (!this.schedule || !this.bookingForm.value.seatCategory) return;

// // // //     this.isCalculating = true;
// // // //     const seatCategory = this.bookingForm.value.seatCategory;
// // // //     const numberOfTickets = this.bookingForm.value.numberOfTickets || 1;
// // // //     const travelDate = this.schedule.dateOfTravel;

// // // //     this.bookingService.calculatePrice(
// // // //       this.schedule.flightScheduleId,
// // // //       seatCategory,
// // // //       numberOfTickets,
// // // //       travelDate
// // // //     ).subscribe({
// // // //       next: (breakdown: PriceBreakdown) => {
// // // //         this.priceBreakdown = breakdown;
// // // //         this.baseFare = breakdown.baseFare;
// // // //         this.discountAmount = breakdown.discountAmount;
// // // //         this.discountPercentage = breakdown.discountPercentage;
// // // //         this.totalAmount = breakdown.totalAmount;
// // // //         this.daysUntilTravel = breakdown.daysUntilTravel;
// // // //         this.isCalculating = false;
// // // //       },
// // // //       error: () => {
// // // //         this.message = '❌ Failed to calculate price';
// // // //         this.isCalculating = false;
// // // //       }
// // // //     });
// // // //   }

// // // //   confirmBooking(): void {
// // // //     if (!this.userId || this.bookingForm.invalid) {
// // // //       this.message = '❌ Please fill all required fields';
// // // //       return;
// // // //     }

// // // //     const formValue = this.bookingForm.value;
// // // //     const payload = {
// // // //       flightScheduleId: this.schedule.flightScheduleId,
// // // //       userId: this.userId,
// // // //       seatCategory: formValue.seatCategory,
// // // //       numberOfTickets: formValue.numberOfTickets,
// // // //       totalAmount: this.totalAmount,
// // // //       baseFare: this.baseFare,
// // // //       discountAmount: this.discountAmount,
// // // //       passengerDetailsJson: JSON.stringify(formValue.passengers),
// // // //       bookingStatus: 'booked'
// // // //     };

// // // //     this.bookingService.bookFlight(payload).subscribe({
// // // //       next: (response) => {
// // // //         this.message = '✅ Flight booked successfully!';
        
// // // //         // Auto-download ticket
// // // //         if (response.bookingId) {
// // // //           this.downloadTicket(response.bookingId);
// // // //         }
        
// // // //         setTimeout(() => {
// // // //           this.router.navigate(['/user/view-flight-booking']);
// // // //         }, 3000);
// // // //       },
// // // //       error: () => {
// // // //         this.message = '❌ Booking failed. Please try again.';
// // // //       }
// // // //     });
// // // //   }

// // // //   downloadTicket(bookingId: number): void {
// // // //     this.bookingService.downloadTicket(bookingId).subscribe({
// // // //       next: (blob) => {
// // // //         const url = window.URL.createObjectURL(blob);
// // // //         const link = document.createElement('a');
// // // //         link.href = url;
// // // //         link.download = `ticket-${bookingId}.pdf`;
// // // //         document.body.appendChild(link);
// // // //         link.click();
// // // //         document.body.removeChild(link);
// // // //         window.URL.revokeObjectURL(url);
// // // //       },
// // // //       error: () => {
// // // //         console.error('Failed to download ticket');
// // // //       }
// // // //     });
// // // //   }
// // // // }



// // // // book-flight.component.ts
// // // import { Component, OnInit } from '@angular/core';
// // // import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// // // import { ActivatedRoute, Router } from '@angular/router';
// // // import { FlightBookingService, PriceBreakdown } from '../services/flight-booking.service';
// // // import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
// // // import { AuthService } from '../services/auth.service';

// // // @Component({
// // //   selector: 'app-book-flight',
// // //   templateUrl: './book-flight.component.html',
// // //   styleUrls: ['./book-flight.component.css']
// // // })
// // // export class BookFlightComponent implements OnInit {
// // //   bookingForm!: FormGroup;
// // //   totalAmount: number = 0;
// // //   baseFare: number = 0;
// // //   discountAmount: number = 0;
// // //   discountPercentage: number = 0;
// // //   daysUntilTravel: number = 0;
// // //   message: string = '';
// // //   schedule!: FlightSchedule;
// // //   flightInfo: string = '';
// // //   userId: number | null = null;
// // //   isCalculating: boolean = false;
// // //   priceBreakdown: PriceBreakdown | null = null;
// // //   showPaymentDetails: boolean = false;

// // //   get passengers(): FormArray {
// // //     return this.bookingForm.get('passengers') as FormArray;
// // //   }

// // //   constructor(
// // //     private fb: FormBuilder,
// // //     private route: ActivatedRoute,
// // //     private bookingService: FlightBookingService,
// // //     private scheduleService: FlightScheduleService,
// // //     private authService: AuthService,
// // //     private router: Router
// // //   ) {}

// // //   ngOnInit(): void {
// // //     this.userId = this.authService.getUserId();
// // //     if (!this.userId) {
// // //       this.message = '❌ User not logged in';
// // //       return;
// // //     }

// // //     this.initializeForm();
// // //     this.loadFlightSchedule();
// // //   }

// // //   initializeForm(): void {
// // //     this.bookingForm = this.fb.group({
// // //       seatCategory: ['economy', Validators.required],
// // //       numberOfTickets: [1, [Validators.required, Validators.min(1)]],
// // //       passengers: this.fb.array([])
// // //     });
// // //   }

// // //   loadFlightSchedule(): void {
// // //     const scheduleId = Number(this.route.snapshot.paramMap.get('id'));
// // //     this.scheduleService.getFlightScheduleById(scheduleId).subscribe({
// // //       next: (data) => {
// // //         this.schedule = data;
// // //         this.flightInfo = `#${data.flightId} (${data.departureTime} - ${data.arrivalTime})`;
// // //         this.updatePassengerArray();
// // //       },
// // //       error: () => {
// // //         this.message = '❌ Failed to load flight schedule.';
// // //       }
// // //     });
// // //   }

// // //   updatePassengerArray(): void {
// // //     const num = this.bookingForm.get('numberOfTickets')?.value || 1;
// // //     const passengersArray = this.fb.array(
// // //       Array.from({ length: num }, () => 
// // //         this.fb.group({
// // //           name: ['', Validators.required],
// // //           age: ['', [Validators.required, Validators.min(0)]],
// // //           gender: ['Male', Validators.required]
// // //         })
// // //       )
// // //     );
// // //     this.bookingForm.setControl('passengers', passengersArray);
// // //     this.calculatePrice();
// // //   }

// // //   calculatePrice(): void {
// // //     if (!this.schedule || !this.bookingForm.value.seatCategory) return;

// // //     this.isCalculating = true;
// // //     const seatCategory = this.bookingForm.value.seatCategory;
// // //     const numberOfTickets = this.bookingForm.value.numberOfTickets || 1;
// // //     const travelDate = this.schedule.dateOfTravel;

// // //     this.bookingService.calculatePrice(
// // //       this.schedule.flightScheduleId,
// // //       seatCategory,
// // //       numberOfTickets,
// // //       travelDate
// // //     ).subscribe({
// // //       next: (breakdown: PriceBreakdown) => {
// // //         this.priceBreakdown = breakdown;
// // //         this.baseFare = breakdown.baseFare;
// // //         this.discountAmount = breakdown.discountAmount;
// // //         this.discountPercentage = breakdown.discountPercentage;
// // //         this.totalAmount = breakdown.totalAmount;
// // //         this.daysUntilTravel = breakdown.daysUntilTravel;
// // //         this.showPaymentDetails = true;
// // //         this.isCalculating = false;
// // //       },
// // //       error: () => {
// // //         this.message = '❌ Failed to calculate price';
// // //         this.isCalculating = false;
// // //       }
// // //     });
// // //   }

// // //   confirmBooking(): void {
// // //     if (!this.userId || this.bookingForm.invalid) {
// // //       this.message = '❌ Please fill all required fields';
// // //       return;
// // //     }

// // //     const formValue = this.bookingForm.value;
// // //     const payload = {
// // //       flightScheduleId: this.schedule.flightScheduleId,
// // //       userId: this.userId,
// // //       seatCategory: formValue.seatCategory,
// // //       numberOfTickets: formValue.numberOfTickets,
// // //       totalAmount: this.totalAmount,
// // //       baseFare: this.baseFare,
// // //       discountAmount: this.discountAmount,
// // //       passengerDetailsJson: JSON.stringify(formValue.passengers),
// // //       bookingStatus: 'booked'
// // //     };

// // //     this.bookingService.bookFlight(payload).subscribe({
// // //       next: (response) => {
// // //         this.message = '✅ Flight booked successfully!';
        
// // //         if (response.bookingId) {
// // //           this.downloadTicket(response.bookingId);
// // //         }
        
// // //         setTimeout(() => {
// // //           this.router.navigate(['/user/view-flight-booking']);
// // //         }, 3000);
// // //       },
// // //       error: () => {
// // //         this.message = '❌ Booking failed. Please try again.';
// // //       }
// // //     });
// // //   }

// // //   downloadTicket(bookingId: number): void {
// // //     this.bookingService.downloadTicket(bookingId).subscribe({
// // //       next: (blob) => {
// // //         const url = window.URL.createObjectURL(blob);
// // //         const link = document.createElement('a');
// // //         link.href = url;
// // //         link.download = `ticket-${bookingId}.html`;
// // //         document.body.appendChild(link);
// // //         link.click();
// // //         document.body.removeChild(link);
// // //         window.URL.revokeObjectURL(url);
// // //       },
// // //       error: () => {
// // //         console.error('Failed to download ticket');
// // //       }
// // //     });
// // //   }
// // // }




// // import { Component, OnInit } from '@angular/core';
// // import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
// // import { ActivatedRoute, Router } from '@angular/router';
// // import { FlightBookingService, PriceBreakdown, FlightBookingRequest } from '../services/flight-booking.service';
// // import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
// // import { FlightService, Flight } from '../services/flight.service';
// // import { CarrierService, Carrier } from '../services/carrier.service';

// // @Component({
// //   selector: 'app-book-flight',
// //   templateUrl: './book-flight.component.html',
// //   styleUrls: ['./book-flight.component.css']
// // })
// // export class BookFlightComponent implements OnInit {
// //   bookingForm!: FormGroup;
// //   totalAmount: number = 0;
// //   baseFare: number = 0;
// //   discountAmount: number = 0;
// //   discountPercentage: number = 0;
// //   daysUntilTravel: number = 0;
// //   message: string = '';
// //   schedule!: FlightSchedule;
// //   flight!: Flight;
// //   carrier!: Carrier;
// //   userId: number | null = null;
// //   isCalculating: boolean = false;
// //   isBooking: boolean = false;
// //   priceBreakdown: PriceBreakdown | null = null;
// //   showPaymentDetails: boolean = false;
// //   loading: boolean = false;

// //   // Available seats for each category
// //   availableSeats = {
// //     economy: 0,
// //     business: 0,
// //     executive: 0
// //   };

// //   get passengers(): FormArray {
// //     return this.bookingForm.get('passengers') as FormArray;
// //   }

// //   constructor(
// //     private fb: FormBuilder,
// //     private route: ActivatedRoute,
// //     private bookingService: FlightBookingService,
// //     private scheduleService: FlightScheduleService,
// //     private flightService: FlightService,
// //     private carrierService: CarrierService,
// //     private router: Router
// //   ) {}

// //   ngOnInit(): void {
// //     this.userId = this.getUserId();
// //     if (!this.userId) {
// //       this.message = '❌ User not logged in. Please login to continue.';
// //       return;
// //     }

// //     this.initializeForm();
// //     this.loadFlightSchedule();
// //   }

// //   getUserId(): number | null {
// //     const userIdStr = localStorage.getItem('userId');
// //     return userIdStr ? parseInt(userIdStr, 10) : null;
// //   }

// //   initializeForm(): void {
// //     this.bookingForm = this.fb.group({
// //       seatCategory: ['economy', Validators.required],
// //       numberOfTickets: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
// //       passengers: this.fb.array([])
// //     });

// //     // Add custom validator to check available seats
// //     this.bookingForm.get('numberOfTickets')?.setValidators([
// //       Validators.required,
// //       Validators.min(1),
// //       Validators.max(5),
// //       this.seatAvailabilityValidator.bind(this)
// //     ]);
// //   }

// //   // Custom validator for seat availability
// //   seatAvailabilityValidator(control: AbstractControl): ValidationErrors | null {
// //     if (!this.availableSeats || !this.bookingForm) return null;
    
// //     const numberOfTickets = control.value;
// //     const seatCategory = this.bookingForm.get('seatCategory')?.value;
    
// //     if (numberOfTickets && seatCategory) {
// //       const available = this.availableSeats[seatCategory as keyof typeof this.availableSeats];
// //       if (numberOfTickets > available) {
// //         return { seatUnavailable: { available, requested: numberOfTickets } };
// //       }
// //     }
    
// //     return null;
// //   }

// //   loadFlightSchedule(): void {
// //     const scheduleId = Number(this.route.snapshot.paramMap.get('id'));
// //     if (!scheduleId) {
// //       this.message = '❌ Invalid flight schedule ID.';
// //       return;
// //     }

// //     this.loading = true;
// //     this.scheduleService.getFlightScheduleById(scheduleId).subscribe({
// //       next: (schedule) => {
// //         this.schedule = schedule;
// //         this.loadFlightDetails(schedule.flightId);
// //       },
// //       error: () => {
// //         this.message = '❌ Failed to load flight schedule.';
// //         this.loading = false;
// //       }
// //     });
// //   }

// //   loadFlightDetails(flightId: number): void {
// //     this.flightService.getFlightById(flightId).subscribe({
// //       next: (flight) => {
// //         this.flight = flight;
// //         this.calculateAvailableSeats();
// //         this.loadCarrierDetails(flight.carrierId);
// //       },
// //       error: () => {
// //         this.message = '❌ Failed to load flight details.';
// //         this.loading = false;
// //       }
// //     });
// //   }

// //   loadCarrierDetails(carrierId: number): void {
// //     this.carrierService.getCarrierById(carrierId).subscribe({
// //       next: (carrier) => {
// //         this.carrier = carrier;
// //         this.loading = false;
// //         this.updatePassengerArray();
// //       },
// //       error: () => {
// //         this.message = '❌ Failed to load carrier details.';
// //         this.loading = false;
// //       }
// //     });
// //   }

// //   calculateAvailableSeats(): void {
// //     if (!this.flight || !this.schedule) return;

// //     this.availableSeats = {
// //       economy: this.flight.seatCapacityEconomyClass - (this.schedule.economyClassBookedCount || 0),
// //       business: this.flight.seatCapacityBusinessClass - (this.schedule.businessClassBookedCount || 0),
// //       executive: this.flight.seatCapacityExecutiveClass - (this.schedule.executiveClassBookedCount || 0)
// //     };
// //   }

// //   updatePassengerArray(): void {
// //     const num = this.bookingForm.get('numberOfTickets')?.value || 1;
// //     const maxTickets = Math.min(5, this.getMaxAvailableSeats());
    
// //     if (num > maxTickets) {
// //       this.bookingForm.get('numberOfTickets')?.setValue(maxTickets);
// //       return;
// //     }

// //     const passengersArray = this.fb.array(
// //       Array.from({ length: num }, () => 
// //         this.fb.group({
// //           name: ['', [Validators.required, Validators.minLength(2), this.nameValidator]],
// //           age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
// //           gender: ['Male', Validators.required]
// //         })
// //       )
// //     );
// //     this.bookingForm.setControl('passengers', passengersArray);
// //     this.calculatePrice();
// //   }

// //   // Custom validator for passenger names
// //   nameValidator(control: AbstractControl): ValidationErrors | null {
// //     const value = control.value;
// //     if (!value) return null;

// //     // Check for valid characters (letters, spaces, dots, hyphens)
// //     const namePattern = /^[a-zA-Z\s.\-']+$/;
// //     if (!namePattern.test(value)) {
// //       return { invalidName: true };
// //     }

// //     // Check for forbidden values
// //     const forbiddenNames = ['null', 'undefined', 'n/a', 'na', 'none', 'test'];
// //     if (forbiddenNames.includes(value.toLowerCase().trim())) {
// //       return { forbiddenName: true };
// //     }

// //     return null;
// //   }

// //   getMaxAvailableSeats(): number {
// //     const seatCategory = this.bookingForm.get('seatCategory')?.value || 'economy';
// //     return this.availableSeats[seatCategory as keyof typeof this.availableSeats] || 0;
// //   }

// //   calculatePrice(): void {
// //     if (!this.schedule || !this.bookingForm.value.seatCategory) return;

// //     this.isCalculating = true;
// //     const seatCategory = this.bookingForm.value.seatCategory;
// //     const numberOfTickets = this.bookingForm.value.numberOfTickets || 1;
// //     const travelDate = this.schedule.dateOfTravel;

// //     this.bookingService.calculatePrice(
// //       this.schedule.flightScheduleId,
// //       seatCategory,
// //       numberOfTickets,
// //       travelDate
// //     ).subscribe({
// //       next: (breakdown: PriceBreakdown) => {
// //         this.priceBreakdown = breakdown;
// //         this.baseFare = breakdown.baseFare;
// //         this.discountAmount = breakdown.discountAmount;
// //         this.discountPercentage = breakdown.discountPercentage;
// //         this.totalAmount = breakdown.totalAmount;
// //         this.daysUntilTravel = breakdown.daysUntilTravel;
// //         this.showPaymentDetails = true;
// //         this.isCalculating = false;
// //       },
// //       error: () => {
// //         this.message = '❌ Failed to calculate price';
// //         this.isCalculating = false;
// //       }
// //     });
// //   }

// //   async confirmBooking(): Promise<void> {
// //     if (!this.userId || this.bookingForm.invalid) {
// //       this.message = '❌ Please fill all required fields correctly';
// //       this.markAllFieldsAsTouched();
// //       return;
// //     }

// //     // Check for duplicate passengers
// //     const passengers = this.bookingForm.value.passengers;
// //     const duplicateCheck = await this.checkDuplicatePassengers(passengers);
    
// //     if (!duplicateCheck.isValid) {
// //       this.message = `❌ ${duplicateCheck.message}`;
// //       return;
// //     }

// //     this.isBooking = true;
// //     this.message = '';

// //     const formValue = this.bookingForm.value;
// //     const payload: FlightBookingRequest = {
// //       flightScheduleId: this.schedule.flightScheduleId,
// //       userId: this.userId,
// //       seatCategory: formValue.seatCategory,
// //       numberOfTickets: formValue.numberOfTickets,
// //       totalAmount: this.totalAmount,
// //       baseFare: this.baseFare,
// //       discountAmount: this.discountAmount,
// //       passengerDetailsJson: JSON.stringify(formValue.passengers),
// //       bookingStatus: 'booked'
// //     };

// //     this.bookingService.bookFlight(payload).subscribe({
// //       next: (response) => {
// //         this.isBooking = false;
// //         this.message = '✅ Flight booked successfully! Your ticket will be downloaded shortly.';
        
// //         if (response.success && response.bookingId) {
// //           this.downloadTicket(response.bookingId);
          
// //           setTimeout(() => {
// //             this.router.navigate(['/user/view-flight-booking']);
// //           }, 3000);
// //         }
// //       },
// //       error: (error) => {
// //         this.isBooking = false;
// //         this.message = '❌ Booking failed. Please try again.';
// //         console.error('Booking error:', error);
// //       }
// //     });
// //   }

// //   async checkDuplicatePassengers(passengers: any[]): Promise<{isValid: boolean, message: string}> {
// //     try {
// //       // This would typically be an API call to check existing bookings
// //       // For now, we'll simulate the check
// //       const duplicateNames: string[] = [];
      
// //       // Check for duplicate names within the same booking
// //       const names = passengers.map(p => p.name.toLowerCase().trim());
// //       const uniqueNames = new Set(names);
      
// //       if (names.length !== uniqueNames.size) {
// //         return {
// //           isValid: false,
// //           message: 'Cannot book multiple tickets for the same passenger in one booking.'
// //         };
// //       }

// //       // Here you would make an API call to check against existing bookings
// //       // For demonstration, we'll assume it's valid
// //       return { isValid: true, message: '' };
      
// //     } catch (error) {
// //       return { 
// //         isValid: false, 
// //         message: 'Unable to verify passenger details. Please try again.' 
// //       };
// //     }
// //   }

// //   markAllFieldsAsTouched(): void {
// //     this.bookingForm.markAllAsTouched();
// //     this.passengers.controls.forEach(passengerGroup => {
// //       passengerGroup.markAllAsTouched();
// //     });
// //   }

// //   downloadTicket(bookingId: number): void {
// //     this.bookingService.downloadTicket(bookingId).subscribe({
// //       next: (blob) => {
// //         const url = window.URL.createObjectURL(blob);
// //         const link = document.createElement('a');
// //         link.href = url;
// //         link.download = `flight-ticket-${bookingId}.pdf`;
// //         document.body.appendChild(link);
// //         link.click();
// //         document.body.removeChild(link);
// //         window.URL.revokeObjectURL(url);
// //       },
// //       error: () => {
// //         console.error('Failed to download ticket');
// //       }
// //     });
// //   }

// //   getFlightRoute(): string {
// //     if (!this.flight) return 'Loading...';
// //     return `${this.flight.origin} → ${this.flight.destination}`;
// //   }

// //   getSeatCategoryFare(category: string): number {
// //     if (!this.schedule) return 0;
// //     switch (category) {
// //       case 'economy': return this.schedule.economyClassFare || 0;
// //       case 'business': return this.schedule.businessClassFare || 0;
// //       case 'executive': return this.schedule.executiveClassFare || 0;
// //       default: return 0;
// //     }
// //   }

// //   getErrorMessage(controlName: string, passengerIndex?: number): string {
// //     let control: AbstractControl | null;
    
// //     if (passengerIndex !== undefined) {
// //       control = this.passengers.at(passengerIndex)?.get(controlName);
// //     } else {
// //       control = this.bookingForm.get(controlName);
// //     }

// //     if (!control || !control.errors || !control.touched) return '';

// //     const errors = control.errors;

// //     if (errors['required']) return `${controlName} is required`;
// //     if (errors['min']) return `Minimum value is ${errors['min'].min}`;
// //     if (errors['max']) return `Maximum value is ${errors['max'].max}`;
// //     if (errors['minlength']) return `Minimum ${errors['minlength'].requiredLength} characters required`;
// //     if (errors['invalidName']) return 'Name can only contain letters, spaces, dots, and hyphens';
// //     if (errors['forbiddenName']) return 'This name is not allowed';
// //     if (errors['seatUnavailable']) {
// //       return `Only ${errors['seatUnavailable'].available} seats available`;
// //     }

// //     return 'Invalid input';
// //   }

// //   onSeatCategoryChange(): void {
// //     // Update seat availability validator
// //     this.bookingForm.get('numberOfTickets')?.updateValueAndValidity();
// //     this.calculatePrice();
// //   }

// //   getTimeUntilDeparture(): string {
// //     if (!this.schedule) return '';

// //     const departureDateTime = new Date(`${this.schedule.departureDate} ${this.schedule.departureTime}`);
// //     const now = new Date();
// //     const timeDiff = departureDateTime.getTime() - now.getTime();

// //     if (timeDiff <= 0) return 'Departed';

// //     const hours = Math.floor(timeDiff / (1000 * 60 * 60));
// //     const days = Math.floor(hours / 24);
// //     const remainingHours = hours % 24;

// //     if (days > 0) {
// //       return `${days} day(s) ${remainingHours} hour(s)`;
// //     } else {
// //       return `${hours} hour(s)`;
// //     }
// //   }
// // }


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FlightBookingService, PriceBreakdown, FlightBookingRequest } from '../services/flight-booking.service';
// import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
// import { FlightService, Flight } from '../services/flight.service';
// import { CarrierService, Carrier } from '../services/carrier.service';

// // Define seat category type
// type SeatCategory = 'economy' | 'business' | 'executive';

// // Define available seats interface
// interface AvailableSeats {
//   economy: number;
//   business: number;
//   executive: number;
// }

// @Component({
//   selector: 'app-book-flight',
//   templateUrl: './book-flight.component.html',
//   styleUrls: ['./book-flight.component.css']
// })
// export class BookFlightComponent implements OnInit {
//   bookingForm!: FormGroup;
//   totalAmount: number = 0;
//   baseFare: number = 0;
//   discountAmount: number = 0;
//   discountPercentage: number = 0;
//   daysUntilTravel: number = 0;
//   message: string = '';
//   schedule: FlightSchedule | null = null;
//   flight: Flight | null = null;
//   carrier: Carrier | null = null;
//   userId: number | null = null;
//   isCalculating: boolean = false;
//   isBooking: boolean = false;
//   priceBreakdown: PriceBreakdown | null = null;
//   showPaymentDetails: boolean = false;
//   loading: boolean = false;

//   // Available seats for each category with proper typing
//   availableSeats: AvailableSeats = {
//     economy: 0,
//     business: 0,
//     executive: 0
//   };

//   // Seat categories array for template iteration
//   seatCategories: SeatCategory[] = ['economy', 'business', 'executive'];

//   get passengers(): FormArray {
//     return this.bookingForm.get('passengers') as FormArray;
//   }

//   constructor(
//     private fb: FormBuilder,
//     private route: ActivatedRoute,
//     private bookingService: FlightBookingService,
//     private scheduleService: FlightScheduleService,
//     private flightService: FlightService,
//     private carrierService: CarrierService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.userId = this.getUserId();
//     if (!this.userId) {
//       this.message = '❌ User not logged in. Please login to continue.';
//       return;
//     }

//     this.initializeForm();
//     this.loadFlightSchedule();
//   }

//   getUserId(): number | null {
//     const userIdStr = localStorage.getItem('userId');
//     return userIdStr ? parseInt(userIdStr, 10) : null;
//   }

//   initializeForm(): void {
//     this.bookingForm = this.fb.group({
//       seatCategory: ['economy' as SeatCategory, Validators.required],
//       numberOfTickets: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
//       passengers: this.fb.array([])
//     });

//     // Add custom validator to check available seats
//     this.bookingForm.get('numberOfTickets')?.setValidators([
//       Validators.required,
//       Validators.min(1),
//       Validators.max(5),
//       this.seatAvailabilityValidator.bind(this)
//     ]);
//   }

//   // Custom validator for seat availability (Fixed)
//   seatAvailabilityValidator = (control: AbstractControl): ValidationErrors | null => {
//     if (!this.availableSeats || !this.bookingForm) return null;
    
//     const numberOfTickets = control.value;
//     const seatCategory = this.bookingForm.get('seatCategory')?.value as SeatCategory;
    
//     if (numberOfTickets && seatCategory) {
//       const available = this.availableSeats[seatCategory];
//       if (numberOfTickets > available) {
//         return { seatUnavailable: { available, requested: numberOfTickets } };
//       }
//     }
    
//     return null;
//   }

//   loadFlightSchedule(): void {
//     const scheduleId = Number(this.route.snapshot.paramMap.get('id'));
//     if (!scheduleId) {
//       this.message = '❌ Invalid flight schedule ID.';
//       return;
//     }

//     this.loading = true;
//     this.scheduleService.getFlightScheduleById(scheduleId).subscribe({
//       next: (schedule) => {
//         this.schedule = schedule;
//         this.loadFlightDetails(schedule.flightId);
//       },
//       error: () => {
//         this.message = '❌ Failed to load flight schedule.';
//         this.loading = false;
//       }
//     });
//   }

//   loadFlightDetails(flightId: number): void {
//     this.flightService.getFlightById(flightId).subscribe({
//       next: (flight) => {
//         this.flight = flight;
//         this.calculateAvailableSeats();
//         this.loadCarrierDetails(flight.carrierId);
//       },
//       error: () => {
//         this.message = '❌ Failed to load flight details.';
//         this.loading = false;
//       }
//     });
//   }

//   loadCarrierDetails(carrierId: number): void {
//     this.carrierService.getCarrierById(carrierId).subscribe({
//       next: (carrier) => {
//         this.carrier = carrier;
//         this.loading = false;
//         this.updatePassengerArray();
//       },
//       error: () => {
//         this.message = '❌ Failed to load carrier details.';
//         this.loading = false;
//       }
//     });
//   }

//   calculateAvailableSeats(): void {
//     if (!this.flight || !this.schedule) return;

//     this.availableSeats = {
//       economy: this.flight.seatCapacityEconomyClass - (this.schedule.economyClassBookedCount || 0),
//       business: this.flight.seatCapacityBusinessClass - (this.schedule.businessClassBookedCount || 0),
//       executive: this.flight.seatCapacityExecutiveClass - (this.schedule.executiveClassBookedCount || 0)
//     };
//   }

//   updatePassengerArray(): void {
//     const num = this.bookingForm.get('numberOfTickets')?.value || 1;
//     const maxTickets = Math.min(5, this.getMaxAvailableSeats());
    
//     if (num > maxTickets) {
//       this.bookingForm.get('numberOfTickets')?.setValue(maxTickets);
//       return;
//     }

//     const passengersArray = this.fb.array(
//       Array.from({ length: num }, () => 
//         this.fb.group({
//           name: ['', [Validators.required, Validators.minLength(2), this.nameValidator]],
//           age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
//           gender: ['Male', Validators.required]
//         })
//       )
//     );
//     this.bookingForm.setControl('passengers', passengersArray);
//     this.calculatePrice();
//   }

//   // Custom validator for passenger names
//   nameValidator(control: AbstractControl): ValidationErrors | null {
//     const value = control.value;
//     if (!value) return null;

//     // Check for valid characters (letters, spaces, dots, hyphens)
//     const namePattern = /^[a-zA-Z\s.\-']+$/;
//     if (!namePattern.test(value)) {
//       return { invalidName: true };
//     }

//     // Check for forbidden values
//     const forbiddenNames = ['null', 'undefined', 'n/a', 'na', 'none', 'test'];
//     if (forbiddenNames.includes(value.toLowerCase().trim())) {
//       return { forbiddenName: true };
//     }

//     return null;
//   }

//   getMaxAvailableSeats(): number {
//     const seatCategory = this.bookingForm.get('seatCategory')?.value as SeatCategory || 'economy';
//     return this.availableSeats[seatCategory] || 0;
//   }

//   // Helper method to get available seats for a category (for template)
//   getAvailableSeatsForCategory(category: string): number {
//     return this.availableSeats[category as SeatCategory] || 0;
//   }

//   calculatePrice(): void {
//     if (!this.schedule || !this.bookingForm.value.seatCategory) return;

//     this.isCalculating = true;
//     const seatCategory = this.bookingForm.value.seatCategory;
//     const numberOfTickets = this.bookingForm.value.numberOfTickets || 1;
//     const travelDate = this.schedule.dateOfTravel;

//     this.bookingService.calculatePrice(
//       this.schedule.flightScheduleId,
//       seatCategory,
//       numberOfTickets,
//       travelDate
//     ).subscribe({
//       next: (breakdown: PriceBreakdown) => {
//         this.priceBreakdown = breakdown;
//         this.baseFare = breakdown.baseFare;
//         this.discountAmount = breakdown.discountAmount;
//         this.discountPercentage = breakdown.discountPercentage;
//         this.totalAmount = breakdown.totalAmount;
//         this.daysUntilTravel = breakdown.daysUntilTravel;
//         this.showPaymentDetails = true;
//         this.isCalculating = false;
//       },
//       error: () => {
//         this.message = '❌ Failed to calculate price';
//         this.isCalculating = false;
//       }
//     });
//   }

//   async confirmBooking(): Promise<void> {
//     if (!this.userId || this.bookingForm.invalid || !this.schedule) {
//       this.message = '❌ Please fill all required fields correctly';
//       this.markAllFieldsAsTouched();
//       return;
//     }

//     // Check for duplicate passengers
//     const passengers = this.bookingForm.value.passengers;
//     const duplicateCheck = await this.checkDuplicatePassengers(passengers);
    
//     if (!duplicateCheck.isValid) {
//       this.message = `❌ ${duplicateCheck.message}`;
//       return;
//     }

//     this.isBooking = true;
//     this.message = '';

//     const formValue = this.bookingForm.value;
//     const payload: FlightBookingRequest = {
//       flightScheduleId: this.schedule.flightScheduleId,
//       userId: this.userId,
//       seatCategory: formValue.seatCategory,
//       numberOfTickets: formValue.numberOfTickets,
//       totalAmount: this.totalAmount,
//       baseFare: this.baseFare,
//       discountAmount: this.discountAmount,
//       passengerDetailsJson: JSON.stringify(formValue.passengers),
//       bookingStatus: 'booked'
//     };

//     this.bookingService.bookFlight(payload).subscribe({
//       next: (response) => {
//         this.isBooking = false;
//         this.message = '✅ Flight booked successfully! Your ticket will be downloaded shortly.';
        
//         if (response.success && response.bookingId) {
//           this.downloadTicket(response.bookingId);
          
//           setTimeout(() => {
//             this.router.navigate(['/user/view-flight-booking']);
//           }, 3000);
//         }
//       },
//       error: (error) => {
//         this.isBooking = false;
//         this.message = '❌ Booking failed. Please try again.';
//         console.error('Booking error:', error);
//       }
//     });
//   }

//   async checkDuplicatePassengers(passengers: any[]): Promise<{isValid: boolean, message: string}> {
//     try {
//       // Check for duplicate names within the same booking
//       const names = passengers.map(p => p.name.toLowerCase().trim());
//       const uniqueNames = new Set(names);
      
//       if (names.length !== uniqueNames.size) {
//         return {
//           isValid: false,
//           message: 'Cannot book multiple tickets for the same passenger in one booking.'
//         };
//       }

//       // Here you would make an API call to check against existing bookings
//       // For demonstration, we'll assume it's valid
//       return { isValid: true, message: '' };
      
//     } catch (error) {
//       return { 
//         isValid: false, 
//         message: 'Unable to verify passenger details. Please try again.' 
//       };
//     }
//   }

//   markAllFieldsAsTouched(): void {
//     this.bookingForm.markAllAsTouched();
//     this.passengers.controls.forEach(passengerGroup => {
//       passengerGroup.markAllAsTouched();
//     });
//   }

//   downloadTicket(bookingId: number): void {
//     this.bookingService.downloadTicket(bookingId).subscribe({
//       next: (blob) => {
//         const url = window.URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = `flight-ticket-${bookingId}.pdf`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         window.URL.revokeObjectURL(url);
//       },
//       error: () => {
//         console.error('Failed to download ticket');
//       }
//     });
//   }

//   getFlightRoute(): string {
//     if (!this.flight) return 'Loading...';
//     return `${this.flight.origin} → ${this.flight.destination}`;
//   }

//   getSeatCategoryFare(category: string): number {
//     if (!this.schedule) return 0;
//     const seatCategory = category as SeatCategory;
//     switch (seatCategory) {
//       case 'economy': return this.schedule.economyClassFare || 0;
//       case 'business': return this.schedule.businessClassFare || 0;
//       case 'executive': return this.schedule.executiveClassFare || 0;
//       default: return 0;
//     }
//   }

//   getErrorMessage(controlName: string, passengerIndex?: number): string {
//     let control: AbstractControl | null;
    
//     if (passengerIndex !== undefined) {
//       control = this.passengers.at(passengerIndex)?.get(controlName);
//     } else {
//       control = this.bookingForm.get(controlName);
//     }

//     if (!control || !control.errors || !control.touched) return '';

//     const errors = control.errors;

//     if (errors['required']) return `${controlName} is required`;
//     if (errors['min']) return `Minimum value is ${errors['min'].min}`;
//     if (errors['max']) return `Maximum value is ${errors['max'].max}`;
//     if (errors['minlength']) return `Minimum ${errors['minlength'].requiredLength} characters required`;
//     if (errors['invalidName']) return 'Name can only contain letters, spaces, dots, and hyphens';
//     if (errors['forbiddenName']) return 'This name is not allowed';
//     if (errors['seatUnavailable']) {
//       return `Only ${errors['seatUnavailable'].available} seats available`;
//     }

//     return 'Invalid input';
//   }

//   onSeatCategoryChange(): void {
//     // Update seat availability validator
//     this.bookingForm.get('numberOfTickets')?.updateValueAndValidity();
//     this.calculatePrice();
//   }

//   getTimeUntilDeparture(): string {
//     if (!this.schedule) return '';

//     const departureDateTime = new Date(`${this.schedule.departureDate} ${this.schedule.departureTime}`);
//     const now = new Date();
//     const timeDiff = departureDateTime.getTime() - now.getTime();

//     if (timeDiff <= 0) return 'Departed';

//     const hours = Math.floor(timeDiff / (1000 * 60 * 60));
//     const days = Math.floor(hours / 24);
//     const remainingHours = hours % 24;

//     if (days > 0) {
//       return `${days} day(s) ${remainingHours} hour(s)`;
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightBookingService, PriceBreakdown, FlightBookingRequest } from '../services/flight-booking.service';
import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
import { FlightService, Flight } from '../services/flight.service';
import { CarrierService, Carrier } from '../services/carrier.service';

export type SeatCategory = 'economy' | 'business' | 'executive';

export interface AvailableSeats {
  economy: number;
  business: number;
  executive: number;
}

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {
  currentStep: number = 1;
  bookingForm!: FormGroup;
  paymentForm!: FormGroup;
  
  paymentMethod: 'upi' | 'card' | 'netbanking' = 'upi';
  selectedUpiApp: string = 'gpay';
  selectedBank: string = 'HDFC Bank';
  paymentProcessing: boolean = false;
  bookedBookingId: number | null = null;

  totalAmount: number = 0;
  baseFare: number = 0;
  discountAmount: number = 0;
  discountPercentage: number = 0;
  daysUntilTravel: number = 0;
  message: string = '';
  
  schedule: FlightSchedule | null = null;
  flight: Flight | null = null;
  carrier: Carrier | null = null;
  userId: number | null = null;
  
  isCalculating: boolean = false;
  isBooking: boolean = false;
  priceBreakdown: PriceBreakdown | null = null;
  showPaymentDetails: boolean = false;
  loading: boolean = false;

  availableSeats: AvailableSeats = {
    economy: 0,
    business: 0,
    executive: 0
  };

  seatCategories: SeatCategory[] = ['economy', 'business', 'executive'];

  popularBanks: string[] = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank'
  ];

  allBanks: string[] = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Union Bank of India',
    'IndusInd Bank',
    'Yes Bank',
    'IDBI Bank',
    'Federal Bank',
    'Bank of India'
  ];

  get passengers(): FormArray {
    return this.bookingForm.get('passengers') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private bookingService: FlightBookingService,
    private scheduleService: FlightScheduleService,
    private flightService: FlightService,
    private carrierService: CarrierService
  ) {}

  ngOnInit(): void {
    this.userId = this.getUserId();
    if (!this.userId) {
      this.message = '❌ User not logged in. Please login to continue.';
      return;
    }

    this.initializeForm();
    this.initializePaymentForm();
    this.loadFlightSchedule();
  }

  getUserId(): number | null {
    const userIdStr = localStorage.getItem('userId');
    return userIdStr ? parseInt(userIdStr, 10) : null;
  }

  initializeForm(): void {
    this.bookingForm = this.fb.group({
      seatCategory: ['economy' as SeatCategory, Validators.required],
      numberOfTickets: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      passengers: this.fb.array([])
    });

    this.bookingForm.get('numberOfTickets')?.setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(5),
      this.seatAvailabilityValidator.bind(this)
    ]);
  }

  initializePaymentForm(): void {
    this.paymentForm = this.fb.group({
      upiId: ['traveler@okaxis', [Validators.required, Validators.pattern(/^[\w.\-]{2,}@[a-zA-Z]{2,}$/)]],
      cardNumber: ['4532 8901 2345 6789', [Validators.required]],
      cardName: ['John Doe', [Validators.required, Validators.minLength(3)]],
      cardExpiry: ['12/28', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]],
      cardCvv: ['888', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
      bankName: ['HDFC Bank', Validators.required]
    });
  }

  setPaymentMethod(method: 'upi' | 'card' | 'netbanking'): void {
    this.paymentMethod = method;
    this.message = '';
  }

  selectUpiApp(app: string): void {
    this.selectedUpiApp = app;
    const handles: { [key: string]: string } = {
      gpay: 'traveler@okhdfcbank',
      phonepe: 'traveler@ybl',
      paytm: 'traveler@paytm',
      bhim: 'traveler@upi',
      amazonpay: 'traveler@apl'
    };
    if (handles[app]) {
      this.paymentForm.get('upiId')?.setValue(handles[app]);
    }
  }

  selectBank(bank: string): void {
    this.selectedBank = bank;
    this.paymentForm.get('bankName')?.setValue(bank);
  }

  formatCardNumber(event: any): void {
    let input = event.target.value.replace(/\D/g, '').substring(0, 16);
    let formatted = input.match(/.{1,4}/g)?.join(' ') || input;
    this.paymentForm.get('cardNumber')?.setValue(formatted, { emitEvent: false });
  }

  formatCardExpiry(event: any): void {
    let input = event.target.value.replace(/\D/g, '').substring(0, 4);
    if (input.length > 2) {
      input = input.substring(0, 2) + '/' + input.substring(2);
    }
    this.paymentForm.get('cardExpiry')?.setValue(input, { emitEvent: false });
  }

  seatAvailabilityValidator = (control: AbstractControl): ValidationErrors | null => {
    if (!this.availableSeats || !this.bookingForm) return null;
    
    const numberOfTickets = control.value;
    const seatCategory = this.bookingForm.get('seatCategory')?.value as SeatCategory;
    
    if (numberOfTickets && seatCategory) {
      const available = this.availableSeats[seatCategory];
      if (numberOfTickets > available) {
        return { seatUnavailable: { available, requested: numberOfTickets } };
      }
    }
    
    return null;
  };

  loadFlightSchedule(): void {
    const scheduleId = Number(this.route.snapshot.paramMap.get('id'));
    if (!scheduleId) {
      this.message = '❌ Invalid flight schedule ID.';
      return;
    }

    this.loading = true;
    this.scheduleService.getFlightScheduleById(scheduleId).subscribe({
      next: (schedule) => {
        this.schedule = schedule;
        this.loadFlightDetails(schedule.flightId);
      },
      error: () => {
        this.message = '❌ Failed to load flight schedule.';
        this.loading = false;
      }
    });
  }

  loadFlightDetails(flightId: number): void {
    this.flightService.getFlightById(flightId).subscribe({
      next: (flight) => {
        this.flight = flight;
        this.calculateAvailableSeats();
        this.loadCarrierDetails(flight.carrierId);
      },
      error: () => {
        this.message = '❌ Failed to load flight details.';
        this.loading = false;
      }
    });
  }

  loadCarrierDetails(carrierId: number): void {
    this.carrierService.getCarrierById(carrierId).subscribe({
      next: (carrier) => {
        this.carrier = carrier;
        this.loading = false;
        this.updatePassengerArray();
      },
      error: () => {
        this.message = '❌ Failed to load carrier details.';
        this.loading = false;
      }
    });
  }

  calculateAvailableSeats(): void {
    if (!this.flight || !this.schedule) return;

    this.availableSeats = {
      economy: (this.flight.seatCapacityEconomyClass || 0) - (this.schedule.economyClassBookedCount || 0),
      business: (this.flight.seatCapacityBusinessClass || 0) - (this.schedule.businessClassBookedCount || 0),
      executive: (this.flight.seatCapacityExecutiveClass || 0) - (this.schedule.executiveClassBookedCount || 0)
    };
  }

  updatePassengerArray(): void {
    const num = this.bookingForm.get('numberOfTickets')?.value || 1;
    const maxTickets = Math.min(5, this.getMaxAvailableSeats());
    
    if (num > maxTickets && maxTickets > 0) {
      this.bookingForm.get('numberOfTickets')?.setValue(maxTickets);
      return;
    }

    const currentLength = this.passengers.length;
    if (currentLength === num) return;

    const passengersArray = this.fb.array(
      Array.from({ length: num }, (_, i) => {
        const existing = this.passengers.at(i);
        return this.fb.group({
          name: [existing ? existing.get('name')?.value : '', [Validators.required, Validators.minLength(2), this.nameValidator]],
          age: [existing ? existing.get('age')?.value : '', [Validators.required, Validators.min(1), Validators.max(120)]],
          gender: [existing ? existing.get('gender')?.value : 'Male', Validators.required]
        });
      })
    );
    this.bookingForm.setControl('passengers', passengersArray);
    this.calculatePrice();
  }

  nameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const namePattern = /^[a-zA-Z\s.\-']+$/;
    if (!namePattern.test(value)) {
      return { invalidName: true };
    }

    const forbiddenNames = ['null', 'undefined', 'n/a', 'na', 'none', 'test'];
    if (forbiddenNames.includes(value.toLowerCase().trim())) {
      return { forbiddenName: true };
    }

    return null;
  }

  getMaxAvailableSeats(): number {
    const seatCategory = this.bookingForm?.get('seatCategory')?.value as SeatCategory || 'economy';
    return this.availableSeats[seatCategory] || 0;
  }

  getAvailableSeatsForCategory(category: string): number {
    return this.availableSeats[category as SeatCategory] || 0;
  }

  calculatePrice(): void {
    if (!this.schedule || !this.bookingForm.value.seatCategory) return;

    this.isCalculating = true;
    const seatCategory = this.bookingForm.value.seatCategory;
    const numberOfTickets = this.bookingForm.value.numberOfTickets || 1;
    const travelDate = this.schedule.dateOfTravel;

    this.bookingService.calculatePrice(
      this.schedule.flightScheduleId,
      seatCategory,
      numberOfTickets,
      travelDate
    ).subscribe({
      next: (breakdown: PriceBreakdown) => {
        this.priceBreakdown = breakdown;
        this.baseFare = breakdown.baseFare;
        this.discountAmount = breakdown.discountAmount;
        this.discountPercentage = breakdown.discountPercentage;
        this.totalAmount = breakdown.totalAmount;
        this.daysUntilTravel = breakdown.daysUntilTravel;
        this.showPaymentDetails = true;
        this.isCalculating = false;
      },
      error: () => {
        this.message = '❌ Failed to calculate price';
        this.isCalculating = false;
      }
    });
  }

  async proceedToPayment(): Promise<void> {
    if (!this.userId) {
      this.message = '❌ User not logged in. Please login to continue.';
      return;
    }

    if (this.bookingForm.invalid || !this.schedule) {
      this.message = '❌ Please fill in all passenger details correctly.';
      this.markAllFieldsAsTouched();
      return;
    }

    const passengers = this.bookingForm.value.passengers;
    const duplicateCheck = await this.checkDuplicatePassengers(passengers);
    if (!duplicateCheck.isValid) {
      this.message = `❌ ${duplicateCheck.message}`;
      return;
    }

    if (this.totalAmount <= 0) {
      this.calculatePrice();
    }

    this.message = '';
    this.currentStep = 2;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  backToBookingDetails(): void {
    this.currentStep = 1;
    this.message = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  isPaymentValid(): boolean {
    switch (this.paymentMethod) {
      case 'upi': {
        const upiId = (this.paymentForm.get('upiId')?.value || '').trim();
        return /^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(upiId);
      }
      case 'card': {
        const cardNumber = (this.paymentForm.get('cardNumber')?.value || '').replace(/\s/g, '');
        const cardName = (this.paymentForm.get('cardName')?.value || '').trim();
        const cardExpiry = (this.paymentForm.get('cardExpiry')?.value || '').trim();
        const cardCvv = (this.paymentForm.get('cardCvv')?.value || '').trim();
        return cardNumber.length === 16 && cardName.length >= 2 && /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardExpiry) && cardCvv.length >= 3;
      }
      case 'netbanking':
        return !!(this.paymentForm.get('bankName')?.value);
      default:
        return false;
    }
  }

  processPayment(): void {
    if (!this.isPaymentValid()) {
      this.message = '❌ Please provide valid payment details for the selected method.';
      return;
    }

    this.paymentProcessing = true;
    this.message = '';

    const formValue = this.bookingForm.value;
    const payload: FlightBookingRequest = {
      flightScheduleId: this.schedule!.flightScheduleId,
      userId: this.userId!,
      seatCategory: formValue.seatCategory,
      numberOfTickets: formValue.numberOfTickets,
      totalAmount: this.totalAmount,
      baseFare: this.baseFare,
      discountAmount: this.discountAmount,
      passengerDetailsJson: JSON.stringify(formValue.passengers),
      bookingStatus: 'booked'
    };

    this.bookingService.bookFlight(payload).subscribe({
      next: (response) => {
        this.paymentProcessing = false;
        if (response && response.success) {
          this.bookedBookingId = response.bookingId || null;
          this.currentStep = 3;
          this.message = '✅ Payment successful! Flight ticket booked successfully.';
          if (this.bookedBookingId) {
            setTimeout(() => {
              if (this.bookedBookingId) {
                this.downloadTicket(this.bookedBookingId);
              }
            }, 1500);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          this.message = `❌ Booking failed: ${response?.message || 'Please try again.'}`;
        }
      },
      error: (error) => {
        this.paymentProcessing = false;
        this.message = '❌ Payment processing failed. Please try again or use another payment method.';
        console.error('Booking error:', error);
      }
    });
  }

  confirmBooking(): void {
    this.proceedToPayment();
  }

  async checkDuplicatePassengers(passengers: any[]): Promise<{isValid: boolean, message: string}> {
    try {
      const names = passengers.map(p => (p.name || '').toLowerCase().trim()).filter(n => n.length > 0);
      const uniqueNames = new Set(names);
      
      if (names.length !== uniqueNames.size) {
        return {
          isValid: false,
          message: 'Cannot book multiple tickets for the same passenger name in one booking.'
        };
      }
      return { isValid: true, message: '' };
    } catch {
      return { 
        isValid: false, 
        message: 'Unable to verify passenger details. Please try again.' 
      };
    }
  }

  markAllFieldsAsTouched(): void {
    this.bookingForm.markAllAsTouched();
    this.passengers.controls.forEach(passengerGroup => {
      passengerGroup.markAllAsTouched();
    });
  }

  downloadTicket(bookingId: number): void {
    this.bookingService.downloadTicket(bookingId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `flight-ticket-${bookingId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        console.error('Failed to download ticket');
      }
    });
  }

  getFlightRoute(): string {
    if (!this.flight) return 'Loading...';
    return `${this.flight.origin} → ${this.flight.destination}`;
  }

  getSeatCategoryFare(category: string): number {
    if (!this.schedule) return 0;
    const seatCategory = category as SeatCategory;
    switch (seatCategory) {
      case 'economy': return this.schedule.economyClassFare || 0;
      case 'business': return this.schedule.businessClassFare || 0;
      case 'executive': return this.schedule.executiveClassFare || 0;
      default: return 0;
    }
  }

  getErrorMessage(controlName: string, passengerIndex?: number): string {
    let control: AbstractControl | null;
    
    if (passengerIndex !== undefined) {
      control = this.passengers.at(passengerIndex)?.get(controlName);
    } else {
      control = this.bookingForm.get(controlName);
    }

    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;

    if (errors['required']) return `${controlName} is required`;
    if (errors['min']) return `Minimum value is ${errors['min'].min}`;
    if (errors['max']) return `Maximum value is ${errors['max'].max}`;
    if (errors['minlength']) return `Minimum ${errors['minlength'].requiredLength} characters required`;
    if (errors['invalidName']) return 'Name can only contain letters, spaces, dots, and hyphens';
    if (errors['forbiddenName']) return 'This name is not allowed';
    if (errors['seatUnavailable']) {
      return `Only ${errors['seatUnavailable'].available} seats available in this category`;
    }

    return 'Invalid input';
  }

  onSeatCategoryChange(): void {
    this.bookingForm.get('numberOfTickets')?.updateValueAndValidity();
    this.calculatePrice();
  }

  getTimeUntilDeparture(): string {
    if (!this.schedule) return '';

    const departureDateTime = new Date(`${this.schedule.departureDate} ${this.schedule.departureTime}`);
    const now = new Date();
    const timeDiff = departureDateTime.getTime() - now.getTime();

    if (timeDiff <= 0) return 'Departed';

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;

    if (days > 0) {
      return `${days} day(s) ${remainingHours} hour(s)`;
    } else {
      return `${hours} hour(s)`;
    }
  }

  navigateToFlightSearch(): void {
    this.router.navigate(['/user/flight-booking-management']);
  }

  navigateToUserBookings(): void {
    this.router.navigate(['/user/view-flight-booking']);
  }
}
