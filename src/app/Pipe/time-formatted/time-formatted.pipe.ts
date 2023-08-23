import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormatted'
})
export class TimeFormattedPipe implements PipeTransform {

  transform(dateString: string | Date, isWithTime: boolean = false, type: string = ''): String {

    if (dateString instanceof Date) {
      // date = dateString;
    } else {
      if (!isWithTime) {
        dateString = dateString.substring(0, 10)
      }
      console.log(dateString);
      const parts = dateString.split('-');
      console.log(parts);

      // if (parts.length === 3) {
      // Assuming parts[0] is day, parts[1] is month, and parts[2] is year
      const [day, month, year] = parts;

      // Check if the parts are in 'dd-mm-yyyy' format
      if (day.length === 2 && month.length === 2 && year.length === 4) {
        // Convert to 'yyyy-mm-dd' format
        dateString = `${year}-${month}-${day}`;
      } 
    }


    // }
    let date = new Date(dateString)
    date.setHours(date.getHours() + 7);
    const formattedDate = date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour12: false,
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
