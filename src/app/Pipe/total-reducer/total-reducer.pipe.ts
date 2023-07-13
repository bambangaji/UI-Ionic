import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalReducer'
})
export class TotalReducerPipe implements PipeTransform {

  transform(array?: any[], key?: string): number {
    if (!array) { return 0 }

    if (key) {
      return array.reduce((prevValue, nextValue) => {
        return prevValue + parseFloat(nextValue[key]);
      }, 0)
    }

    return array.reduce((prevValue, nextValue) => {
      return prevValue + parseFloat(nextValue);
    }, 0)
  }

}
