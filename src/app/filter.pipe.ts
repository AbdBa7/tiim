import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  // to do/improvment : searchText as a dict for multi search on multiple columns
  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items ; }

    searchText = searchText.toLowerCase();
    console.log('abc')
    if (typeof(items[0]) === 'string') {
      return items.filter( it => {
        return it.toLowerCase().includes(searchText);
      });
    }

    return items.filter( it => {
        return it.fullname.toLowerCase().includes(searchText);
    });
  }
}
