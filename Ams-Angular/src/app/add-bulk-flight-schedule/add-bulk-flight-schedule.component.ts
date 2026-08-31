import { Component, OnInit } from '@angular/core';
import { FlightScheduleService, FlightSchedule } from '../services/flight-schedule.service';
import { FlightService, Flight } from '../services/flight.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';

interface ValidationError {
  row: number;
  field: string;
  value: any;
  error: string;
}

interface DuplicateSchedule {
  row: number;
  schedule: FlightSchedule;
  existingSchedule: FlightSchedule;
}

@Component({
  selector: 'app-add-bulk-flight-schedule',
  templateUrl: './add-bulk-flight-schedule.component.html',
  styleUrls: ['./add-bulk-flight-schedule.component.css']
})
export class AddBulkFlightScheduleComponent implements OnInit {
  selectedFile: File | null = null;
  schedules: FlightSchedule[] = [];
  validationErrors: ValidationError[] = [];
  duplicateSchedules: DuplicateSchedule[] = [];
  existingSchedules: FlightSchedule[] = [];
  flights: Flight[] = [];
  selectedFlight: Flight | null = null;
  selectedFlightId: number | null = null;
  
  message: string = '';
  isSuccess: boolean = false;
  isLoading: boolean = false;
  showDuplicateDialog: boolean = false;
  showValidationErrors: boolean = false;
  
  fileProcessed: boolean = false;
  readyToUpload: boolean = false;

  constructor(
    private flightScheduleService: FlightScheduleService,
    private flightService: FlightService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights(): void {
    this.isLoading = true;
    this.flightService.getAllFlights().subscribe({
      next: (flights) => {
        this.flights = flights;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading flights:', err);
        this.message = 'Error loading flights. Please refresh the page.';
        this.isSuccess = false;
        this.isLoading = false;
      }
    });
  }

  onFlightSelected(): void {
    if (!this.selectedFlightId) return;
    
    this.isLoading = true;
    this.selectedFlight = this.flights.find(f => f.flightId === this.selectedFlightId!) || null;
    
    if (this.selectedFlight) {
      this.flightScheduleService.getSchedulesByFlightId(this.selectedFlightId!).subscribe({
        next: (schedules) => {
          this.existingSchedules = schedules;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading existing schedules:', err);
          this.message = 'Error loading existing schedules for this flight.';
          this.isSuccess = false;
          this.isLoading = false;
        }
      });
    }
  }

  changeFlight(): void {
    this.selectedFlight = null;
    this.selectedFlightId = null;
    this.resetState();
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
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
    this.schedules = [];
    this.validationErrors = [];
    this.duplicateSchedules = [];
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
        console.error('Error processing file:', error);
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

  parseExcelData(data: any[]): void {
    if (data.length < 2) {
      this.message = 'File must contain at least a header row and one data row.';
      this.isSuccess = false;
      this.isLoading = false;
      return;
    }

    const headers = data[0].map((h: string) => h.toString().trim());
    const requiredHeaders = [
      // 'Schedule ID',
      // 'Carrier Name',
      // 'Flight',
      'Date of Travel',
      'Departure Date',
      'Departure Time',
      'Arrival Date',
      'Arrival Time',
      'Business Fare',
      'Economy Fare',
      'Executive Fare'
    ];

    // Validate required headers
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    if (missingHeaders.length > 0) {
      this.message = `Missing required columns: ${missingHeaders.join(', ')}`;
      this.isSuccess = false;
      this.isLoading = false;
      return;
    }

    // Process data rows
    this.schedules = [];
    this.validationErrors = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      if (!row || row.every((cell: any) => cell === null || cell === undefined || cell === '')) {
        continue;
      }
      
      const schedule = this.createScheduleFromRow(row, headers, i + 1);
      
      if (schedule) {
        this.schedules.push(schedule);
      }
    }

    if (this.validationErrors.length > 0) {
      this.showValidationErrors = true;
      this.isLoading = false;
      return;
    }

    this.checkForDuplicates();
  }

  createScheduleFromRow(row: any[], headers: string[], rowNumber: number): FlightSchedule | null {
    const schedule: FlightSchedule = {
      flightScheduleId: 0,
      flightId: this.selectedFlightId!,
      dateOfTravel: '',
      departureDate: '',
      departureTime: '',
      arrivalDate: '',
      arrivalTime: '',
      businessClassFare: 0,
      economyClassFare: 0,
      executiveClassFare: 0,
      businessClassBookedCount: 0,
      economyClassBookedCount: 0,
      executiveClassBookedCount: 0
    };

    let hasErrors = false;

    headers.forEach((header, index) => {
      const value = row[index];
      const trimmedHeader = header.trim();
      
      switch (trimmedHeader) {
        case 'Schedule ID':
          // Optional field, can be ignored or used as needed
          break;

        case 'Carrier Name':
          // Optional field, can be ignored or used as needed
          break;

        case 'Flight':
          // Optional field, can be ignored or used as needed
          break;

        case 'Date of Travel':
          if (!value) {
            this.addValidationError(rowNumber, 'Date of Travel', value, 'Date of travel is required');
            hasErrors = true;
          } else {
            try {
              const date = new Date(value);
              if (isNaN(date.getTime())) {
                throw new Error('Invalid date');
              }
              schedule.dateOfTravel = formatDate(date, 'yyyy-MM-dd', 'en-US');
            } catch (e) {
              this.addValidationError(rowNumber, 'Date of Travel', value, 'Invalid date format (use YYYY-MM-DD)');
              hasErrors = true;
            }
          }
          break;

        case 'Departure Date':
          if (!value) {
            this.addValidationError(rowNumber, 'Departure Date', value, 'Departure date is required');
            hasErrors = true;
          } else {
            try {
              const date = new Date(value);
              if (isNaN(date.getTime())) {
                throw new Error('Invalid date');
              }
              schedule.departureDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
            } catch (e) {
              this.addValidationError(rowNumber, 'Departure Date', value, 'Invalid date format (use YYYY-MM-DD)');
              hasErrors = true;
            }
          }
          break;

        case 'Departure Time':
          if (!value || !this.isValidTime(value)) {
            this.addValidationError(rowNumber, 'Departure Time', value, 'Invalid departure time (use HH:MM format)');
            hasErrors = true;
          } else {
            schedule.departureTime = value.toString();
          }
          break;

        case 'Arrival Date':
          if (!value) {
            this.addValidationError(rowNumber, 'Arrival Date', value, 'Arrival date is required');
            hasErrors = true;
          } else {
            try {
              const date = new Date(value);
              if (isNaN(date.getTime())) {
                throw new Error('Invalid date');
              }
              schedule.arrivalDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
            } catch (e) {
              this.addValidationError(rowNumber, 'Arrival Date', value, 'Invalid date format (use YYYY-MM-DD)');
              hasErrors = true;
            }
          }
          break;

        case 'Arrival Time':
          if (!value || !this.isValidTime(value)) {
            this.addValidationError(rowNumber, 'Arrival Time', value, 'Invalid arrival time (use HH:MM format)');
            hasErrors = true;
          } else {
            schedule.arrivalTime = value.toString();
          }
          break;

        case 'Business Fare':
          const businessFare = this.parseNumber(value, 'Business Fare', rowNumber);
          if (businessFare === null) {
            hasErrors = true;
          } else {
            schedule.businessClassFare = businessFare;
          }
          break;

        case 'Economy Fare':
          const economyFare = this.parseNumber(value, 'Economy Fare', rowNumber);
          if (economyFare === null) {
            hasErrors = true;
          } else {
            schedule.economyClassFare = economyFare;
          }
          break;

        case 'Executive Fare':
          const executiveFare = this.parseNumber(value, 'Executive Fare', rowNumber);
          if (executiveFare === null) {
            hasErrors = true;
          } else {
            schedule.executiveClassFare = executiveFare;
          }
          break;

        default:
          // Ignore unknown columns
          break;
      }
    });

    return hasErrors ? null : schedule;
  }

  private addValidationError(row: number, field: string, value: any, error: string): void {
    this.validationErrors.push({ row, field, value, error });
  }

  private parseNumber(value: any, fieldName: string, rowNumber: number): number | null {
    const num = Number(value);
    if (isNaN(num)) {
      this.addValidationError(rowNumber, fieldName, value, 'Must be a valid number');
      return null;
    }
    if (num < 0) {
      this.addValidationError(rowNumber, fieldName, value, 'Must be a positive number');
      return null;
    }
    return num;
  }

  isValidTime(time: string): boolean {
    if (typeof time !== 'string') return false;
    return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
  }

  checkForDuplicates(): void {
    this.duplicateSchedules = [];

    this.schedules.forEach((schedule, index) => {
      const existing = this.existingSchedules.find(
        existing => existing.flightId === schedule.flightId 
          && existing.departureDate === schedule.departureDate
          && existing.departureTime === schedule.departureTime
      );

      if (existing) {
        this.duplicateSchedules.push({
          row: index + 2, // +2 because index starts at 0 and we skip header
          schedule: schedule,
          existingSchedule: existing
        });
      }
    });

    if (this.duplicateSchedules.length > 0) {
      this.showDuplicateDialog = true;
    } else {
      this.readyToUpload = true;
      this.fileProcessed = true;
    }

    this.isLoading = false;
  }

  onProceedWithoutDuplicates(): void {
    const duplicateKeys = this.duplicateSchedules.map(d => 
      `${d.schedule.flightId}-${d.schedule.departureDate}-${d.schedule.departureTime}`
    );
    
    this.schedules = this.schedules.filter(s => 
      !duplicateKeys.includes(`${s.flightId}-${s.departureDate}-${s.departureTime}`)
    );
    
    this.showDuplicateDialog = false;
    this.readyToUpload = true;
    this.fileProcessed = true;
    
    if (this.schedules.length === 0) {
      this.message = 'No schedules to upload after removing duplicates.';
      this.isSuccess = false;
      return;
    }
    
    this.message = `${this.schedules.length} schedules ready to upload (${this.duplicateSchedules.length} duplicates removed).`;
    this.isSuccess = true;
  }

  onCancelUpload(): void {
    this.showDuplicateDialog = false;
    this.resetState();
    this.selectedFile = null;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  onSubmit(): void {
    if (!this.selectedFlightId || this.schedules.length === 0) {
      this.message = 'No schedules to upload.';
      this.isSuccess = false;
      return;
    }

    this.isLoading = true;
    
    this.flightScheduleService.bulkValidate(this.selectedFlightId, this.schedules).subscribe({
      next: (response: any) => {
        if (response.duplicates && response.duplicates.length > 0) {
          this.duplicateSchedules = response.duplicates.map((dup: FlightSchedule) => ({
            row: this.schedules.findIndex(s => 
              s.departureDate === dup.departureDate && 
              s.departureTime === dup.departureTime
            ) + 2,
            schedule: dup,
            existingSchedule: this.existingSchedules.find(e => 
              e.departureDate === dup.departureDate && 
              e.departureTime === dup.departureTime
            )!
          }));
          this.showDuplicateDialog = true;
          this.isLoading = false;
        } else {
          this.uploadSchedules();
        }
      },
      error: (err) => {
        console.error('Error validating schedules:', err);
        this.message = 'Error validating schedules. Please try again.';
        this.isSuccess = false;
        this.isLoading = false;
      }
    });
  }

  uploadSchedules(): void {
    if (!this.selectedFlightId) return;
    
    this.flightScheduleService.bulkInsert(this.selectedFlightId, this.schedules).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        const successCount = response.inserted || 0;
        
        if (successCount === this.schedules.length) {
          const flightInfo = this.selectedFlight ? 
            `for Flight ${this.selectedFlight.flightId} (${this.selectedFlight.origin} → ${this.selectedFlight.destination})` : '';
          this.message = `Successfully uploaded ${successCount} schedules ${flightInfo}!`;
          this.isSuccess = true;
          
          setTimeout(() => {
            this.router.navigate(['/list-flight-schedule']);
          }, 3000);
        } else {
          this.message = `Upload completed: ${successCount} successful, ${this.schedules.length - successCount} failed.`;
          this.isSuccess = successCount > 0;
        }
      },
      error: (err) => {
        console.error('Error uploading schedules:', err);
        this.message = 'Error uploading schedules. Please try again.';
        this.isSuccess = false;
        this.isLoading = false;
      }
    });
  }

  closeValidationErrors(): void {
    this.showValidationErrors = false;
    this.resetState();
    this.selectedFile = null;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
}