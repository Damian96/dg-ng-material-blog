import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitilize'
})
export class CapitilizePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value[0].toUpperCase() + value.slice(1);
  }

}
