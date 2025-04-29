import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  currentPage = 1;
  usersPerPage = 55;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any>(
        'https://task-react-auth-backend.eapi.joincoded.com/api/auth/users'
      )
      .subscribe((res) => {
        this.users = res.users || res;
      });
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.usersPerPage;
    return this.users.slice(start, start + this.usersPerPage);
  }

  nextPage() {
    if (this.currentPage * this.usersPerPage < this.users.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
