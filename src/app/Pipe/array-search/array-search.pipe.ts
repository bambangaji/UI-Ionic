import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arraySearch'
})
export class ArraySearchPipe implements PipeTransform {

  transform(arrays: any[], key: string, keyword: string): any[] {
    console.log(arrays);
    // console.log(arrays.filter(array => array[key].toLowerCase() === keyword.toLowerCase()));
    return arrays.filter(array => array[key].toLowerCase().includes(keyword.toLowerCase()));
  }

}
