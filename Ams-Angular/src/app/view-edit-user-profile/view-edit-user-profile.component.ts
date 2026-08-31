// import { Component, OnInit } from '@angular/core';
// import { UserService, UserSignup } from '../services/user.service';

// @Component({
//   selector: 'app-view-edit-user-profile',
//   templateUrl: './view-edit-user-profile.component.html',
//   styleUrls: ['./view-edit-user-profile.component.css']
// })
// export class ViewEditUserProfileComponent implements OnInit {
//   user: UserSignup | null = null;
//   isEditMode: boolean = false;
//   message: string = '';
//   loading: boolean = true;

//   editableFields: string[] = [
//     'userName', 'password', 'phone', 'emailId',
//     'address1', 'address2', 'city', 'state', 'country',
//     'zipCode', 'dob'
//   ];

//   constructor(private userService: UserService) {}

//   ngOnInit(): void {
//     console.log('ViewEditUserProfileComponent initialized');
//     this.loadUserData();
//   }

//   loadUserData(): void {
//     // Try to get user data from localStorage first
//     const userData = localStorage.getItem('loggedInUser');
//     const userId = localStorage.getItem('userId');
    
//     console.log('Raw userData from localStorage:', userData);
//     console.log('User ID from localStorage:', userId);
    
//     if (userData) {
//       try {
//         this.user = JSON.parse(userData);
//         console.log('Parsed user data:', this.user);
//         this.loading = false;
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         this.loadUserFromBackend();
//       }
//     } else if (userId) {
//       // If no user data but we have userId, fetch from backend
//       this.loadUserFromBackend();
//     } else {
//       console.log('No user data or ID found in localStorage');
//       this.message = 'No user data found. Please log in again.';
//       this.loading = false;
//     }
//   }

//   loadUserFromBackend(): void {
//     const userId = localStorage.getItem('userId');
    
//     if (userId) {
//       this.userService.getUserById(parseInt(userId)).subscribe({
//         next: (userData) => {
//           this.user = userData;
//           console.log('User data loaded from backend:', this.user);
//           // Store in localStorage for future use
//           localStorage.setItem('loggedInUser', JSON.stringify(this.user));
//           this.loading = false;
//         },
//         error: (error) => {
//           console.error('Error loading user data from backend:', error);
//           this.message = 'Error loading user data. Please log in again.';
//           this.loading = false;
//         }
//       });
//     } else {
//       this.message = 'No user ID found. Please log in again.';
//       this.loading = false;
//     }
//   }

//   toggleEditMode(): void {
//     this.isEditMode = true;
//   }

//   getInputType(field: string): string {
//     return field === 'dob' ? 'date' : field === 'password' ? 'password' : 'text';
//   }

//   getLabel(field: string): string {
//     return field
//       .replace(/([A-Z])/g, ' $1')
//       .replace(/^./, (c) => c.toUpperCase());
//   }

//   getFieldValue(field: string): any {
//     const value = (this.user as any)?.[field];
//     // Convert date format if needed
//     if (field === 'dob' && value) {
//       // Convert from backend date format to input date format
//       const date = new Date(value);
//       return date.toISOString().split('T')[0];
//     }
//     return value || '';
//   }

//   setFieldValue(field: string, value: any): void {
//     if (this.user) {
//       (this.user as any)[field] = value;
//       console.log(`Set field ${field} to:`, value);
//     }
//   }

//   updateProfile(): void {
//     if (!this.user) {
//       console.error('No user data to update');
//       this.message = 'No user data to update';
//       return;
//     }

//     console.log('Updating profile with data:', this.user);
    
//     const userId = localStorage.getItem('userId');
    
//     if (userId) {
//       // Use the updateUser method instead of signup
//       this.userService.updateUser(parseInt(userId), this.user).subscribe({
//         next: () => {
//           this.message = 'Profile updated successfully!';
//           localStorage.setItem('loggedInUser', JSON.stringify(this.user));
//           this.isEditMode = false;
//           console.log('Profile updated successfully');
//         },
//         error: (error) => {
//           console.error('Error updating profile:', error);
//           this.message = 'Failed to update profile.';
//         }
//       });
//     } else {
//       this.message = 'User ID not found. Please log in again.';
//     }
//   }
// }



 // import { Component, OnInit } from '@angular/core';
// import { UserService, UserSignup } from '../services/user.service';

// @Component({
//   selector: 'app-view-edit-user-profile',
//   templateUrl: './view-edit-user-profile.component.html',
//   styleUrls: ['./view-edit-user-profile.component.css']
// })
// export class ViewEditUserProfileComponent implements OnInit {
//   user: UserSignup | null = null;
//   isEditMode: boolean = false;
//   message: string = '';
//   loading: boolean = true;

//   editableFields: string[] = [
//     'userName', 'password', 'phone', 'emailId',
//     'address1', 'address2', 'city', 'state', 'country',
//     'zipCode', 'dob'
//   ];

//   constructor(private userService: UserService) {}

//   ngOnInit(): void {
//     console.log('ViewEditUserProfileComponent initialized');
//     this.loadUserData();
//   }

//   loadUserData(): void {
//     // Try to get user data from localStorage first
//     const userData = localStorage.getItem('loggedInUser');
//     const userId = localStorage.getItem('userId');
    
//     console.log('Raw userData from localStorage:', userData);
//     console.log('User ID from localStorage:', userId);
    
//     if (userData) {
//       try {
//         this.user = JSON.parse(userData);
//         console.log('Parsed user data:', this.user);
//         this.loading = false;
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         this.loadUserFromBackend();
//       }
//     } else if (userId) {
//       // If no user data but we have userId, fetch from backend
//       this.loadUserFromBackend();
//     } else {
//       console.log('No user data or ID found in localStorage');
//       this.message = 'No user data found. Please log in again.';
//       this.loading = false;
//     }
//   }

//   loadUserFromBackend(): void {
//     const userId = localStorage.getItem('userId');
    
//     if (userId) {
//       this.userService.getUserById(parseInt(userId)).subscribe({
//         next: (userData) => {
//           this.user = userData;
//           console.log('User data loaded from backend:', this.user);
//           // Store in localStorage for future use
//           localStorage.setItem('loggedInUser', JSON.stringify(this.user));
//           this.loading = false;
//         },
//         error: (error) => {
//           console.error('Error loading user data from backend:', error);
//           this.message = 'Error loading user data. Please log in again.';
//           this.loading = false;
//         }
//       });
//     } else {
//       this.message = 'No user ID found. Please log in again.';
//       this.loading = false;
//     }
//   }

//   toggleEditMode(): void {
//     this.isEditMode = true;
//   }

//   getInputType(field: string): string {
//     return field === 'dob' ? 'date' : field === 'password' ? 'password' : 'text';
//   }

//   getLabel(field: string): string {
//     return field
//       .replace(/([A-Z])/g, ' $1')
//       .replace(/^./, (c) => c.toUpperCase());
//   }

//   getFieldValue(field: string): any {
//     const value = (this.user as any)?.[field];
//     // Convert date format if needed
//     if (field === 'dob' && value) {
//       // Convert from backend date format to input date format
//       const date = new Date(value);
//       return date.toISOString().split('T')[0];
//     }
//     return value || '';
//   }

//   setFieldValue(field: string, value: any): void {
//     if (this.user) {
//       (this.user as any)[field] = value;
//       console.log(`Set field ${field} to:`, value);
//     }
//   }

//   updateProfile(): void {
//     if (!this.user) {
//       console.error('No user data to update');
//       this.message = 'No user data to update';
//       return;
//     }

//     console.log('Updating profile with data:', this.user);
    
//     const userId = localStorage.getItem('userId');
    
//     if (userId) {
//       // Use the updateUser method instead of signup
//       this.userService.updateUser(parseInt(userId), this.user).subscribe({
//         next: () => {
//           this.message = 'Profile updated successfully!';
//           localStorage.setItem('loggedInUser', JSON.stringify(this.user));
//           this.isEditMode = false;
//           console.log('Profile updated successfully');
//         },
//         error: (error) => {
//           console.error('Error updating profile:', error);
//           this.message = 'Failed to update profile.';
//         }
//       });
//     } else {
//       this.message = 'User ID not found. Please log in again.';
//     }
//   }
// }




import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService, UserSignup } from '../services/user.service';

@Component({
 selector: 'app-view-edit-user-profile',
 templateUrl: './view-edit-user-profile.component.html',
 styleUrls: ['./view-edit-user-profile.component.css']
})
export class ViewEditUserProfileComponent implements OnInit {
 userForm!: FormGroup;
 user: UserSignup | null = null;
 isEditMode: boolean = false;
 message: string = '';
 loading: boolean = true;

 constructor(private fb: FormBuilder, private userService: UserService) {}

 ngOnInit(): void {
 this.loadUserData();
 }

 initForm(): void {
 this.userForm = this.fb.group({
 userName: [this.user?.userName, [Validators.required, Validators.pattern(/^[A-Za-z].*$/)]],
 password: [this.user?.password],
 confirmPassword: [''],
 phone: [this.user?.phone, [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
 emailId: [this.user?.emailId, [Validators.required, Validators.email]],
address1: [this.user?.address1],
 address2: [this.user?.address2],
 city: [this.user?.city, [Validators.pattern(/^[A-Za-z\s]+$/)]],
 state: [this.user?.state, [Validators.pattern(/^[A-Za-z\s]+$/)]],
 country: [this.user?.country, [Validators.pattern(/^[A-Za-z\s]+$/)]],
 zipCode: [this.user?.zipCode, [Validators.required, Validators.pattern(/^\d{5,6}$/)]],
 dob: [this.user?.dob, [this.validateDob]]
 }, { validators: this.passwordMatchValidator });
 }


 editableFields: string[] = [
  'userName', 'password', 'phone', 'emailId',
  'address1', 'address2', 'city', 'state', 'country',
  'zipCode', 'dob'
];

getInputType(field: string): string {
  return field === 'dob' ? 'date' : field === 'password' ? 'password' : 'text';
}

getLabel(field: string): string {
  return field.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
}

getFieldValue(field: string): any {
  const value = (this.user as any)?.[field];
  if (field === 'dob' && value) {
    return new Date(value).toISOString().split('T')[0];
  }
  return value || '';
}

setFieldValue(field: string, value: any): void {
  if (this.user) {
    (this.user as any)[field] = value;
  }
}


 // Custom validator for password confirmation
 passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
 const password = group.get('password')?.value;
 const confirmPassword = group.get('confirmPassword')?.value;
 if (password && confirmPassword && password !== confirmPassword) {
 return { passwordMismatch: true };
 }
 return null;
 }

 // Custom validator for DOB
 validateDob(control: AbstractControl): ValidationErrors | null {
 const dob = new Date(control.value);
 const today = new Date();
 if (dob >= today) {
 return { invalidDob: true };
 }
 return null;
 }

 loadUserData(): void {
 const userData = localStorage.getItem('loggedInUser');
 const userId = localStorage.getItem('userId');

 if (userData) {
 try {
 this.user = JSON.parse(userData);
 this.initForm();
 this.loading = false;
} catch (error) {
 this.loadUserFromBackend();
 }
 } else if (userId) {
 this.loadUserFromBackend();
 } else {
 this.message = 'No user data found. Please log in again.';
 this.loading = false;
 }
 }

 loadUserFromBackend(): void {
 const userId = localStorage.getItem('userId');
 if (userId) {
 this.userService.getUserById(parseInt(userId)).subscribe({
 next: (data) => {
 this.user = data;
 this.initForm();
localStorage.setItem('loggedInUser', JSON.stringify(this.user));
 this.loading = false;
 },
error: () => {
 this.message = 'Error loading user data.';
 this.loading = false;
}
 });
 }
 }

 toggleEditMode(): void {
 this.isEditMode = true;
 this.userForm.get('confirmPassword')?.setValidators(Validators.required);
 this.userForm.get('confirmPassword')?.updateValueAndValidity();
 }

 updateProfile(): void {
 if (this.userForm.invalid) {
 this.message = 'Please correct form errors before submitting.';
 return;
 }

 const userId = localStorage.getItem('userId');
 if (userId) {
 this.userService.updateUser(parseInt(userId), this.userForm.value).subscribe({
next: () => {
 this.message = 'Profile updated successfully!';
 localStorage.setItem('loggedInUser', JSON.stringify(this.userForm.value));
this.isEditMode = false;
 },
error: () => {
this.message = 'Failed to update profile.';
 }
 });
 }
 }

 // Helper for validation messages
get f() {
 return this.userForm.controls;
 }
}