import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { register } from '../ngrx/actions/auth.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registrationForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z0-9]{4,}/g)])
  });

  constructor(private _store: Store, private _snackBar: MatSnackBar, private _router: Router) { }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const { email, password } = this.registrationForm.value;
      this._store.dispatch(register({ email: email, password }));
    }
  }
}
