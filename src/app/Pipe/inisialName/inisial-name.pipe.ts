import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inisialName'
})
export class InisialNamePipe implements PipeTransform {

  transform(str: string): string {
    const words = str.split(' '); // Split the string into an array of words
    const output = words.map(word => word.slice(0, 1)).join(''); // Get the first two characters of each word and join them    
    return output.length > 2 ? output.substring(0, 1) : output; // If the output has more than 2 characters, return the first character only
  }
}
