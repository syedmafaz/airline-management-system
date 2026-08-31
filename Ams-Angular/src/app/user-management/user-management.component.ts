import { Component, OnInit } from '@angular/core';
import { UserService, UserSignup } from '../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: UserSignup[] = [];
  message = '';
  showConfirmDialog = false;
  selectedUserId: number | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: data => this.users = data,
      error: err => this.message = 'Error fetching users'
    });
  }

  deleteUser(id: number): void {
    this.selectedUserId = id;
    this.showConfirmDialog = true;
  }

  confirmDelete(): void {
    if (this.selectedUserId !== null) {
      this.userService.deleteUser(this.selectedUserId).subscribe({
        next: res => {
          this.message = res.message || 'User deleted successfully';
          this.fetchUsers();
          this.resetDialog();
        },
        error: err => {
          this.message = 'Failed to delete user';
          this.resetDialog();
        }
      });
    }
  }

  cancelDelete(): void {
    this.resetDialog();
  }

  private resetDialog(): void {
    this.showConfirmDialog = false;
    this.selectedUserId = null;
  }
}
