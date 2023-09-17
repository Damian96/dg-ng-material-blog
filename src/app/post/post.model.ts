import { AbstractControl, ValidatorFn } from "@angular/forms";
import { User } from "firebase/auth";
import { CommentTreeNode } from "../comments/comment.models";
import { Queue } from "js-sdsl";
import { AutoBind } from "../shared/autobind.decorator";

export class Post {
  id: string | null;
  creator: User;
  title: string = '';
  content: string = '';
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  category: categoryType = null;
  image: string = '';
  comments: CommentTreeNode | null;

  lastLikeLocation: number = -1;

  constructor(
    id: string | null = '0',
    creator: User,
    title?: string,
    content?: string,
    cat?: categoryType,
    image?: string,
    created_at?: Date,
    updated_at?: Date,
    comments?: CommentTreeNode,
  ) {
    if (id !== '0' && id !== null)
      this.id = id.toString();
    else
      this.id = generatePostUID();

    this.creator = creator;

    if (title)
      this.title = title;

    if (content)
      this.content = content;

    if (cat)
      this.category = cat;

    if (created_at)
      this.createdAt = created_at;

    if (updated_at)
      this.updatedAt = updated_at;

    if (image)
      this.image = image;

    if (comments)
      this.comments = comments;
  }
}

export type categoryType = 'gaming' | 'programming' | 'entertainment'
  | 'lifestyle' | 'movies' | 'other' | null;

export const categoryTypeArray: Array<string> = [
  'gaming', 'programming', 'entertainment', 'lifestyle', 'movies', 'other'
];

// Custom validator function
export function categoryValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value.toString();

    ; if (!categoryTypeArray.includes(value)) {
      // Value is not one of the allowed categories
      return { invalidCategory: true };
    }

    // Value is valid
    return null;
  };
}

export function generatePostUID() {
  const timestamp = new Date().getTime().toString(16); // Convert current timestamp to hexadecimal
  const randomPart = Math.random().toString(16).substr(2, 8); // Generate a random hexadecimal string

  return `${timestamp}-${randomPart}`;
}

export type sortingAlgos = 'titleAsc' | 'titleDesc';

export class PostPriorityQueue {

  algo: sortingAlgos = 'titleAsc';
  posts: Queue<Post> = new Queue<Post>();
  private _postsArr: Post[];

  constructor(posts: Post[], algo?: sortingAlgos) {
    this.algo = algo;
    this._postsArr = posts.sort(this.comparator);
    this._arrayToQueue();
  }

  add(post: Post): void {
    this.posts.push(post);
    this._postsArr.push(post);
    this._postsArr = this._postsArr.sort(this.comparator); // Maintain the sorting order
    this._arrayToQueue();
  }

  getPostsArray(): Post[] {
    return this._postsArr.slice();
  }

  private _arrayToQueue() {
    this.posts.clear();
    for (let item of this._postsArr) {
      this.posts.push(item);
    }
  }

  private comparator = (postA: Post, postB: Post): number => {
    const titleA = postA.title.toLowerCase();
    const titleB = postB.title.toLowerCase();
    switch (this.algo) {
      case 'titleAsc':
        if (titleA < titleB)
          return -1;
        if (titleA > titleB)
          return 1;
        return 0;
      case 'titleDesc':
        if (titleA < titleB)
          return 1;
        if (titleA > titleB)
          return -1;
        return 0;
    }
  }
}
