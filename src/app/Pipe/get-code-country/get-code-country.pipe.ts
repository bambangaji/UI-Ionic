import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getCodeCountry'
})
export class GetCodeCountryPipe implements PipeTransform {

  transform(str: string): string {

    return str.substring(0, 3);
  }

}
