import { createSelector } from '@ngrx/store';
import { AppState } from "../models/app.state";
import { User } from "firebase/auth";


export const selectUser = (state: AppState): User | null => {
  // console.log(state);
  return state.auth ? state.auth.user : null;
};

export const selectFirebasUser = createSelector(
  selectUser,
  (user) => user ? user : null
);
export const selectUserId = createSelector(
  selectUser,
  (user) => user ? user.uid : null
);
export const selectUserEmail = createSelector(
  selectUser,
  (user) => user ? user.email : null
);
export const getLoggedIn = createSelector(
  selectUser,
  (user) => user != null
);
