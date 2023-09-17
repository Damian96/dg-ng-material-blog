import { AbstractControl, ValidatorFn } from "@angular/forms";
import { User } from "firebase/auth";
import { CommentTreeNode } from "../comments/comment.models";
import { Queue } from "js-sdsl";

export class Post {
  id: string | null;
  creator: User;
  title: string = '';
  content: string = '';
  createdAt: number;
  updatedAt: number;
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
    created_at?: number,
    updated_at?: number,
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
    else
      this.createdAt = new Date().getTime();

    if (updated_at)
      this.updatedAt = updated_at;
    else
      this.updatedAt = new Date().getTime();

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

export type sortingAlgos = 'titleAsc' | 'titleDesc' | 'dateCreatedAsc' | 'dateCreatedDesc';

export class PostPriorityQueue {

  algo: sortingAlgos = 'titleAsc';
  posts: Queue<Post> = new Queue<Post>();
  private _postsArr: Post[] = [];

  constructor(posts: Post[], algo?: sortingAlgos) {
    this.algo = algo;
    this._postsArr = posts;
    this.sort(algo);
    this._arrayToQueue();
  }

  add(post: Post): void {
    this.posts.push(post);
    this._postsArr.push(post);
    this.sort(this.algo);
  }

  getPostsArray(): Post[] {
    return this._postsArr.slice();
  }

  sort(algo: sortingAlgos): Post[] {
    this.algo = algo;
    this._postsArr.sort(this.comparator);
    this._arrayToQueue();
    return this._postsArr;
  }

  private _arrayToQueue() {
    this.posts.clear();
    for (let item of this._postsArr) {
      this.posts.push(item);
    }
  }

  private comparator = (postA: Post, postB: Post): number => {
    // console.log(this);
    // return 0;
    if (this.algo.includes('title')) {
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

    if (this.algo.includes('dateCreated')) {
      const dateA = postA.createdAt;
      const dateB = postB.createdAt;

      switch (this.algo) {
        case 'dateCreatedAsc':
          if (dateA < dateB)
            return -1;
          if (dateA > dateB)
            return 1;
          return 0;
        case 'dateCreatedDesc':
          if (dateA < dateB)
            return 1;
          if (dateA > dateB)
            return -1;
          return 0;
      }
    }

    return 0;
  }
}
