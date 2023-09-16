import { Injectable } from '@angular/core';
import { Post } from "../post/post.model";
import { AuthService } from "../auth/auth.service";
import { PostService } from "../post/post.service";

import * as store from "store";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  /**
   * This approach provides efficient lookups and ensures that a user can only like a post once
   * (due to the uniqueness of Set elements).
   * It's suitable for scenarios where you need to track and display likes for posts.
   */
  private _postLikes = new Map<string, Set<string>>();

  private _storageKey: string = 'materialBlogPostLikes';

  constructor(private _authService: AuthService, private _postsService: PostService) {
    this._loadFromLocalStorage();
  }

  getPostLikes(post: Post): number {
    if (this._postLikes.has(post.id)) {
      return this._postLikes.get(post.id)!.size;
    }
    return 0;
  }

  likePost(post: Post, uid: string = this._authService.user.uid): void {
    if (!this._postLikes.has(post.id)) {
      this._postLikes.set(post.id, new Set<string>());
    }
    this._postLikes.get(post.id).add(uid);
    this._saveToLocalStorage();
  }

  unlikePost(post: Post, uid: string = this._authService.user.uid): void {
    if (this._postLikes.has(post.id)) {
      this._postLikes.get(post.id)!.delete(uid);
    }
    this._saveToLocalStorage();
  }

  isLikedByUser(post: Post, uid: string = this._authService.user.uid): boolean {
    if (this._postLikes.has(post.id)) {
      return this._postLikes.get(post.id).has(uid);
    }
    return false;
  }

  private _saveToLocalStorage() {
    const serializableMap = {};
    for (const [postId, userIdsSet] of this._postLikes) {
      serializableMap[postId] = Array.from(userIdsSet);
    }

    store.set(this._storageKey, JSON.stringify(serializableMap));
  }

  private _loadFromLocalStorage() {
    const postLikesData = store.get(this._storageKey);

    if (postLikesData) {
      try {
        const parsedData = JSON.parse(postLikesData);

        // Reconstruct the Map and Sets from the parsed data
        for (const postId in parsedData) {
          if (parsedData.hasOwnProperty(postId)) {
            const userIdsArray: string[] = parsedData[postId];
            const userIdsSet = new Set(userIdsArray);
            this._postLikes.set(postId, userIdsSet);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
