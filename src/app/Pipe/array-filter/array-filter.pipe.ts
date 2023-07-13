import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter'
})
export class ArrayFilterPipe implements PipeTransform {

  transform(arrays: FormArray<any> | any[], key: string, value: any, trigger?: any): any[] {
    if (arrays instanceof FormArray) {
      const controls: any[] = [];
      arrays.controls.forEach((arrValue: any) => {
        if (arrValue.value[key] === value) {
          controls.push(arrValue)
        };
      });
      return controls;
    }
    
    return arrays.filter(array => array[key] === value);
  }

}
