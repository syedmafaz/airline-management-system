import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

interface LoginResponse {
  token: string;
  message: string;
  role: string;

  // Add these additional fields:
  userId: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  userPassword: string;
  userProfile: string;
  userProfileImage: string;

  // Optional: full user object if your backend sends it
  user?: any;
}


interface UserData {
  userName: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = `${environment.apiUrl}/user`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, message: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }

  loginUser(data: UserData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, data, this.httpOptions).pipe(
      tap((response) => {
        if (response.token) {
          this.authService.setAuthToken(response.token);
          this.authService.setRole(response.role);
          this.authService.setUserId(response.userId);
          this.authService.setUserName(response.userName);
          this.authService.setUserEmail(response.userEmail);
          this.authService.setUserPhone(response.userPhone);
          this.authService.setUserAddress(response.userAddress);
          this.authService.setUserPassword(response.userPassword);
          
        }
      }),
      catchError(this.handleError)
    );
  }

  registerUser(data: UserData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/register`, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(`${this.baseUrl}/getAll`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getUserProfile(userId: number): Observable<UserData> {
    return this.http.get<UserData>(`${this.baseUrl}/get/${userId}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateUserProfile(userId: number, userData: UserData): Observable<UserData> {
    return this.http.put<UserData>(`${this.baseUrl}/update/${userId}`, userData, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${userId}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  changePassword(userId: number, passwords: { currentPassword: string, newPassword: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/change-password/${userId}`, passwords, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  resetPassword(userId: number, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reset-password/${userId}`, { newPassword }, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getAuthToken(): string | null {
    return this.authService.getAuthToken();
  }
}