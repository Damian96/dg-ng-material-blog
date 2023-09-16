import { Injectable } from '@angular/core';
import { Like } from "./like.model";
import { Post } from "../post/post.model";
import { AuthService } from "../auth/auth.service";
import { PostService } from "../post/post.service";
import { User } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private _authService: AuthService, private _postsService: PostService) { }

  getPostsLikes(post: Post): Like[] { return [] }

  addLike(post: Post): void {
    post.likes.push(new Like(this._authService.user.uid, post.id));
    this._postsService.updatePost(post);
  }

  removeLike(post: Post, user: User = this._authService.user): void {
    let index = -1;
    post.likes.forEach((like, i) => {
      if (like.userId == user.uid) {
        index = i;
        return;
      }
    });
    post.likes.splice(index, 1);
    this._postsService.updatePost(post);
    return;
  }

  userHasLikedPost(post: Post, user: User = this._authService.user): boolean {
    for (let like of post.likes) {
      if (like.userId == user.uid) {
        return true;
      }
    }
    return false;
  }
}
