import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: number, ...args: string[]): string {
    const date = typeof value === 'number' ? new Date(value) : null;

    if (date == null)
      return 'null';

    if (args.includes('post-list')) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
      const day = date.getDate().toString().padStart(2, '0');

      const hours = date.getHours().toString().padStart(2, '0');;
      const mins = date.getMinutes().toString().padStart(2, '0');;

      return `${year}-${month}-${day} ${hours}:${mins}`;
    }

    return date.toDateString();
  }

}
