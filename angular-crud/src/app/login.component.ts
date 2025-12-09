import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-md mx-auto p-6">
      <h1 class="text-2xl font-semibold mb-4">Login</h1>
      <form class="space-y-4" (ngSubmit)="submit()">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60" [(ngModel)]="email" name="email" type="email" [disabled]="loading" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60" [(ngModel)]="password" name="password" type="password" [disabled]="loading" required />
        </div>
        <button class="inline-flex items-center rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60" type="submit" [disabled]="loading">
          <span *ngIf="!loading">Login</span>
          <span *ngIf="loading">Loading...</span>
        </button>
        <p class="text-sm text-rose-600" *ngIf="error">{{ error }}</p>
      </form>
    </div>
  `,
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  email = '';
  password = '';
  error = '';
  loading = false;

  submit() {
    this.error = '';
    this.loading = true;
    this.auth.login(this.email, this.password)
      .pipe(finalize(() => { this.loading = false; }))
      .subscribe({
      next: (res) => {
        if (res?.status === 'success' && res?.token) {
          this.auth.setToken(res.token);
          this.router.navigateByUrl('/');
        } else {
          const msg = (res as any)?.message;
          const errs = (res as any)?.errors;
          const firstError = errs ? Object.values(errs).flat()?.[0] : undefined;
          const message = msg || firstError || 'Login failed';
          this.error = message;
          this.toast.error(message);
        }
      },
      error: (err) => {
        const body = err?.error;
        const msg = body?.message;
        const errs = body?.errors;
        const firstError = errs ? Object.values(errs).flat()?.[0] : undefined;
        const message = msg || firstError || 'Login failed';
        this.error = message;
        this.toast.error(message);
      },
    });
  }
}
