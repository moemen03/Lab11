import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 space-y-2 z-50">
      <div *ngFor="let t of toasts()" class="min-w-[240px] px-4 py-2 rounded shadow-sm border text-sm"
           [class.bg-green-50]="t.type === 'success'" [class.border-green-200]="t.type === 'success'" [class.text-green-800]="t.type === 'success'"
           [class.bg-rose-50]="t.type === 'error'" [class.border-rose-200]="t.type === 'error'" [class.text-rose-800]="t.type === 'error'">
        {{ t.message }}
      </div>
    </div>
  `,
})
export class ToastComponent {
  private readonly toast = inject(ToastService);
  readonly toasts = this.toast.toasts;
}

