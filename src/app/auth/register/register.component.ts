import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registrationForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z0-9]{6,}/g)])
  });

  constructor(private _authService: AuthService, private _snackBar: MatSnackBar, private _router: Router) { }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    this._authService.register(this.registrationForm.get('email')?.value, this.registrationForm.get('password')?.value)
      .subscribe((result: User | false) => {
        if (result !== false) {
          const message = 'You have successfully registered!';
          console.log(message);
          this._snackBar.open(message, 'OK');

          this._router.navigateByUrl('/login');
        }
      },
        (error) => {
          const message = 'Could not register!';
          this._snackBar.open(message, 'OK');
          console.error(message);
        });
  }
}
