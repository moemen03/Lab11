import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http: HttpClient;
  // write here the Api_Base_Url

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
    // return this.http.post<{ status: string; user?: unknown; message?: string; errors?: Record<string, string[]> }>(`${write here the baseUrL}/register`, {
    //   name,
    //   email,
    //   password,
    // });
  }

  login(email: string, password: string) {
    // return this.http.post<{ status: string; token?: string; user?: unknown; message?: string; errors?: Record<string, string[]> }>(`${write here the baseUrL}/login`, {
    //   email,
    //   password,
    // });
  }

  logout() {
    // return this.http.post<void>(`${write here the baseUrL}/logout`, {});
  }
}
