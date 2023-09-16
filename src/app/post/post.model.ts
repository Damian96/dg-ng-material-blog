import { AbstractControl, ValidatorFn } from "@angular/forms";
import { User } from "firebase/auth";
import { Like } from "../likes/like.model";

export class Post {
  id: string | null;
  creator: User;
  title: string = '';
  content: string = '';
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  category: categoryType = null;
  image: string = '';
  likes: Like[] = [];

  lastLikeLocation: number = -1;

  constructor(
    id: string | null = '0',
    creator: User, title?: string,
    content?: string,
    cat?: categoryType,
    image?: string,
    likes?: Like[],
    created_at?: Date,
    updated_at?: Date,
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

    if (likes)
      this.likes = likes;
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