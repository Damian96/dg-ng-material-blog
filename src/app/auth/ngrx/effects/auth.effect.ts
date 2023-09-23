import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import * as AuthActions from '../actions/auth.action';
import { MatSnackBar } from "@angular/material/snack-bar";
import { registerFailure } from '../actions/auth.action';

@Injectable()
export class AuthEffects {

  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }

  login$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) => this._authService.login(action.email, action.password)
        .pipe(
          map((user) => AuthActions.loginSuccess({ user, message: 'Login Successfull' })),
          catchError((error) => {
            return of(AuthActions.loginFailure({ message: error.toString() }));
          })
        )
      )
    )
  });

  loginSuccess$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map((action) => {
        console.info(action.message);
        this._snackBar.open(action.message, 'Dismiss');
        this._router.navigate(['/post-list']);
      })
    )
  }, { dispatch: false });

  loginFailure$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.loginFailure),
      map((action) => {
        console.error(action.message);
      })
    )
  }, { dispatch: false });

  logout$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.logout),
      map((action) => this._authService.logout(action.message))
    )
  }, { dispatch: false });

  register$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.register),
      switchMap((action) => this._authService.register(action.email, action.password)
        .pipe(
          map((user) => AuthActions.registerSuccess({ user, message: 'Successfully register' })),
          catchError((error) => of(AuthActions.registerFailure({ message: error.toString() })))
        ))
    )
  });

  registerSuccess$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.registerSuccess),
      map((action) => {
        console.info(action.message);
        this._snackBar.open(action.message, 'Dismiss');
        this._router.navigate(['/login']);
      })
    )
  }, { dispatch: false });

  registerFailure$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.registerSuccess),
      map((action) => {
        console.error(action.message);
        this._snackBar.open(action.message, 'Dismiss');
      })
    )
  }, { dispatch: false });
}
