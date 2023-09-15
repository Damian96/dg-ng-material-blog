import { Component } from '@angular/core';
import { AuthService } from "../auth.service";

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "@angular/fire/auth";

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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


  constructor(private _authService: AuthService, private _snackBar: MatSnackBar) { }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      // Guard
      return;
    }

    this._authService
      .login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .subscribe((result: User | false) => {
        if (result !== false) {
          const message = 'You have successfully logged in!';
          console.log(message);
          this._snackBar.open(message, 'OK');
        }
      },
        (error) => {
          const message = 'Could not loggin with the specified credentials!';
          this._snackBar.open(message, 'OK');
          console.error(message);
        });
  }
}
