import { Injectable } from "@angular/core";

import { FirebaseApp } from "@angular/fire/app";

import { signOut, getAuth, Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | null = null;
  #auth: Auth;

  constructor(private firebaseProvider: FirebaseApp) {
    this.#auth = getAuth();
  }

  showLoginButton = false;
  showLogoutButton = false;


  register(email: string, password: string): Observable<User | false> {
    return from(createUserWithEmailAndPassword(this.#auth, email, password))
      .pipe(map((userCredential) => {
        this.user = userCredential.user;
        return userCredential.user;
      }));
  }

  isLoggedIn(): boolean {
    return this.#auth.currentUser != null;
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
    signOut(this.#auth);
  }
}
