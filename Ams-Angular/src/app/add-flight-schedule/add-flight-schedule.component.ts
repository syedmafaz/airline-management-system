// import { Component, OnInit } from '@angular/core';
// import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
// import { FlightService, Flight } from '../services/flight.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-add-flight-schedule',
//   templateUrl: './add-flight-schedule.component.html',
//   styleUrls: ['./add-flight-schedule.component.css']
// })
// export class AddFlightScheduleComponent implements OnInit {
//   schedule: FlightSchedule = {
//     flightScheduleId: 0,
//     flightId: 0,
//     dateOfTravel: '',
//     departureDate: '',
//     departureTime: '',
//     arrivalDate: '',
//     arrivalTime: '',
//     businessClassBookedCount: 0,
//     economyClassBookedCount: 0,
//     executiveClassBookedCount: 0,
//     businessClassFare: 0,
//     economyClassFare: 0,
//     executiveClassFare: 0
//   };

//   flights: Flight[] = [];
//   isLoadingFlights = false;
//   isSubmitting = false;
//   isSuccess = false;
//   message = '';
//   today = new Date().toISOString().split('T')[0];

//   constructor(
//     private flightScheduleService: FlightScheduleService,
//     private flightService: FlightService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.loadFlights();
//   }

//   loadFlights(): void {
//     this.isLoadingFlights = true;
//     this.message = '';

//     this.flightService.getAllFlights().subscribe({
//       next: (data) => {
//         this.flights = data;
//         this.isLoadingFlights = false;
//         if (data.length === 0) {
//           this.message = 'No flights available. Please add flights first.';
//           this.isSuccess = false;
//         }
//         if (this.schedule.departureTime.length === 5) {
//   this.schedule.departureTime += ':00';
// }
//         console.log('Flights loaded:', this.flights);
//       },
//       error: (error) => {
//         console.error('Error loading flights:', error);
//         this.message = 'Failed to load flights. Please try again.';
//         this.isSuccess = false;
//         this.isLoadingFlights = false;
//       }
//     });
//   }

//   onSubmit(): void {
//     this.message = '';
//     this.isSuccess = false;

//     if (!this.schedule.flightId) {
//       this.message = 'Please select a flight.';
//       return;
//     }

//     if (!this.schedule.dateOfTravel) {
//       this.message = 'Please select a travel date.';
//       return;
//     }

//     const selectedDate = new Date(this.schedule.dateOfTravel);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const year = selectedDate.getFullYear();
//     const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
//     const day = String(selectedDate.getDate()).padStart(2, '0');
//     this.schedule.dateOfTravel = `${year}-${month}-${day}`;

//     if (selectedDate < today) {
//       this.message = 'Travel date cannot be in the past.';
//       return;
//     }
//       if (this.schedule.departureTime && this.schedule.departureTime.length === 5) {
//     this.schedule.departureTime += ':00';
//   }
//   if (this.schedule.arrivalTime && this.schedule.arrivalTime.length === 5) {
//     this.schedule.arrivalTime += ':00';
//   }
//     if (this.schedule.businessClassFare < 1000) {
//       this.message = 'Business class fare must be at least ₹1,000.';
//       return;
//     }

//     if (this.schedule.economyClassFare < 500) {
//       this.message = 'Economy class fare must be at least ₹500.';
//       return;
//     }

//     if (this.schedule.executiveClassFare < 1500) {
//       this.message = 'Executive class fare must be at least ₹1,500.';
//       return;
//     }

//     this.isSubmitting = true;
//     console.log('Submitting flight schedule:', this.schedule);

//     this.flightScheduleService.addSchedule(this.schedule).subscribe({
//       next: (response: any) => {
//         console.log('Response from service:', response);
//         this.isSubmitting = false;

//         // ✅ FIX: Handle plain string from server
//         if (typeof response === 'string' && response.toLowerCase().includes('successfully')) {
//           this.isSuccess = true;
//           this.message = response;
//           setTimeout(() => {
//             this.resetForm();
//             this.router.navigate(['/list-flight-schedule']);
//           }, 2000);
//         } else {
//           this.isSuccess = false;
//           this.message = 'An error occurred while adding the schedule.';
//         }
//       },
//       error: (error) => {
//         console.error('Error adding schedule:', error);
//         this.isSubmitting = false;
//         this.isSuccess = false;
//         this.message = error.message || 'Failed to add flight schedule. Please try again.';
//       }
//     });
//   }

//   resetForm(): void {
//     this.schedule = {
//       flightScheduleId: 0,
//       flightId: 0,
//       dateOfTravel: '',
//       departureDate: '',
//       departureTime: '',
//       arrivalDate: '',
//       arrivalTime: '',
//       businessClassBookedCount: 0,
//       economyClassBookedCount: 0,
//       executiveClassBookedCount: 0,
//       businessClassFare: 0,
//       economyClassFare: 0,
//       executiveClassFare: 0
//     };
//     this.message = '';
//     this.isSuccess = false;
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
import { FlightService, Flight } from '../services/flight.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-flight-schedule',
  templateUrl: './add-flight-schedule.component.html',
  styleUrls: ['./add-flight-schedule.component.css']
})
export class AddFlightScheduleComponent implements OnInit {
  schedule: FlightSchedule = {
    flightScheduleId: 0,
    flightId: 0,
    dateOfTravel: '',
    departureDate: '',
    departureTime: '',
    arrivalDate: '',
    arrivalTime: '',
    businessClassBookedCount: 0,
    economyClassBookedCount: 0,
    executiveClassBookedCount: 0,
    businessClassFare: 0,
    economyClassFare: 0,
    executiveClassFare: 0
  };

  flights: Flight[] = [];
  isLoadingFlights = false;
  isSubmitting = false;
  isSuccess = false;
  message = '';
  today = new Date().toISOString().split('T')[0];
  
  // Validation flags
  timeValidationError = '';
  dateValidationError = '';

  constructor(
    private flightScheduleService: FlightScheduleService,
    private flightService: FlightService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights(): void {
    this.isLoadingFlights = true;
    this.message = '';

    this.flightService.getAllFlights().subscribe({
      next: (data) => {
        this.flights = data;
        this.isLoadingFlights = false;
        if (data.length === 0) {
          this.message = 'No flights available. Please add flights first.';
          this.isSuccess = false;
        }
        console.log('Flights loaded:', this.flights);
      },
      error: (error) => {
        console.error('Error loading flights:', error);
        this.message = 'Failed to load flights. Please try again.';
        this.isSuccess = false;
        this.isLoadingFlights = false;
      }
    });
  }

  // Auto-populate departure date when travel date changes
  onTravelDateChange(): void {
    this.dateValidationError = '';
    
    if (this.schedule.dateOfTravel) {
      // Auto-populate departure date with travel date
      this.schedule.departureDate = this.schedule.dateOfTravel;
      
      // Validate travel date is not in the past
      const selectedDate = new Date(this.schedule.dateOfTravel);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        this.dateValidationError = 'Travel date cannot be in the past.';
        this.schedule.dateOfTravel = '';
        this.schedule.departureDate = '';
        return;
      }
      
      // Clear arrival date if it's before departure date
      if (this.schedule.arrivalDate && this.schedule.arrivalDate < this.schedule.departureDate) {
        this.schedule.arrivalDate = '';
      }
      
      // Set minimum arrival date
      this.updateArrivalDateValidation();
    }
  }

  // Update arrival date validation based on departure date
  updateArrivalDateValidation(): void {
    if (this.schedule.departureDate) {
      // If arrival date is not set or is before departure date, set it to departure date
      if (!this.schedule.arrivalDate || this.schedule.arrivalDate < this.schedule.departureDate) {
        this.schedule.arrivalDate = this.schedule.departureDate;
      }
    }
  }

  // Validate arrival date
  onArrivalDateChange(): void {
    this.dateValidationError = '';
    
    if (this.schedule.arrivalDate && this.schedule.departureDate) {
      if (this.schedule.arrivalDate < this.schedule.departureDate) {
        this.dateValidationError = 'Arrival date cannot be before departure date.';
        this.schedule.arrivalDate = this.schedule.departureDate;
      }
    }
  }

  // Validate time difference when departure time changes
  onDepartureTimeChange(): void {
    this.timeValidationError = '';
    this.validateTimes();
  }

  // Validate time difference when arrival time changes
  onArrivalTimeChange(): void {
    this.timeValidationError = '';
    this.validateTimes();
  }

  // Comprehensive time validation
  validateTimes(): void {
    if (!this.schedule.departureTime || !this.schedule.arrivalTime) {
      return;
    }

    const departureDateTime = new Date(`${this.schedule.departureDate} ${this.schedule.departureTime}`);
    const arrivalDateTime = new Date(`${this.schedule.arrivalDate} ${this.schedule.arrivalTime}`);

    // Check if arrival is after departure
    if (arrivalDateTime <= departureDateTime) {
      this.timeValidationError = 'Arrival time must be after departure time.';
      return;
    }

    // Check minimum 1 hour difference
    const timeDifference = arrivalDateTime.getTime() - departureDateTime.getTime();
    const oneHourInMs = 60 * 60 * 1000; // 1 hour in milliseconds

    if (timeDifference < oneHourInMs) {
      const minutesDifference = Math.round(timeDifference / (60 * 1000));
      this.timeValidationError = `Flight duration must be at least 1 hour. Current duration: ${minutesDifference} minutes.`;
      return;
    }

    // Calculate and display flight duration
    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
    console.log(`Flight duration: ${hours} hours ${minutes} minutes`);
  }

  // Get flight duration for display
  getFlightDuration(): string {
    if (!this.schedule.departureTime || !this.schedule.arrivalTime || this.timeValidationError) {
      return '';
    }

    const departureDateTime = new Date(`${this.schedule.departureDate} ${this.schedule.departureTime}`);
    const arrivalDateTime = new Date(`${this.schedule.arrivalDate} ${this.schedule.arrivalTime}`);
    
    const timeDifference = arrivalDateTime.getTime() - departureDateTime.getTime();
    
    if (timeDifference > 0) {
      const hours = Math.floor(timeDifference / (60 * 60 * 1000));
      const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
      return `Duration: ${hours}h ${minutes}m`;
    }
    
    return '';
  }

  // Validate fare relationships
  validateFares(): boolean {
    const { economyClassFare, businessClassFare, executiveClassFare } = this.schedule;

    if (economyClassFare >= businessClassFare) {
      this.message = 'Business class fare must be higher than economy class fare.';
      return false;
    }

    if (businessClassFare >= executiveClassFare) {
      this.message = 'Executive class fare must be higher than business class fare.';
      return false;
    }

    if (economyClassFare >= executiveClassFare) {
      this.message = 'Executive class fare must be higher than economy class fare.';
      return false;
    }

    return true;
  }

  // Check if form is valid - FIXED
  isFormValid(): boolean {
    return this.timeValidationError === '' && // Check if empty string
           this.dateValidationError === '' && // Check if empty string
           this.schedule.flightId > 0 &&
           this.schedule.dateOfTravel !== '' &&
           this.schedule.departureTime !== '' &&
           this.schedule.arrivalTime !== '' &&
           this.schedule.economyClassFare >= 500 &&
           this.schedule.businessClassFare >= 1000 &&
           this.schedule.executiveClassFare >= 1500;
  }

  onSubmit(): void {
    this.message = '';
    this.isSuccess = false;

    // Basic validations
    if (!this.schedule.flightId) {
      this.message = 'Please select a flight.';
      return;
    }

    if (!this.schedule.dateOfTravel) {
      this.message = 'Please select a travel date.';
      return;
    }

    if (this.dateValidationError !== '') {
      this.message = this.dateValidationError;
      return;
    }

    if (this.timeValidationError !== '') {
      this.message = this.timeValidationError;
      return;
    }

    // Validate fare relationships
    if (!this.validateFares()) {
      return;
    }

    // Format dates and times
    const selectedDate = new Date(this.schedule.dateOfTravel);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    this.schedule.dateOfTravel = `${year}-${month}-${day}`;

    // Add seconds to time if not present
    if (this.schedule.departureTime && this.schedule.departureTime.length === 5) {
      this.schedule.departureTime += ':00';
    }
    if (this.schedule.arrivalTime && this.schedule.arrivalTime.length === 5) {
      this.schedule.arrivalTime += ':00';
    }

    this.isSubmitting = true;
    console.log('Submitting flight schedule:', this.schedule);

    this.flightScheduleService.addSchedule(this.schedule).subscribe({
      next: (response: any) => {
        console.log('Response from service:', response);
        this.isSubmitting = false;

        if (typeof response === 'string' && response.toLowerCase().includes('successfully')) {
          this.isSuccess = true;
          this.message = response;
          setTimeout(() => {
            this.resetForm();
            this.router.navigate(['/list-flight-schedule']);
          }, 2000);
        } else {
          this.isSuccess = false;
          this.message = 'An error occurred while adding the schedule.';
        }
      },
      error: (error) => {
        console.error('Error adding schedule:', error);
        this.isSubmitting = false;
        this.isSuccess = false;
        this.message = error.message || 'Failed to add flight schedule. Please try again.';
      }
    });
  }

  resetForm(): void {
    this.schedule = {
      flightScheduleId: 0,
      flightId: 0,
      dateOfTravel: '',
      departureDate: '',
      departureTime: '',
      arrivalDate: '',
      arrivalTime: '',
      businessClassBookedCount: 0,
      economyClassBookedCount: 0,
      executiveClassBookedCount: 0,
      businessClassFare: 0,
      economyClassFare: 0,
      executiveClassFare: 0
    };
    this.message = '';
    this.isSuccess = false;
    this.timeValidationError = '';
    this.dateValidationError = '';
  }
}
