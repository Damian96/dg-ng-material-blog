import { AbstractControl, ValidatorFn } from "@angular/forms";

export class Post {
  id: string | null;
  title: string = '';
  content: string = '';
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  category: categoryType = null;

  constructor(id: string | null = '0', title?: string, desc?: string, cat?: categoryType) {
    if (id !== '0' && id !== null)
      this.id = id.toString();
    else
      this.id = generatePostUID();

    if (title)
      this.title = title;

    if (desc)
      this.content = desc;

    if (cat)
      this.category = cat;
  }
}

export type categoryType = 'gaming' | 'programming' | 'entertainment'
  | 'lifestyle' | 'movies' | 'other' | null;

export const categoryTypeArray : Array<string> = [
  'gaming', 'programming', 'entertainment', 'lifestyle', 'movies', 'other'
];

// Custom validator function
export function categoryValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value.toString();

;    if (!categoryTypeArray.includes(value)) {
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

// Create dummy posts
const dummyPost1 = new Post('1', 'First Post', 'This is the first dummy post.');
const dummyPost2 = new Post('2', 'Second Post', 'This is the second dummy post.');
const dummyPost3 = new Post('3', 'Third Post', 'This is the third dummy post.');

export const mockPosts = [
  dummyPost1,
  dummyPost2,
  dummyPost3
];
