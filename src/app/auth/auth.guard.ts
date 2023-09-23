import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import { Observable, map, take } from 'rxjs';
import { getLoggedIn } from './ngrx/selectors/user.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _store: Store,
    private _router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._store.select(getLoggedIn)
      .pipe(
        take(1),
        map((loggedIn: boolean) => {
          console.log(loggedIn);
          if (loggedIn) {
            return true;
          } else {
            this._router.navigate(['/login']);
            return false;
          }
        })
      )
  }
}
