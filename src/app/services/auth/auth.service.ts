import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { AuthRequest, AuthResponse } from '../../interfaces/auth/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl =
    'https://task-react-auth-backend.eapi.joincoded.com/api';

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/login`, data)
      .pipe(
        tap((res) => this.setToken(res.token)),
        catchError((error) => {
          console.error('Login failed:', error);
          return throwError(() => error);
        })
      );
  }

  register(data: {
    name: string;
    email: string;
    password: string;
    image: File;
  }): Observable<AuthResponse> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('image', data.image);

    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/register`, formData)
      .pipe(
        tap((res) => this.setToken(res.token)),
        catchError((error) => {
          console.error('Registration failed:', error);
          return throwError(() => error);
        })
      );
  }

  private setToken(token: string) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    document.cookie = `token=${token}; path=/; expires=${expires.toUTCString()};`;
  }

  getToken(): string | null {
    const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
    return match ? match[2] : null;
  }

  getUserFromToken(): { email?: string; name?: string } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return { email: payload.email, name: payload.name };
    } catch {
      return null;
    }
  }

  logout() {
    document.cookie = 'token=; Max-Age=0; path=/;';
  }
}
