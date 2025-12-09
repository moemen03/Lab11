import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-md mx-auto p-6">
      <h1 class="text-2xl font-semibold mb-4">Sign Up</h1>
      <form class="space-y-4" (ngSubmit)="submit()">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60" [(ngModel)]="name" name="name" type="text" [disabled]="loading" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60" [(ngModel)]="email" name="email" type="email" [disabled]="loading" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60" [(ngModel)]="password" name="password" type="password" [disabled]="loading" required />
        </div>
        <button class="inline-flex items-center rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60" type="submit" [disabled]="loading">
          <span *ngIf="!loading">Create account</span>
          <span *ngIf="loading">Loading...</span>
        </button>
      </form>
    </div>
  `,
})
export class SignupComponent {
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  name = '';
  email = '';
  password = '';
  error = '';
  loading = false;

  submit() {
    this.error = '';
    this.loading = true;
    this.auth.register(this.name, this.email, this.password)
      .pipe(finalize(() => { this.loading = false; }))
      .subscribe({
      next: (res) => {
        if (res?.status === 'success') {
          this.router.navigateByUrl('/login');
        } else {
          const msg = (res as any)?.message;
          const errs = (res as any)?.errors;
          const firstError = errs ? Object.values(errs).flat()?.[0] : undefined;
          const message = msg || firstError || 'Sign up failed';
          this.toast.error(message);
          
        }
      },
      error: (err) => {
        const body = err?.error;
        const msg = body?.message;
        const errs = body?.errors;
        const firstError = errs ? Object.values(errs).flat()?.[0] : undefined;
        const message = msg || firstError || 'Sign up failed';
        this.toast.error(message);
        
      },
    });
  }
}
