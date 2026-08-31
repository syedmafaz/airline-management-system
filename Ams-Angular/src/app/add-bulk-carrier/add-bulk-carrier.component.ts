import { Component, OnInit } from '@angular/core';
import { CarrierService, Carrier } from '../services/carrier.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

interface ValidationError {
  row: number;
  field: string;
  value: any;
  error: string;
}

interface DuplicateCarrier {
  row: number;
  carrier: Carrier;
  existingCarrier: Carrier;
}

@Component({
  selector: 'app-add-bulk-carrier',
  templateUrl: './add-bulk-carrier.component.html',
  styleUrls: ['./add-bulk-carrier.component.css']
})
export class AddBulkCarrierComponent implements OnInit {
  selectedFile: File | null = null;
  carriers: Carrier[] = [];
  validationErrors: ValidationError[] = [];
  duplicateCarriers: DuplicateCarrier[] = [];
  existingCarriers: Carrier[] = [];
  
  message: string = '';
  isSuccess: boolean = false;
  isLoading: boolean = false;
  showDuplicateDialog: boolean = false;
  showValidationErrors: boolean = false;
  
  // File processing states
  fileProcessed: boolean = false;
  readyToUpload: boolean = false;

  constructor(private carrierService: CarrierService, private router: Router) {}

  ngOnInit(): void {
    this.loadExistingCarriers();
  }

  loadExistingCarriers(): void {
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
    this.carriers = [];
    this.validationErrors = [];
    this.duplicateCarriers = [];
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

  parseExcelData(data: any[]): void {
    if (data.length < 2) {
      this.message = 'File must contain at least a header row and one data row.';
      this.isSuccess = false;
      this.isLoading = false;
      return;
    }

    const headers = data[0];
    const expectedHeaders = [
      'CarrierName',
      'DiscountPercentageThirtyDaysAdvanceBooking',
      'DiscountPercentageSixtyDaysAdvanceBooking',
      'DiscountPercentageNinteyDaysAdvanceBooking',
      'RefundPercentageForTicketCancellation2DaysBeforeTravelDate',
      'RefundPercentageForTicketCancellation10DaysBeforeTravelDate',
      'RefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate',
      'SilverUserDiscount',
      'GoldUserDiscount',
      'PlatinumUserDiscount'
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
    this.carriers = [];
    this.validationErrors = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Skip empty rows
      if (!row || row.every((cell: any) => cell === null || cell === undefined || cell === '')) {
        continue;
      }
      
      const carrier = this.createCarrierFromRow(row, headers, i + 1);
      
      if (carrier) {
        this.carriers.push(carrier);
      }
    }

    if (this.validationErrors.length > 0) {
      this.showValidationErrors = true;
      this.isLoading = false;
      return;
    }

    this.checkForDuplicates();
  }

  createCarrierFromRow(row: any[], headers: string[], rowNumber: number): Carrier | null {
    const carrier: Carrier = {
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

    let hasErrors = false;

    headers.forEach((header, index) => {
      const value = row[index];
      
      switch (header) {
        case 'CarrierName':
          if (!value || typeof value !== 'string') {
            this.validationErrors.push({
              row: rowNumber,
              field: 'CarrierName',
              value: value,
              error: 'Carrier name is required and must be text'
            });
            hasErrors = true;
          } else if (value.trim().length < 6) {
            this.validationErrors.push({
              row: rowNumber,
              field: 'CarrierName',
              value: value,
              error: 'Carrier name must be at least 6 characters'
            });
            hasErrors = true;
          } else if (!/^[A-Za-z\s]+$/.test(value.trim())) {
            this.validationErrors.push({
              row: rowNumber,
              field: 'CarrierName',
              value: value,
              error: 'Carrier name must contain only letters and spaces'
            });
            hasErrors = true;
          } else {
            carrier.carrierName = value.trim();
          }
          break;

        case 'DiscountPercentageThirtyDaysAdvanceBooking':
          if (!this.isValidPercentage(value)) {
            this.validationErrors.push({
              row: rowNumber,
              field: '30 Days Advance Booking Discount',
              value: value,
              error: 'Must be a valid percentage (0-100)'
            });
            hasErrors = true;
          } else {
            carrier.discountPercentageThirtyDaysAdvanceBooking = Number(value);
          }
          break;

        case 'DiscountPercentageSixtyDaysAdvanceBooking':
          if (!this.isValidPercentage(value)) {
            this.validationErrors.push({
              row: rowNumber,
              field: '60 Days Advance Booking Discount',
              value: value,
              error: 'Must be a valid percentage (0-100)'
            });
            hasErrors = true;
          } else {
            carrier.discountPercentageSixtyDaysAdvanceBooking = Number(value);
          }
          break;

        case 'DiscountPercentageNinteyDaysAdvanceBooking':
          if (!this.isValidPercentage(value)) {
            this.validationErrors.push({
              row: rowNumber,
              field: '90 Days Advance Booking Discount',
              value: value,
              error: 'Must be a valid percentage (0-100)'
            });
            hasErrors = true;
          } else {
            carrier.discountPercentageNinteyDaysAdvanceBooking = Number(value);
          }
          break;

        case 'RefundPercentageForTicketCancellation2DaysBeforeTravelDate':
          if (!this.isValidPercentage(value)) {
            this.validationErrors.push({
              row: rowNumber,
              field: 'Refund 2 Days Before',
              value: value,
              error: 'Must be a valid percentage (0-100)'
            });
            hasErrors = true;
          } else {
            carrier.refundPercentageForTicketCancellation2DaysBeforeTravelDate = Number(value);
          }
          break;

        case 'RefundPercentageForTicketCancellation10DaysBeforeTravelDate':
          if (!this.isValidPercentage(value)) {
            this.validationErrors.push({
              row: rowNumber,
              field: 'Refund 10 Days Before',
              value: value,
              error: 'Must be a valid percentage (0-100)'
            });
            hasErrors = true;
          } else {
            carrier.refundPercentageForTicketCancellation10DaysBeforeTravelDate = Number(value);
          }
          break;

        case 'RefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate':
          if (!this.isValidPercentage(value)) {
            this.validationErrors.push({
              row: rowNumber,
              field: 'Refund 20+ Days Before',
              value: value,
              error: 'Must be a valid percentage (0-100)'
            });
            hasErrors = true;
          } else {
            carrier.refundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate = Number(value);
          }
          break;

        case 'SilverUserDiscount':
          if (!this.isValidPercentage(value)) {
            this.validationErrors.push({
              row: rowNumber,
              field: 'Silver User Discount',
              value: value,
              error: 'Must be a valid percentage (0-100)'
            });
            hasErrors = true;
          } else {
            carrier.silverUserDiscount = Number(value);
          }
          break;

        case 'GoldUserDiscount':
          if (!this.isValidPercentage(value)) {
            this.validationErrors.push({
              row: rowNumber,
              field: 'Gold User Discount',
              value: value,
              error: 'Must be a valid percentage (0-100)'
            });
            hasErrors = true;
          } else {
            carrier.goldUserDiscount = Number(value);
          }
          break;

        case 'PlatinumUserDiscount':
          if (!this.isValidPercentage(value)) {
            this.validationErrors.push({
              row: rowNumber,
              field: 'Platinum User Discount',
              value: value,
              error: 'Must be a valid percentage (0-100)'
            });
            hasErrors = true;
          } else {
            carrier.platinumUserDiscount = Number(value);
          }
          break;
      }
    });

    return hasErrors ? null : carrier;
  }

  isValidPercentage(value: any): boolean {
    if (value === null || value === undefined || value === '') return false;
    const num = Number(value);
    return !isNaN(num) && num >= 0 && num <= 100;
  }

  checkForDuplicates(): void {
    this.duplicateCarriers = [];

    this.carriers.forEach((carrier, index) => {
      const existing = this.existingCarriers.find(
        existing => existing.carrierName.toLowerCase() === carrier.carrierName.toLowerCase()
      );

      if (existing) {
        this.duplicateCarriers.push({
          row: index + 2, // +2 because index starts at 0 and we skip header
          carrier: carrier,
          existingCarrier: existing
        });
      }
    });

    if (this.duplicateCarriers.length > 0) {
      this.showDuplicateDialog = true;
    } else {
      this.readyToUpload = true;
      this.fileProcessed = true;
    }

    this.isLoading = false;
  }

  onProceedWithoutDuplicates(): void {
    // Remove duplicates from carriers array
    const duplicateNames = this.duplicateCarriers.map(d => d.carrier.carrierName.toLowerCase());
    this.carriers = this.carriers.filter(c => !duplicateNames.includes(c.carrierName.toLowerCase()));
    
    this.showDuplicateDialog = false;
    this.readyToUpload = true;
    this.fileProcessed = true;
    
    if (this.carriers.length === 0) {
      this.message = 'No carriers to upload after removing duplicates.';
      this.isSuccess = false;
      return;
    }
    
    this.message = `${this.carriers.length} carriers ready to upload (${this.duplicateCarriers.length} duplicates removed).`;
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
    if (this.carriers.length === 0) {
      this.message = 'No carriers to upload.';
      this.isSuccess = false;
      return;
    }

    this.isLoading = true;
    let successCount = 0;
    let errorCount = 0;
    let processedCount = 0;

    this.carriers.forEach(carrier => {
      this.carrierService.addCarrier(carrier).subscribe({
        next: (response) => {
          successCount++;
          processedCount++;
          this.checkUploadComplete(successCount, errorCount, processedCount);
        },
        error: (err) => {
          errorCount++;
          processedCount++;
          console.error('Error adding carrier:', err);
          this.checkUploadComplete(successCount, errorCount, processedCount);
        }
      });
    });
  }

  checkUploadComplete(successCount: number, errorCount: number, processedCount: number): void {
    if (processedCount === this.carriers.length) {
      this.isLoading = false;
      
      if (errorCount === 0) {
        this.message = `Successfully uploaded ${successCount} carriers!`;
        this.isSuccess = true;
        
        // Reset form and redirect after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/list-carrier']);
        }, 3000);
      } else {
        this.message = `Upload completed: ${successCount} successful, ${errorCount} failed.`;
        this.isSuccess = successCount > 0;
      }
    }
  }

  closeValidationErrors(): void {
    this.showValidationErrors = false;
    this.resetState();
    this.selectedFile = null;
    // Reset file input
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
}