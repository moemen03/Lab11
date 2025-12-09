import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error';
export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private counter = 1;
  readonly toasts = signal<Toast[]>([]);

  show(message: string, type: ToastType = 'success', durationMs = 3000) {
    const toast: Toast = { id: this.counter++, type, message };
    this.toasts.update((list) => [...list, toast]);
    setTimeout(() => this.dismiss(toast.id), durationMs);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  dismiss(id: number) {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
}

