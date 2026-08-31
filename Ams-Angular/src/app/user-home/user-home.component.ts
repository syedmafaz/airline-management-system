import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  username: string = 'User';

  ngOnInit(): void {
    const storedUsername = localStorage.getItem('userName');
    if (storedUsername) {
      this.username = storedUsername;
    }
  }
}
