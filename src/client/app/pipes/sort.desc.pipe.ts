import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortDesc'
})
export class SortDescPipe implements PipeTransform {

  transform(value: any, fn: Function = (a,b) => a > b ? 1 : -1): any {
    return value.sort(fn);
  }

}
