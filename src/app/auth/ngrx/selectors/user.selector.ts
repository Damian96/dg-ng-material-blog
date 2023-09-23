import { createSelector } from '@ngrx/store';
import { AppState } from "../models/app.state";


export const selectUser = (state: AppState) => {
  console.log(state);
  return state.auth ? state.auth.user : null;
};

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
