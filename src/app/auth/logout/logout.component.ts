import { Component } from '@angular/core';

import { Store } from "@ngrx/store";
import * as AuthActions from "../ngrx/actions/auth.action";
import { Router } from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {


  constructor(private _store: Store, private _router: Router) {
    this._store.dispatch(AuthActions.logout({ message: 'Farewell!' }));
  }


}
