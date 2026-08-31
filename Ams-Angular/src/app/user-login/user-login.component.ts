// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { LoginService } from '../services/login.service';
// import { finalize } from 'rxjs/operators';

// @Component({
//   selector: 'app-user-login',
//   templateUrl: './user-login.component.html',
//   styleUrls: ['./user-login.component.css']
// })
// export class UserLoginComponent {
//   userName: string = '';
//   password: string = '';
//   errorMsg: string = '';
//   isLoading: boolean = false;

//   constructor(private loginService: LoginService, private router: Router) {}

//   onLogin() {
//     if (!this.userName || !this.password) {
//       this.errorMsg = 'Please enter both user ID and password';
//       return;
//     }

//     this.errorMsg = '';
//     this.isLoading = true;

//     this.loginService.loginUser({ userName: this.userName, password: this.password })
//       .pipe(finalize(() => this.isLoading = false))
//       .subscribe({
//         next: (response) => {
//           if (response && response.token) {
//             localStorage.setItem('authToken', response.token);
//             localStorage.setItem('userName', this.userName);

//             // Inside the onLogin method, change the navigation to:
//             if (response.role === 'Customer') {
//               this.router.navigate(['/user/home']);  // Updated path
//             } else {
//               this.errorMsg = 'Invalid user role';
//             }
//           } else {
//             this.errorMsg = 'Invalid response from server';
//           }
//         },
//         error: (error) => {
//           if (error?.status === 401) {
//             this.errorMsg = 'Invalid username or password';
//           } else if (error?.status === 0) {
//             this.errorMsg = 'Unable to connect to server. Please check your connection.';
//           } else {
//             this.errorMsg = error?.message || 'Login failed. Please try again.';
//           }
//         }
//       });
//   }

  
// }




// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { LoginService } from '../services/login.service';
// import { finalize } from 'rxjs/operators';

// @Component({
//   selector: 'app-user-login',
//   templateUrl: './user-login.component.html',
//   styleUrls: ['./user-login.component.css']
// })
// export class UserLoginComponent {
//   userName: string = '';
//   password: string = '';
//   errorMsg: string = '';
//   isLoading: boolean = false;

//   constructor(private loginService: LoginService, private router: Router) {}

//   onLogin() {
//     if (!this.userName || !this.password) {
//       this.errorMsg = 'Please enter both user ID and password';
//       return;
//     }

//     this.errorMsg = '';
//     this.isLoading = true;

//     this.loginService.loginUser({ userName: this.userName, password: this.password })
//       .pipe(finalize(() => this.isLoading = false))
//       .subscribe({
//         next: (response) => {
//           if (response && response.token) {
//             // Save user info in local storage
//             localStorage.setItem('authToken', response.token);
//             localStorage.setItem('userName', this.userName);
//             localStorage.setItem('userId', String(response.userId));
//             localStorage.setItem('loggedInUser', JSON.stringify(response.user));

//             // Redirect based on role
//             if (response.role === 'Customer') {
//               this.router.navigate(['/user/home']);
//             } else if (response.role === 'Admin') {
//               this.router.navigate(['/admin/dashboard']);
//             } else {
//               this.errorMsg = 'Invalid user role';
//             }
//           } else {
//             this.errorMsg = 'Invalid response from server';
//           }
//         },
//         error: (error) => {
//           if (error?.status === 401) {
//             this.errorMsg = 'Invalid username or password';
//           } else if (error?.status === 0) {
//             this.errorMsg = 'Unable to connect to server. Please check your connection.';
//           } else {
//             this.errorMsg = error?.message || 'Login failed. Please try again.';
//           }
//         }
//       });
//   }
// }



// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserService } from '../services/user.service';
// import { finalize } from 'rxjs/operators';

// // Define the correct interfaces for login
// interface EmailLoginRequest {
//   emailId: string;
//   password: string;
// }

// interface EmailLoginResponse {
//   success: boolean;
//   message?: string;
//   token?: string;
//   user?: any;
//   userId?: number;
//   role?: string;
// }

// @Component({
//   selector: 'app-user-login',
//   templateUrl: './user-login.component.html',
//   styleUrls: ['./user-login.component.css']
// })
// export class UserLoginComponent {
//   emailId: string = '';
//   password: string = '';
//   errorMsg: string = '';
//   isLoading: boolean = false;

//   constructor(private userService: UserService, private router: Router) {}

//   onLogin() {
//     if (!this.emailId || !this.password) {
//       this.errorMsg = 'Please enter both email and password';
//       return;
//     }

//     // Basic email validation
//     if (!this.isValidEmail(this.emailId)) {
//       this.errorMsg = 'Please enter a valid email address';
//       return;
//     }

//     this.errorMsg = '';
//     this.isLoading = true;

//     // Create login data object
//     const loginData: EmailLoginRequest = {
//       emailId: this.emailId,
//       password: this.password
//     };

//     // Use the existing login method but with email data
//     this.userService.loginWithEmail(loginData)
//       .pipe(finalize(() => this.isLoading = false))
//       .subscribe({
//         next: (response: any) => {
//           if (response && response.success) {
//             // Save user info in local storage
//             localStorage.setItem('authToken', response.token || '');
//             localStorage.setItem('userEmail', this.emailId);
//             localStorage.setItem('userId', String(response.userId));
//             localStorage.setItem('userName', response.user?.userName || '');
//             localStorage.setItem('userRole', response.role || 'Customer');
//             localStorage.setItem('loggedInUser', JSON.stringify(response.user));

//             // Redirect based on role
//             if (response.role === 'Customer') {
//               this.router.navigate(['/user/home']);
//             } else if (response.role === 'Admin') {
//               this.router.navigate(['/admin/dashboard']);
//             } else {
//               this.errorMsg = 'Invalid user role';
//             }
//           } else {
//             this.errorMsg = response.message || 'Invalid email or password';
//           }
//         },
//         error: (error) => {
//           console.error('Login error:', error);
//           if (error?.status === 401) {
//             this.errorMsg = 'Invalid email or password';
//           } else if (error?.status === 0) {
//             this.errorMsg = 'Unable to connect to server. Please check your connection.';
//           } else if (error?.status === 404) {
//             this.errorMsg = 'User not found. Please check your email address.';
//           } else {
//             this.errorMsg = error?.error?.message || 'Login failed. Please try again.';
//           }
//         }
//       });
//   }

//   private isValidEmail(email: string): boolean {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }

//   clearError() {
//     this.errorMsg = '';
//   }
// }




import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, LoginRequest } from '../services/user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  emailId: string = '';
  password: string = '';
  errorMsg: string = '';
  isLoading: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  onLogin() {
    if (!this.emailId || !this.password) {
      this.errorMsg = 'Please enter both email and password';
      return;
    }

    // Basic email validation
    if (!this.isValidEmail(this.emailId)) {
      this.errorMsg = 'Please enter a valid email address';
      return;
    }

    this.errorMsg = '';
    this.isLoading = true;

    // Updated to use email instead of userName
    const loginData: LoginRequest = {
      emailId: this.emailId,
      password: this.password
    };

    this.userService.login(loginData)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response) => {
          if (response && response.success) {
            // Save user info in local storage
            localStorage.setItem('authToken', response.token || '');
            localStorage.setItem('userEmail', this.emailId);
            localStorage.setItem('userId', String(response.userId));
            localStorage.setItem('userName', response.user?.userName || '');
            localStorage.setItem('userRole', response.role || 'Customer');
            localStorage.setItem('loggedInUser', JSON.stringify(response.user));

            // Redirect based on role
            if (response.role === 'Customer') {
              this.router.navigate(['/user/home']);
            } else if (response.role === 'Admin') {
              this.router.navigate(['/admin/dashboard']);
            } else {
              this.errorMsg = 'Invalid user role';
            }
          } else {
            this.errorMsg = response.message || 'Invalid email or password';
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          if (error?.status === 401) {
            this.errorMsg = 'Invalid email or password';
          } else if (error?.status === 0) {
            this.errorMsg = 'Unable to connect to server. Please check your connection.';
          } else if (error?.status === 404) {
            this.errorMsg = 'User not found. Please check your email address.';
          } else {
            this.errorMsg = error?.error?.message || 'Login failed. Please try again.';
          }
        }
      });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  clearError() {
    this.errorMsg = '';
  }
}

