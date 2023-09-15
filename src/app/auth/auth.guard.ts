import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._authService.isUserReady().pipe(
      take(1), // Take only the first value (once the auth state is ready)
      switchMap(() => {
        // Check if user is authenticated or not
        if (this._authService.isLoggedIn()) {
          return of(true); // Allow access if authenticated
        } else {
          // Redirect to the login page or another page if not authenticated
          this.router.navigate(['/login']);
          return of(false);
        }
      })
    );
  }
}
