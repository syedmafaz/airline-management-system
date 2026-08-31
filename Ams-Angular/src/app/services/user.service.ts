// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';

// export interface UserSignup {
//   userId?: number;
//   userName: string;
//   password: string;
//   phone: string;  // Keep as string for form inputs, convert when needed
//   emailId: string;
//   address1: string;
//   address2: string;
//   city: string;
//   state: string;
//   country: string;  
//   zipCode: string;  // Keep as string for form inputs, convert when needed
//   dob: string;  // Keep as string for date inputs
//   role: string;
// }

// export interface LoginRequest {
//   userName: string;
//   password: string;
// }

// export interface LoginResponse {
//   token: string;
//   user?: UserSignup;
//   userId?: number;
//   role?: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private apiUrl = `${environment.apiUrl}/user`;

//   constructor(private http: HttpClient) {}

//   signup(userData: UserSignup): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, userData);
//   }

//   login(credentials: LoginRequest): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
//   }

//   validateEmail(email: string): Observable<boolean> {
//     return this.http.get<boolean>(`${this.apiUrl}/validate-email/${email}`);
//   }

//   validatePhone(phone: string): Observable<boolean> {
//     return this.http.get<boolean>(`${this.apiUrl}/validate-phone/${phone}`);
//   }

//   getUserById(id: number): Observable<UserSignup> {
//     return this.http.get<UserSignup>(`${this.apiUrl}/search/${id}`);
//   }

//   updateUser(id: number, userData: UserSignup): Observable<any> {
//     return this.http.put(`${this.apiUrl}/update/${id}`, userData);
//   }

//   getAllUsers(): Observable<UserSignup[]> {
//   return this.http.get<UserSignup[]>(`${this.apiUrl}/all`);
// }

// deleteUser(id: number): Observable<any> {
//   return this.http.delete(`${this.apiUrl}/delete/${id}`);
// }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserSignup {
  userId?: number;
  userName: string;
  password: string;
  phone: string;
  emailId: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  dob: string;
  role: string;
}

export interface LoginRequest {
  emailId: string;  // Changed from userName to emailId
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: UserSignup;
  userId?: number;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  signup(userData: UserSignup): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  validateEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/validate-email/${email}`);
  }

  validatePhone(phone: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/validate-phone/${phone}`);
  }

  getUserById(id: number): Observable<UserSignup> {
    return this.http.get<UserSignup>(`${this.apiUrl}/search/${id}`);
  }

  updateUser(id: number, userData: UserSignup): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, userData);
  }

  getAllUsers(): Observable<UserSignup[]> {
    return this.http.get<UserSignup[]>(`${this.apiUrl}/all`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  // New method for email-based authentication
  loginWithEmail(emailId: string, password: string): Observable<UserSignup | null> {
    return this.http.post<UserSignup | null>(`${this.apiUrl}/authenticate`, { emailId, password });
  }
}
