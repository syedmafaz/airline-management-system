import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  adminId: string = '';
  adminPassword: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const loginData = {
      adminId: this.adminId,
      adminPassword: this.adminPassword
    };

    this.http.post<any>('http://localhost:8080/api/admin/login', loginData)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.router.navigate(['/admin-home']);
          } else {
            this.message = res.message;
          }
        },
        error: (err) => {
          this.message = 'Login failed. Please try again.';
          console.error(err);
        }
      });
  }
}
