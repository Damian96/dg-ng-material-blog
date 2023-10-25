import { Component } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from '@ngrx/store';
import { AuthService } from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dg-ng-material-blog';

  finishedLoading: boolean = false;

  constructor(private _store: Store, private _authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this._authService.authState$.subscribe((user) => {
      if (user) {
        this._snackBar.open(`Welcome back, ${user.email}`, 'Dismiss', { duration: 1000 });
      } else {
        this._snackBar.open('Session Expired', 'Dismiss', { duration: 3000 })
      }
      this.finishedLoading = true;
    });
  }

}
