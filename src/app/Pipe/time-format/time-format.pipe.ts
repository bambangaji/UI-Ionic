import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      const utcTime = new Date(value);
      const utcPlus7Time = new Date(utcTime.getTime()); // Adding 7 hours to convert to UTC+7

      // Format the UTC+7 time as needed (e.g., using toLocaleString())
      const formattedTime = utcPlus7Time.toLocaleString();

      return formattedTime;
    }
    return '';
  }
}
