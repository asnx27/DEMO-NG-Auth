import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {
  message$ = new BehaviorSubject<string | null>(null);
  type$ = new BehaviorSubject<'success' | 'error'>('success');

  showSuccess(message: string) {
    this.type$.next('success');
    this.message$.next(message);
    this.autoHide();
  }

  showError(message: string) {
    this.type$.next('error');
    this.message$.next(message);
    this.autoHide();
  }

  private autoHide() {
    setTimeout(() => {
      this.message$.next(null);
    }, 3000); // Hide after 3 seconds
  }
}
