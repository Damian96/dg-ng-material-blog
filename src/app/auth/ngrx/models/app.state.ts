import { User } from "firebase/auth";
import { Post } from "src/app/post/post.model";

export interface AppState {
  user: User;
  posts: Post[];
}
