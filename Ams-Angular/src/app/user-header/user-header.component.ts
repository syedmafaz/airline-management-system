import { Component } from '@angular/core';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent {
  title : string = 'EasyGo Airlines Management System';
  subtitle : string = 'User Dashboard';
}