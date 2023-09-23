import { createSelector } from '@ngrx/store';
import { AppState } from "../models/app.state";


export const selectUser = (state: AppState) => state.user;

export const selectUserId = createSelector(
  selectUser,
  (user) => user ? user.uid : null
);
export const selectUserEmail = createSelector(
  selectUser,
  (user) => user ? user.email : null
);
