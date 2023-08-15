import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormatted'
})
export class TimeFormattedPipe implements PipeTransform {

  transform(dateString: string, isWithTime: boolean = false, type: string = ''): String {
    console.log(dateString);

    let date = new Date(dateString)
    if (!date) {
      console.log('sss');
      
      const dateString = "25-09-2022 13:45";
      const parts = dateString.split(" ");
      const datePart = parts[0];
      const timePart = parts[1];

      const dateComponents = datePart.split("-");
      const year = parseInt(dateComponents[2]);
      const month = parseInt(dateComponents[1]) - 1; // Months are 0-based
      const day = parseInt(dateComponents[0]);

      const timeComponents = timePart.split(":");
      const hours = parseInt(timeComponents[0]);
      const minutes = parseInt(timeComponents[1]);

      date = new Date(year, month, day, hours, minutes);
    }
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
