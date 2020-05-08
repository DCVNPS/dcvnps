import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortDesc'
})
export class SortDescPipe implements PipeTransform {

  // tslint:disable-next-line: ban-types
  transform(value: any, fn: Function = (a: any, b: any) => a > b ? 1 : -1): any {
    return value.sort(fn);
  }

}
