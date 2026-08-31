import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }

  setAuthToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
    }
    this.isAuthenticatedSubject.next(true);
  }

  getAuthToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
    }
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/user-login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated$;
  }


  setRole(role: string): void {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('role', role);
  }
}

setUserId(userId: number): void {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('userId', String(userId));
  }
}

setUserName(userName: string): void {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('userName', userName);
  }
}

setUserEmail(userEmail: string): void {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('userEmail', userEmail);
  }
}

setUserPhone(userPhone: string): void {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('userPhone', userPhone);
  }
}

setUserAddress(userAddress: string): void {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('userAddress', userAddress);
  }
}

setUserPassword(userPassword: string): void {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('userPassword', userPassword);
  }
}

setUserProfile(userProfile: string): void {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('userProfile', userProfile);
  }
}

setUserProfileImage(userProfileImage: string): void {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('userProfileImage', userProfileImage);
  }
}

getRole(): string | null {
  if (isPlatformBrowser(this.platformId)) {
    return localStorage.getItem('role');
  }
  return null;
}

getUserId(): number | null {
  if (isPlatformBrowser(this.platformId)) {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : null;
  }
  return null;
}

getUserName(): string | null | undefined {
  if (isPlatformBrowser(this.platformId)) {
    return localStorage.getItem('userName');
  }
  return undefined;
}
}