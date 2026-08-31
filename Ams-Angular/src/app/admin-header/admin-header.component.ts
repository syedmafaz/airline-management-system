import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  title: string = 'EasyGo Airlines Management System';
  subtitle: string = 'Administrator Dashboard';
}