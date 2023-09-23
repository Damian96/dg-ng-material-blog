import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";

import * as AuthActions from '../ngrx/actions/auth.action';
import * as SnackbarActions from '../ngrx/actions/snackbar.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z0-9]{4,}/g)])
  });

  constructor(private _store: Store) { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this._store.dispatch(AuthActions.login({ email: email, password: password }));
      return;
    } else {
      this._store.dispatch(SnackbarActions.showSnackbar({ message: 'The Form is invalid' }));
    }
  }
}
