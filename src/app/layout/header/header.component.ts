import { Component, ChangeDetectorRef } from '@angular/core';
import { Store } from "@ngrx/store";
import * as AuthActions from "../../auth/ngrx/actions/auth.action";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isLoggedIn: boolean = false;

  constructor(private _store: Store, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this._store.select(AuthActions.login).subscribe(() => {
      this.isLoggedIn = true;
      this._cdr.detectChanges();
    });
    this._store.select(AuthActions.login).subscribe(() => {
      this.isLoggedIn = false;
      this._cdr.detectChanges();
    });
  }
}
