import { Component, OnInit } from '@angular/core';
import { FlightService, Flight } from '../services/flight.service';
import { CarrierService, Carrier } from '../services/carrier.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

interface ValidationError {
  row: number;
  field: string;
  value: any;
  error: string;
}

interface DuplicateFlight {
  row: number;
  flight: Flight;
  existingFlight: Flight;
}

@Component({
  selector: 'app-add-bulk-flight',
  templateUrl: './add-bulk-flight.component.html',
  styleUrls: ['./add-bulk-flight.component.css']
})
export class AddBulkFlightComponent implements OnInit {
  selectedFile: File | null = null;
  flights: Flight[] = [];
  validationErrors: ValidationError[] = [];
  duplicateFlights: DuplicateFlight[] = [];
  existingFlights: Flight[] = [];
  existingCarriers: Carrier[] = [];
  carriers: Carrier[] = [];
  selectedCarrier: Carrier | null = null;
  selectedCarrierId: number | null = null;
  selectedFlightId: number | null = null;
  schedules: any[] = [];
  duplicateSchedules: any[] = [];
  
  message: string = '';
  isSuccess: boolean = false;
  isLoading: boolean = false;
  showDuplicateDialog: boolean = false;
  showValidationErrors: boolean = false;
  
  // File processing states
  fileProcessed: boolean = false;
  readyToUpload: boolean = false;

  constructor(
    private flightService: FlightService,
    private carrierService: CarrierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadExistingData();
     this.loadCarriers();
  }

  loadCarriers(): void {
    this.isLoading = true;
    this.carrierService.getAllCarriers().subscribe({
      next: (carriers) => {
        this.carriers = carriers;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading carriers:', err);
        this.message = 'Error loading carriers. Please refresh the page.';
        this.isSuccess = false;
        this.isLoading = false;
      }
    });
  }

  onCarrierSelected(): void {
    if (!this.selectedCarrierId) return;
    
    this.isLoading = true;
    this.selectedCarrier = this.carriers.find(c => c.carrierID === this.selectedCarrierId!) || null;
    
    if (this.selectedCarrier) {
      this.flightService.getFlightsByCarrierId(this.selectedCarrierId!).subscribe({
        next: (flights) => {
          this.existingFlights = flights;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading existing flights:', err);
          this.message = 'Error loading existing flights for this carrier.';
          this.isSuccess = false;
          this.isLoading = false;
        }
      });
    }
  }

  changeCarrier(): void {
    this.selectedCarrier = null;
    this.selectedCarrierId = null;
    this.resetState();
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
  loadExistingData(): void {
    this.flightService.getAllFlights().subscribe({
      next: (flights) => {
        this.existingFlights = flights;
      },
      error: (err) => {
        console.error('Error loading existing flights:', err);
      }
    });

    this.carrierService.getAllCarriers().subscribe({
      next: (carriers) => {
        this.existingCarriers = carriers;
      },
      error: (err) => {
        console.error('Error loading existing carriers:', err);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.resetState();
      this.processFile();
    }
  }
  
  resetState(): void {
    this.flights = [];
    this.validationErrors = [];
    this.duplicateFlights = [];
    this.message = '';
    this.isSuccess = false;
    this.fileProcessed = false;
    this.readyToUpload = false;
    this.showDuplicateDialog = false;
    this.showValidationErrors = false;
  }

  processFile(): void {
    if (!this.selectedFile) return;

    this.isLoading = true;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      try {
        const data = e.target.result;
        let workbook: XLSX.WorkBook;
        
        if (this.selectedFile?.name.endsWith('.csv')) {
          workbook = XLSX.read(data, { type: 'string' });
        } else {
          workbook = XLSX.read(data, { type: 'binary' });
        }
        
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        this.parseExcelData(jsonData);
      } catch (error) {
        this.message = 'Error reading file. Please ensure it\'s a valid Excel/CSV file.';
        this.isSuccess = false;
        this.isLoading = false;
      }
    };

    if (this.selectedFile.name.endsWith('.csv')) {
      reader.readAsText(this.selectedFile);
    } else {
      reader.readAsBinaryString(this.selectedFile);
    }
  }
 getCarrierName(carrierId: number): string {
  // First check if we have a selected carrier with matching ID
  if (this.selectedCarrier && this.selectedCarrier.carrierID === carrierId) {
    return this.selectedCarrier.carrierName;
  }
  
  // Otherwise search in carriers array
  const carrier = this.carriers.find(c => c.carrierID === carrierId);
  return carrier ? carrier.carrierName : 'Unknown';
}

  parseExcelData(data: any[]): void {
    if (data.length < 2) {
      this.message = 'File must contain at least a header row and one data row.';
      this.isSuccess = false;
      this.isLoading = false;
      return;
    }

    const headers = data[0];
    const expectedHeaders = [
      'Origin',
      'Destination',
      'AirFare',
      'SeatCapacityBusinessClass',
      'SeatCapacityEconomyClass',
      'SeatCapacityExecutiveClass'
    ];

    // Validate headers
    const missingHeaders = expectedHeaders.filter(h => !headers.includes(h));
    if (missingHeaders.length > 0) {
      this.message = `Missing required columns: ${missingHeaders.join(', ')}`;
      this.isSuccess = false;
      this.isLoading = false;
      return;
    }

    // Process data rows
    this.flights = [];
    this.validationErrors = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Skip empty rows
      if (!row || row.every((cell: any) => cell === null || cell === undefined || cell === '')) {
        continue;
      }
      
      const flight = this.createFlightFromRow(row, headers, i + 1);
      
      if (flight) {
        this.flights.push(flight);
      }
    }

    if (this.validationErrors.length > 0) {
      this.showValidationErrors = true;
      this.isLoading = false;
      return;
    }

    this.checkForDuplicates();
  }

  createFlightFromRow(row: any[], headers: string[], rowNumber: number): Flight | null {
    const flight: Flight = {
      flightId: 0,
      carrierId: this.selectedCarrierId!,
      origin: '',
      destination: '',
      airFare: 0,
      seatCapacityBusinessClass: 0,
      seatCapacityEconomyClass: 0,
      seatCapacityExecutiveClass: 0
    };

    let hasErrors = false;

    headers.forEach((header, index) => {
      const value = row[index];
      
      switch (header) {
        case 'CarrierID':
          const carrierId = this.selectedCarrierId;
          // if (isNaN(carrierId)) {
          //   this.validationErrors.push({
          //     row: rowNumber,
          //     field: 'CarrierID',
          //     value: value,
          //     error: 'Carrier ID must be a number'
          //   });
          //   hasErrors = true;
          // } else if (!this.existingCarriers.some(c => c.carrierID === carrierId)) {
          //   this.validationErrors.push({
          //     row: rowNumber,
          //     field: 'CarrierID',
          //     value: value,
          //     error: 'Carrier ID does not exist in the system'
          //   });
          //   hasErrors = true;
          // } else {
          //   flight.carrierId = carrierId;
          // }
          break;

        case 'Origin':
          if (!value || typeof value !== 'string') {
            this.validationErrors.push({
              row: rowNumber,
              field: 'Origin',
              value: value,
              error: 'Origin is required and must be text'
            });
            hasErrors = true;
          } else if (value.trim().length < 3) {
            this.validationErrors.push({
              row: rowNumber,
              field: 'Origin',
              value: value,
              error: 'Origin must be at least 3 characters'
            });
            hasErrors = true;
          } else {
            flight.origin = value.trim();
          }
          break;

        case 'Destination':
          if (!value || typeof value !== 'string') {
            this.validationErrors.push({
              row: rowNumber,
              field: 'Destination',
              value: value,
              error: 'Destination is required and must be text'
            });
            hasErrors = true;
          } else if (value.trim().length < 3) {
            this.validationErrors.push({
              row: rowNumber,
              field: 'Destination',
              value: value,
              error: 'Destination must be at least 3 characters'
            });
            hasErrors = true;
          } else if (flight.origin && value.trim().toLowerCase() === flight.origin.toLowerCase()) {
            this.validationErrors.push({
              row: rowNumber,
              field: 'Destination',
              value: value,
              error: 'Destination cannot be the same as Origin'
            });
            hasErrors = true;
          } else {
            flight.destination = value.trim();
          }
          break;

        case 'AirFare':
          const airFare = Number(value);
          if (isNaN(airFare) || airFare <= 0) {
            this.validationErrors.push({
              row: rowNumber,
              field: 'AirFare',
              value: value,
              error: 'Air fare must be a positive number'
            });
            hasErrors = true;
          } else {
            flight.airFare = airFare;
          }
          break;

        case 'SeatCapacityBusinessClass':
          const businessSeats = Number(value);
          if (isNaN(businessSeats)) {
            this.validationErrors.push({
              row: rowNumber,
              field: 'Business Class Seats',
              value: value,
              error: 'Must be a valid number'
            });
            hasErrors = true;
          } else {
            flight.seatCapacityBusinessClass = businessSeats;
          }
          break;

        case 'SeatCapacityEconomyClass':
          const economySeats = Number(value);
          if (isNaN(economySeats)) {
            this.validationErrors.push({
              row: rowNumber,
              field: 'Economy Class Seats',
              value: value,
              error: 'Must be a valid number'
            });
            hasErrors = true;
          } else {
            flight.seatCapacityEconomyClass = economySeats;
          }
          break;

        case 'SeatCapacityExecutiveClass':
          const executiveSeats = Number(value);
          if (isNaN(executiveSeats)) {
            this.validationErrors.push({
              row: rowNumber,
              field: 'Executive Class Seats',
              value: value,
              error: 'Must be a valid number'
            });
            hasErrors = true;
          } else {
            flight.seatCapacityExecutiveClass = executiveSeats;
          }
          break;
      }
    });

    return hasErrors ? null : flight;
  }

  checkForDuplicates(): void {
    this.duplicateFlights = [];

    this.flights.forEach((flight, index) => {
      const existing = this.existingFlights.find(
        existing => existing.carrierId === flight.carrierId 
          && existing.origin.toLowerCase() === flight.origin.toLowerCase()
          && existing.destination.toLowerCase() === flight.destination.toLowerCase()
      );

      if (existing) {
        this.duplicateFlights.push({
          row: index + 2, // +2 because index starts at 0 and we skip header
          flight: flight,
          existingFlight: existing
        });
      }
    });

    if (this.duplicateFlights.length > 0) {
      this.showDuplicateDialog = true;
    } else {
      this.readyToUpload = true;
      this.fileProcessed = true;
    }

    this.isLoading = false;
  }

  onProceedWithoutDuplicates(): void {
    // Remove duplicates from flights array
    const duplicateKeys = this.duplicateFlights.map(d => 
      `${d.flight.carrierId}-${d.flight.origin.toLowerCase()}-${d.flight.destination.toLowerCase()}`
    );
    
    this.flights = this.flights.filter(f => 
      !duplicateKeys.includes(`${f.carrierId}-${f.origin.toLowerCase()}-${f.destination.toLowerCase()}`)
    );
    
    this.showDuplicateDialog = false;
    this.readyToUpload = true;
    this.fileProcessed = true;
    
    if (this.flights.length === 0) {
      this.message = 'No flights to upload after removing duplicates.';
      this.isSuccess = false;
      return;
    }
    
    this.message = `${this.flights.length} flights ready to upload (${this.duplicateFlights.length} duplicates removed).`;
    this.isSuccess = true;
  }

  onCancelUpload(): void {
    this.showDuplicateDialog = false;
    this.resetState();
    this.selectedFile = null;
    // Reset file input
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

   onSubmit(): void {
    if (!this.selectedCarrierId || this.flights.length === 0) {
      this.message = 'No flights to upload.';
      this.isSuccess = false;
      return;
    }

    this.isLoading = true;
    
    // First validate with backend
    this.flightService.bulkValidate(this.selectedCarrierId, this.flights).subscribe({
      next: (response: any) => {
        if (response.duplicates && response.duplicates.length > 0) {
          // Handle duplicates
          this.duplicateFlights = response.duplicates.map((dup: Flight) => ({
            row: this.flights.findIndex(f => 
              f.origin.toLowerCase() === dup.origin.toLowerCase() && 
              f.destination.toLowerCase() === dup.destination.toLowerCase()
            ) + 2,
            flight: dup,
            existingFlight: this.existingFlights.find(e => 
              e.origin.toLowerCase() === dup.origin.toLowerCase() && 
              e.destination.toLowerCase() === dup.destination.toLowerCase()
            )!
          }));
          this.showDuplicateDialog = true;
          this.isLoading = false;
        } else {
          // No duplicates found by backend, proceed with upload
          this.uploadFlights();
        }
      },
      error: (err) => {
        console.error('Error validating flights:', err);
        this.message = 'Error validating flights. Please try again.';
        this.isSuccess = false;
        this.isLoading = false;
      }
    });
  }

  // uploadFlights(): void {
  //   if (!this.selectedCarrierId) return;
    
  //   this.flightService.bulkInsert(this.selectedCarrierId, this.flights).subscribe({
  //     next: (response: any) => {
  //       this.isLoading = false;
  //       const successCount = response.inserted || 0;
        
  //       if (successCount === this.flights.length) {
  //         // this.message = `Successfully uploaded ${successCount} flights for ${this.selectedCarrierId ? this.getCarrierName(this.selectedCarrierId) : ''}!`;
  //         this.message = `Successfully uploaded ${successCount} flights for ${this.selectedCarrier?.carrierName || ''}!`;

  //         this.isSuccess = true;
          
  //         // Reset form and redirect after 3 seconds
  //         setTimeout(() => {
  //           this.router.navigate(['/list-flight']);
  //         }, 3000);
  //       } else {
  //         this.message = `Upload completed: ${successCount} successful, ${this.flights.length - successCount} failed.`;
  //         this.isSuccess = successCount > 0;
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error uploading flights:', err);
  //       this.message = 'Error uploading flights. Please try again.';
  //       this.isSuccess = false;
  //       this.isLoading = false;
  //     }
  //   });
  // }

  uploadFlights(): void {
  if (!this.selectedCarrierId) return;
  
  this.flightService.bulkInsert(this.selectedCarrierId, this.flights).subscribe({
    next: (response: any) => {
      this.isLoading = false;
      const successCount = response.inserted || 0;
      
      if (successCount === this.flights.length) {
        // Fix: Use selectedCarrier directly instead of searching by ID
        const carrierName = this.selectedCarrier ? this.selectedCarrier.carrierName : 'Unknown';
        this.message = `Successfully uploaded ${successCount} flights for ${carrierName}!`;
        this.isSuccess = true;
        
        // Reset form and redirect after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/list-flight']);
        }, 3000);
      } else {
        this.message = `Upload completed: ${successCount} successful, ${this.flights.length - successCount} failed.`;
        this.isSuccess = successCount > 0;
      }
    },
    error: (err) => {
      console.error('Error uploading flights:', err);
      this.message = 'Error uploading flights. Please try again.';
      this.isSuccess = false;
      this.isLoading = false;
    }
  });
}
  closeValidationErrors(): void {
    this.showValidationErrors = false;
    this.resetState();
    this.selectedFile = null;
    // Reset file input
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  onFlightSelected(): void {
    if (!this.selectedFlightId) return;
    
    this.isLoading = true;
    this.resetState();
    
    // Reset file input when flight changes
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    
    // Load existing schedules for the selected flight
    const selectedFlight = this.flights.find(f => f.flightId === this.selectedFlightId);
    if (selectedFlight) {
      this.schedules = [];
      this.duplicateSchedules = [];
      this.isLoading = false;
    } else {
      this.message = 'Selected flight not found.';
      this.isSuccess = false;
      this.isLoading = false;
    }
  }
}