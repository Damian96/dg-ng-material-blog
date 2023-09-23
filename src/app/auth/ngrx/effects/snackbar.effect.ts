import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap } from 'rxjs';
import * as SnackbarActions from '../actions/snackbar.action';

@Injectable()
export class SnackBarEffects {

  constructor(
    private _actions$: Actions,
    private _snackBar: MatSnackBar
  ) { }

  showSnackbar$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(SnackbarActions.showSnackbar),
        mergeMap((action) =>
          this._snackBar.open(action.message, 'Dismiss', { duration: 3000 }).onAction()
        )
      ),
    { dispatch: false }
  );
}
