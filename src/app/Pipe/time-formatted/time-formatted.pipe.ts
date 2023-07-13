import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormatted'
})
export class TimeFormattedPipe implements PipeTransform {

  transform(dateString: string, isWithTime: boolean = false): String {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 7);
    const formattedDate = date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });

    let formattedDateTime = `${formattedDate} `;
    if (isWithTime) {
      formattedDateTime = `${formattedDateTime} ${formattedTime} WIB`
    }
    return formattedDateTime;
  }

}
