import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  // Inject the AuthService
  const authService = inject(AuthService);
 
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (authService.isLoggedInGuard) {
    console.log('Access Granted');
    return true;
  } else {
    toastr.warning('Please login to proceed.');
    return router.createUrlTree(['/login']);  
  }
};
