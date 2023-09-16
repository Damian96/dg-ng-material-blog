import { Injectable } from '@angular/core';

import * as store from "store";
import { Post, categoryType } from "./post.model";
import { User } from "@angular/fire/auth";
import { FileRenderPipe } from "../pipes/file-render.pipe";
import { Like } from "../likes/like.model";


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _storageKey: string = 'materialBlogPosts';
  posts: Array<Post> = [];

  constructor(private _fileRenderPipe: FileRenderPipe) {
    this.loadPostsFromLocalStorage();
  }

  /* Read & Write to LocalStorage */
  private loadPostsFromLocalStorage(): void {
    const postsData = store.get(this._storageKey);

    if (postsData) {
      this.posts = JSON.parse(postsData)
        .map((data:
          { id: string, creator: User, title: string, content: string, category: categoryType, image: string, likes: Like[], createdAt: Date, updatedAt: Date }
        ) => new Post(data.id, data.creator, data.title, data.content, data.category, data.image, data.likes, data.createdAt, data.updatedAt));
    }
  }

  private savePostsToLocalStorage(): void {
    store.set(this._storageKey, JSON.stringify(this.posts));
  }

  /* Search Methods */
  filterPostsByTitle(keyword: string): Post[] {
    return this.getAllPosts().filter((post) => post.title.includes(keyword));
  }

  filterPostsByAuthor(keyword: string): Post[] {
    return this.getAllPosts().filter((post) => post.creator.email!.includes(keyword));
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

  convertFileToDataURL(file: File): Promise<string> {
    return this._fileRenderPipe.transform(file);
  }

  updatePost(updatedPost: Post): void {
    const index = this.posts.findIndex(post => post.id === updatedPost.id);

    if (index !== -1) {
      this.posts[index] = { ...updatedPost };
    } else {
      console.warn(`Could not update post with ID: ${updatedPost.id}`)
    }
    this.savePostsToLocalStorage();
    console.log(`Updated post with ID: ${updatedPost.id}...`);
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
