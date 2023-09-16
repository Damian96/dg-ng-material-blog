import { AbstractControl, ValidatorFn } from "@angular/forms";

const allowedOptions = [
  'title', 'content', 'author', 'category'
];

// Custom validator function
export function searchFieldValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value.toString();

    if (!allowedOptions.includes(value)) {
      // Value is not one of the allowed categories
      return { invalidSearchField: true };
    }

    // Value is valid
    return null;
  };
}
