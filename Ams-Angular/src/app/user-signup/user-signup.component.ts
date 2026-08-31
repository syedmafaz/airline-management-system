// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UserService, UserSignup } from '../services/user.service';
// import { catchError, of } from 'rxjs';

// @Component({
//   selector: 'app-user-signup',
//   templateUrl: './user-signup.component.html',
//   styleUrls: ['./user-signup.component.css']
// })
// export class UserSignupComponent implements OnInit {
//   signupForm!: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private userService: UserService
//   ) {}

//   ngOnInit(): void {
//     this.signupForm = this.fb.group({
//       userName: ['', [Validators.required, Validators.minLength(3)]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
//       emailId: ['', [Validators.required, Validators.email]],
//       address1: [''],
//       address2: [''],
//       city: [''],
//       state: [''],
//       country: [''],
//       zipCode: ['', Validators.pattern('^[0-9]{6}$')],
//       dob: ['', Validators.required],
//       role: ['Customer', Validators.required]
//     });
//   }

//   minimumDateValidator(minDate: Date) {
//     return (control: any) => {
//     const value = control.value;
//     if (!value) return null;
//     const selectedDate = new Date(value);
//     return selectedDate >= minDate ? null : { tooOld: true };
//     };
//     }
    
//     getErrorMessage(controlName: string): string {
//      const control = this.signupForm.get(controlName);
//      if (!control || !control.errors) return '';
    
//     if (control.errors['required']) return `${controlName} is required`;
    
//      if (controlName === 'userName') {
//      if (control.errors['minlength']) return 'Name must be at least 6 characters long';
//      }
    
//      if (controlName === 'password') {
//       // if (control.errors['pattern']) return 'Password must start with a letter. Special characters @ digits allowed only after.';
//       if(control.errors['required']) return 'Password is required';
//      if (control.errors['minlength']) return 'Password must be at least 6 characters';
//      if (control.errors['pattern']) return 'Password must start with a letter. Special characters @ digits allowed only after.';
     
//      }
    
//      if (controlName === 'phone') {
//       if(control.errors['required']) return 'Phone Number is required';
//      if (control.errors['pattern']) return 'Phone must start with 6–9 and be 10 digits';
    
//      }
    
//      if (controlName === 'emailId') {
//      if (control.errors['email']) return 'Invalid email format';
//      }
    
//      if (controlName === 'zipCode') {
//      if (control.errors['pattern']) return 'Zip must be 5 or 6 digits';
//      }
    
//      if (controlName === 'dob') {
//      if (control.errors['tooOld']) return 'DOB must be after 1927';
//      }
    
//      return 'Invalid input';
//      }

//   onSubmit(): void {
//     if (this.signupForm.valid) {
//       const formData: UserSignup = this.signupForm.value;
//       this.userService.signup(formData)
//         .pipe(
//           catchError(error => {
//             alert('Registration failed. Try again.');
//             return of(null);
//           })
//         )
//         .subscribe(res => {
//           if (res) {
//             alert('Registration successful! Please login.');
//             this.router.navigate(['/user-login']);
//           }
//         });
//     } else {
//       this.signupForm.markAllAsTouched();
//     }
//   }

//   // getErrorMessage(controlName: string): string {
//   //   const control = this.signupForm.get(controlName);
//   //   if (control?.errors && control.touched) {
//   //     if (control.errors['required']) {
//   //       return `${this.capitalize(controlName)} is required`;
//   //     }
//   //     if (control.errors['email']) return 'Enter a valid email';
//   //     if (control.errors['minlength']) {
//   //       return `${this.capitalize(controlName)} must be at least ${control.errors['minlength'].requiredLength} characters`;
//   //     }
//   //     if (control.errors['pattern']) {
//   //       if (controlName === 'phone') return 'Enter a valid 10-digit phone';
//   //       if (controlName === 'zipCode') return 'Enter a valid 6-digit zip code';
//   //     }
//   //   }
//   //   return '';
//   // }

//   private capitalize(text: string): string {
//     return text.charAt(0).toUpperCase() + text.slice(1);
//   }
// }


// // import { Component, OnInit } from '@angular/core';
// // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// // import { Router } from '@angular/router';

// // @Component({
// //  selector: 'app-user-signup',
// //  templateUrl: './user-signup.component.html',
// //  styleUrls: ['./user-signup.component.css']
// // })
// // export class UserSignupComponent implements OnInit {
// //  signupForm!: FormGroup;

// //  constructor(private fb: FormBuilder, private router: Router) {}

// //  ngOnInit(): void {
// //  this.signupForm = this.fb.group({
// //  userName: ['', [Validators.required, Validators.minLength(6)]],
// //  password: [
// //  '',
// //  [
// //  Validators.required,
// //  Validators.minLength(6),
// //  Validators.pattern('^[a-zA-Z][a-zA-Z0-9@]{5,}$') // must start with letter
// //  ]
// //  ],
// //  phone: [
// //  '',
// //  [
// // Validators.required,
// //  Validators.pattern('^[6-9][0-9]{9}$') 
 
// //  ]
// //  ],
// // emailId: ['', [Validators.required, Validators.email]],
// //  address1: [''],
// //  address2: [''],
// //  city: [''],
// //  state: [''],
// //  country: [''],
// // zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5,6}$/)]],
// // dob: [
// //  '',
// //  [
// //  Validators.required,
// //  this.minimumDateValidator(new Date('1927-01-01')) // block before 1927
// //  ]
// //  ],
// //  role: ['Customer']
// // });
// //  }


// // minimumDateValidator(minDate: Date) {
// // return (control: any) => {
// // const value = control.value;
// // if (!value) return null;
// // const selectedDate = new Date(value);
// // return selectedDate >= minDate ? null : { tooOld: true };
// // };
// // }

// // getErrorMessage(controlName: string): string {
// //  const control = this.signupForm.get(controlName);
// //  if (!control || !control.errors) return '';

// // if (control.errors['required']) return `${controlName} is required`;

// //  if (controlName === 'userName') {
// //  if (control.errors['minlength']) return 'Name must be at least 6 characters long';
// //  }

// //  if (controlName === 'password') {
// //   // if (control.errors['pattern']) return 'Password must start with a letter. Special characters @ digits allowed only after.';
// //   if(control.errors['required']) return 'Password is required';
// //  if (control.errors['minlength']) return 'Password must be at least 6 characters';
// //  if (control.errors['pattern']) return 'Password must start with a letter. Special characters @ digits allowed only after.';
 
// //  }

// //  if (controlName === 'phone') {
// //   if(control.errors['required']) return 'Phone Number is required';
// //  if (control.errors['pattern']) return 'Phone must start with 6–9 and be 10 digits';

// //  }

// //  if (controlName === 'emailId') {
// //  if (control.errors['email']) return 'Invalid email format';
// //  }

// //  if (controlName === 'zipCode') {
// //  if (control.errors['pattern']) return 'Zip must be 5 or 6 digits';
// //  }

// //  if (controlName === 'dob') {
// //  if (control.errors['tooOld']) return 'DOB must be after 1927';
// //  }

// //  return 'Invalid input';
// //  }

// //  onSubmit(): void {
// // if (this.signupForm.valid) {
// //  // submit logic
// //  console.log('User Registered:', this.signupForm.value);
// //  this.router.navigate(['/login']);
// //  }
// //  }
// // }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, UserSignup } from '../services/user.service';
import { catchError, of, debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  signupForm!: FormGroup;
  isEmailChecking = false;
  registrationSuccess = false;
  generatedUserId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      userName: ['', [
        Validators.required, 
        Validators.minLength(3),
        this.stringOnlyValidator,
        this.forbiddenValuesValidator(['null', 'n/a', 'na', 'none', 'undefined'])
      ]],
      emailId: ['', [Validators.required, Validators.email], [this.emailExistsValidator.bind(this)]],
      dob: ['', [Validators.required, this.ageValidator]],
      phone: ['', [
        Validators.required, 
        Validators.pattern('^[6-9][0-9]{9}$'),
        this.forbiddenPhoneValidator(['9876543210', '1234567890'])
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        this.passwordStrengthValidator
      ]],
      confirmPassword: ['', [Validators.required]],
      address1: ['', [this.stringOnlyValidator]],
      address2: ['', [this.stringOnlyValidator]],
      city: ['', [this.stringOnlyValidator]],
      state: ['', [this.stringOnlyValidator]],
      country: ['', [this.stringOnlyValidator]],
      zipCode: ['', [Validators.pattern('^[0-9]{5,6}$')]],
      role: ['Customer', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom Validators
  stringOnlyValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    
    const stringPattern = /^[a-zA-Z\s]+$/;
    return stringPattern.test(value) ? null : { stringOnly: true };
  }

  forbiddenValuesValidator(forbiddenValues: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.toLowerCase();
      if (!value) return null;
      
      return forbiddenValues.includes(value) ? { forbiddenValue: true } : null;
    };
  }

  ageValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }

    return age >= 18 ? null : { underAge: true };
  }
  getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

  forbiddenPhoneValidator(forbiddenNumbers: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      
      return forbiddenNumbers.includes(value) ? { forbiddenPhone: true } : null;
    };
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    // Password must contain at least one uppercase, one lowercase, one number, and one special character
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
    return valid ? null : { passwordStrength: true };
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Async Email Validator
  emailExistsValidator(control: AbstractControl) {
    if (!control.value || control.value.length < 5) {
      return of(null);
    }

    this.isEmailChecking = true;
    return of(control.value).pipe(
      debounceTime(500),
      switchMap(email => this.userService.validateEmail(email)),
      switchMap(exists => {
        this.isEmailChecking = false;
        return of(exists ? { emailExists: true } : null);
      }),
      catchError(() => {
        this.isEmailChecking = false;
        return of(null);
      })
    );
  }

  getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);
    if (!control || !control.errors) return '';

    const errors = control.errors;

    if (errors['required']) return `${this.formatFieldName(controlName)} is required`;

    switch (controlName) {
      case 'userName':
        if (errors['minlength']) return 'Name must be at least 3 characters long';
        if (errors['stringOnly']) return 'Name can only contain letters and spaces';
        if (errors['forbiddenValue']) return 'Name cannot be "null", "n/a", or similar values';
        break;

      case 'emailId':
        if (errors['email']) return 'Please enter a valid email format';
        if (errors['emailExists']) return 'This email is already registered';
        break;

      case 'dob':
        if (errors['underAge']) return 'User must be at least 18 years old to signup';
        break;

      case 'phone':
        if (errors['pattern']) return 'Phone must start with 6-9 and be exactly 10 digits';
        if (errors['forbiddenPhone']) return 'This phone number is not allowed';
        break;

      case 'password':
        if (errors['minlength']) return 'Password must be at least 8 characters';
        if (errors['passwordStrength']) return 'Password must contain uppercase, lowercase, number, and special character';
        break;

      case 'confirmPassword':
        if (this.signupForm.errors?.['passwordMismatch']) return 'Passwords do not match';
        break;

      case 'zipCode':
        if (errors['pattern']) return 'Zip code must be 5-6 digits only';
        break;

      case 'address1':
      case 'address2':
      case 'city':
      case 'state':
      case 'country':
        if (errors['stringOnly']) return `${this.formatFieldName(controlName)} can only contain letters and spaces`;
        break;
    }

    return 'Invalid input';
  }

  formatFieldName(fieldName: string): string {
    const fieldMappings: { [key: string]: string } = {
      'userName': 'Name',
      'emailId': 'Email',
      'dob': 'Date of Birth',
      'phone': 'Phone Number',
      'password': 'Password',
      'confirmPassword': 'Confirm Password',
      'address1': 'Address Line 1',
      'address2': 'Address Line 2',
      'city': 'City',
      'state': 'State',
      'country': 'Country',
      'zipCode': 'Zip Code'
    };
    
    return fieldMappings[fieldName] || fieldName;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData: UserSignup = {
        ...this.signupForm.value,
        phone: this.signupForm.value.phone,
        zipCode: this.signupForm.value.zipCode
      };

      // Remove confirmPassword before sending
      delete (formData as any).confirmPassword;

      this.userService.signup(formData)
        .pipe(
          catchError(error => {
            alert('Registration failed. Please try again.');
            return of(null);
          })
        )
        .subscribe(res => {
          if (res && res.success) {
            this.registrationSuccess = true;
            this.generatedUserId = res.userId;
            // Auto redirect after 5 seconds
            setTimeout(() => {
              this.router.navigate(['/user-login']);
            }, 5000);
          }
        });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  redirectToLogin(): void {
    this.router.navigate(['/user-login']);
  }
}
