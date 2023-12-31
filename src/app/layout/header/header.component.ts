import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isLoggedIn: boolean = false;
  userEmail: string | null = '';

  constructor(private _authService: AuthService, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this._authService.isUserReady()
      .subscribe(() => {
        this.isLoggedIn = this._authService.isLoggedIn();
        if (this._authService.user != null && this.isLoggedIn) {
          this.userEmail = this._authService.user!.email;
        }
      });

    this._authService.authStateChanged$.subscribe((authState: boolean) => {
      this.isLoggedIn = authState;
      this._cdr.detectChanges();
    });
  }
}
