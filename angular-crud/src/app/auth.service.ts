import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http: HttpClient;
  private readonly api = 'http://127.0.0.1:8000/api';
  readonly token = signal<string | null>(localStorage.getItem('token'));

  constructor(http: HttpClient) {
    this.http = http;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token.set(token);
  }

  clearToken() {
    localStorage.removeItem('token');
    this.token.set(null);
  }

  register(name: string, email: string, password: string) {
    return this.http.post<{ status: string; user?: unknown; message?: string; errors?: Record<string, string[]> }>(`${this.api}/register`, {
      name,
      email,
      password,
    });
  }

  login(email: string, password: string) {
    return this.http.post<{ status: string; token?: string; user?: unknown; message?: string; errors?: Record<string, string[]> }>(`${this.api}/login`, {
      email,
      password,
    });
  }

  logout() {
    return this.http.post<void>(`${this.api}/logout`, {});
  }
}
