import { Injectable } from "@angular/core";

import { FirebaseApp } from "@angular/fire/app";
import { browserLocalPersistence, setPersistence } from "@angular/fire/auth";
import { Router } from "@angular/router";

import { signOut, getAuth, Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | null = null;
  #auth: Auth;

  showLoginButton = false;
  showLogoutButton = false;

  /**
   *
   * @param firebaseProvider !!IMPORTANT!! DO NOT REMOVE THE PROVIDER
   */
  constructor(private firebaseProvider: FirebaseApp, private _router: Router) {
    this.#auth = getAuth(this.firebaseProvider);
  }

  isUserReady(): Observable<void> {
    return from(this.#auth.authStateReady());
  }

  register(email: string, password: string): Observable<User | false> {
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

  login(email: string, password: string): Observable<User | false> {
    return from(
      signInWithEmailAndPassword(this.#auth, email, password)
    ).pipe((map((userCredential) => {
      this.user = userCredential.user;
      return userCredential.user;
    })));
  }

  logout(): void {
    signOut(this.#auth).then(() => {
      this._router.navigateByUrl('/post-list');
    });
  }
}
