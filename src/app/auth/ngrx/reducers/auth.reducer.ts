import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';
import { User } from "@firebase/auth";

export interface AuthState {
  user: User | null;
  message: string | null
}

const initialState: AuthState = {
  user: null,
  message: null
};

const _authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { email, password }) => ({
    initialState,
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
