import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';
import { User } from "@firebase/auth";
import { AppState } from "../models/app.state";

export interface AuthState {
  user: User | null;
  message: string | null,
  email: string | null,
  password: string | null,
}

export const initialAuthState: AuthState = {
  user: null,
  email: null,
  password: null,
  message: null
};

const _authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, { email, password }) => ({
    ...state,
    email,
    password,
  })
  ),
  on(AuthActions.loginFailure, (state, { message }) => ({
    ...state,
    message
  })),
  on(AuthActions.loginSuccess, (state, { user, message }) => ({
    ...state,
    user,
    message
  })),
  on(AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
  }))
);

export function authReducer(state: AuthState | undefined, action: any) {
  return _authReducer(state, action);
}
