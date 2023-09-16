import { Component } from '@angular/core';
import { AuthService } from "./auth/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dg-ng-material-blog';

  finishedLoading: boolean = false;

  constructor(private _authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this._authService.isUserReady().subscribe(() => {
      this.finishedLoading = true;

      if (this._authService.isLoggedIn()) {
        this._snackBar.open(`Welcome back, ${this._authService.user?.email}!`, 'Thanks!', {
          duration: 3000
        });
      }
    });
  }

}
