import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const token = inject(AuthService).token();
  const router = inject(Router);
  return token ? true : router.createUrlTree(['/login']);
};

export const guestGuard: CanActivateFn = () => {
  const token = inject(AuthService).token();
  const router = inject(Router);
  return token ? router.createUrlTree(['/']) : true;
};

