import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToastComponent } from './toast.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterLink, RouterOutlet, ToastComponent],
  template: `
    <div class="min-h-screen bg-gray-50 text-gray-900">
      <nav class="bg-white border-b border-gray-200">
        <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <a routerLink="/" class="text-lg font-semibold">Angular CRUD</a>
          <div class="flex items-center gap-4">
            <a routerLink="/" class="text-sm text-gray-700 hover:text-indigo-600">Home</a>
            <a routerLink="/login" class="text-sm text-gray-700 hover:text-indigo-600" *ngIf="!token()">Login</a>
            <a routerLink="/signup" class="text-sm text-gray-700 hover:text-indigo-600" *ngIf="!token()">Sign Up</a>
            <button class="text-sm rounded-md bg-gray-100 px-3 py-1.5 hover:bg-gray-200" *ngIf="token()" (click)="logout()">Logout</button>
          </div>
        </div>
      </nav>
      <main>
        <router-outlet></router-outlet>
        <app-toast></app-toast>
      </main>
    </div>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-crud');
  private readonly auth = inject(AuthService);
  protected readonly token = this.auth.token;

  protected logout() {
    this.auth.logout().subscribe({
      next: () => this.auth.clearToken(),
      error: () => this.auth.clearToken(),
    });
  }
}
