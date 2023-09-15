import { User } from "@angular/fire/auth";
import { AbstractControl, ValidatorFn } from "@angular/forms";

export class Post {
  id: string | null;
  creator: string;
  title: string = '';
  content: string = '';
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  category: categoryType = null;

  constructor(id: string | null = '0', creator: string, title?: string, content?: string, cat?: categoryType) {
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