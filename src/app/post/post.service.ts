import { Injectable } from '@angular/core';

import * as store from "store";
import { Post } from "../shared/models/post.model";
import { User } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _storageKey: string = 'materialBlogPosts';
  posts: Array<Post> = [];

  constructor() {
    this.loadPostsFromLocalStorage();

  }

  /* Read & Write to LocalStorage */
  private loadPostsFromLocalStorage(): void {
    const postsData = store.get(this._storageKey);

    if (postsData) {
      this.posts = JSON.parse(postsData)
        .map((data:
          { id: string, creator: string, title: string, content: string, createdAt: Date, updatedAt: Date }
        ) => new Post(data.id, data.creator, data.title, data.content));
    }
  }

  private savePostsToLocalStorage(): void {
    store.set(this._storageKey, JSON.stringify(this.posts));
  }

  /* CRUD */
  getAllPosts(): Post[] {
    // Return a copy of the posts array to prevent direct modification.
    return this.posts.slice();
  }

  getPostById(id: string): Post | undefined {
    return this.posts.find(post => post.id === id);
  }

  addPost(post: Post): void {
    // post.id = generatePostUID();

    this.posts.push(post);
    this.savePostsToLocalStorage();
  }

  updatePost(updatedPost: Post): void {
    const index = this.posts.findIndex(post => post.id === updatedPost.id);

    if (index !== -1) {
      this.posts[index] = { ...updatedPost };
    }
    this.savePostsToLocalStorage();
  }

  deletePost(id: string): void {
    const index = this.posts.findIndex(post => post.id === id);

    if (index !== -1) {
      this.posts.splice(index, 1);
    }
    this.savePostsToLocalStorage();
  }

  // generateDummyPosts(): void {
  //   store.set(this._storageKey, JSON.stringify(mockPosts));
  // }
}
