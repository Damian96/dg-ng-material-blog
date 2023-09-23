import { Post } from "src/app/post/post.model";
import { AuthState } from "../reducers/auth.reducer";

export interface AppState {
  auth: AuthState | undefined;
  posts?: Post[] | undefined;
}

export const initialAppState: AppState = {
  auth: undefined,
  posts: undefined
};
