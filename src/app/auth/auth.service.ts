import { Injectable } from "@angular/core";

import { FirebaseApp } from "@angular/fire/app";
import { Router } from "@angular/router";

import { Store } from "@ngrx/store";
import { Auth, User, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Observable, Subject, from, map } from 'rxjs';
import * as AuthActions from "./ngrx/actions/auth.action";
import * as SnackbarActions from "./ngrx/actions/snackbar.action";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | null = null;
  #auth: Auth;

  showLoginButton = false;
  showLogoutButton = false;

  authStateChanged: Subject<boolean> = new Subject();
  authStateChanged$: Observable<boolean> = this.authStateChanged.asObservable();

  /**
   *
   * @param firebaseProvider !!IMPORTANT!! DO NOT REMOVE THE PROVIDER
   */
  constructor(private firebaseProvider: FirebaseApp,
    private _router: Router,
    private _store: Store
  ) {
    this.#auth = getAuth(this.firebaseProvider);
  }

  isUserReady(): Observable<void> {
    return from(this.#auth.authStateReady());
  }

  register(email: string, password: string): Observable<User> {
    return from(createUserWithEmailAndPassword(this.#auth, email, password))
      .pipe(map((userCredential) => {
        this.user = userCredential.user;
        return userCredential.user;
      }));
  }

  isLoggedIn(): boolean {
    this.user = this.#auth.currentUser;
    return this.user != null;
  }

  login(email: string, password: string): Observable<User> | null {
    try {
      return from(
        signInWithEmailAndPassword(this.#auth, email, password)
      ).pipe((map((userCredential) => {
        const succMessage = 'You have successfully logged in!';
        this._store.dispatch(SnackbarActions.showSnackbar({ message: succMessage }));
        this._store.dispatch(AuthActions.loginSuccess({ user: userCredential.user, message: succMessage }));

        this.user = userCredential.user;
        return userCredential.user;
      })));
    } catch (error) {
      const errMessage = 'Could not loggin with the specified credentials!';
      this._store.dispatch(SnackbarActions.showSnackbar({ message: errMessage }));
      this._store.dispatch(AuthActions.loginFailure({ message: errMessage }));
      return null;
    }
  }

  logout(message: string): Promise<void> {
    return signOut(this.#auth).then(() => {
      this._router.navigateByUrl('/logout');
    });
  }
}
