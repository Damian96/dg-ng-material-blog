import { createAction, props } from "@ngrx/store";

export const showSnackbar = createAction(
  '[Snackbar] Show',
  props<{ message: string }>()
);
