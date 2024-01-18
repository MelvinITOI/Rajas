import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string, labelKey?: string[]): any {
    if (!items || !searchTerm) {
      return items;
    }
    if (!labelKey) {
      return items.includes(searchTerm);
    } else {
      return items.filter((item) => labelKey.some(key => String(item[key]).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
      );
    }
  }
}
