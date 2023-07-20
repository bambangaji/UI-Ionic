import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-history-aktivitas',
  templateUrl: './history-aktivitas.component.html',
  styleUrls: ['./history-aktivitas.component.scss'],
})
export class HistoryAktivitasComponent implements OnInit {
  @Input() data: any[] = [
    {
      date: '18-07-2023 13:45',
      status: 'Selesai',
      desc: 'Ubah',
      transit_in: '23-09-2022 13:45',
      transit_out: '23-09-2022 13:45',
      mawb: '123-123',
      airline: 'Airlines www',
      pic: 'Ahmad'
    },
    {
      date: '23-09-2022 13:45',
      status: 'Transit',
      desc: 'Ubah',
      transit_in: '23-09-2022 13:45',
      transit_out: '23-09-2022 13:45',
      mawb: '123-123',
      airline: 'Airlines www',
      pic: 'Ahmad'
    },
    {
      date: '23-09-2022 13:45',
      status: 'Transit',
      desc: 'Ubah',
      transit_in: '23-09-2022 13:45',
      transit_out: '23-09-2022 13:45',
      mawb: '123-123',
      airline: 'Airlines www',
      pic: 'Ahmad'
    },
    {
      date: '23-09-2022 13:45',
      status: 'Transit',
      desc: 'Ubah',
      transit_in: '23-09-2022 13:45',
      transit_out: '23-09-2022 13:45',
      mawb: '123-123',
      airline: 'Airlines www',
      pic: 'Ahmad'
    },
  ];
  listDate: any[] = [];
  formattedDates: string[] = [];
  listTanggal: any = []

  formattedData: any[] = [];
  constructor(private cdr: ChangeDetectorRef) { }
  @Input() height_garis: string = 'height:200px;';
  ngOnInit() { }
  async setHeight(length: number) {
    const height = 150;
    const total_height = height * length;
    this.height_garis = `height:${total_height}px;`;
    return this.height_garis;
  }
  setData(data: any,) {
    console.log('ssadasd');
    // this.data = data;
    // this.setHeight(1);
  }
  async formatData() {
    const today = new Date();
    const groupedData = this.data.reduce((acc, item) => {
      const dateParts = item.date.toString().split(' ')[0].split('-');
      const day = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]);
      const year = parseInt(dateParts[2]);
      const formattedDate = `${day} ${this.getMonthName(month)} ${year}`;
      let finalDate: string;
      if (this.validateDate(item.date)) {
        finalDate = 'Hari Ini';
      } else {
        finalDate = formattedDate;
      }
      const existingGroup = acc.find((group: { date: string; }) => group.date === finalDate);
      if (existingGroup) {
        existingGroup.data.push(item);
      } else {
        acc.push({ date: finalDate, data: [item] });
      }

      return acc;
    }, []);

    this.formattedData = groupedData;
    console.log(this.formattedData);

  }
  // sortByDateDescending(arr) {
  //   return this.data.sort((a, b) => {
  //     const dateA = new Date(a.date);
  //     const dateB = new Date(b.date);
  //     return dateB - dateA;
  //   });
  // }
  async ngAfterViewInit() {
    this.data = await this.data.sort((a: any, b: any) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    await this.setHeight(this.data.length);
    await this.formatData();
    this.cdr.detectChanges();

  }
  clusteringData() {
    for (let i of this.data) {
      const dateToday = { date: 'Hari ini', data: [] }
      if (this.validateDate(i.date)) {
        const listDate = [];
        // dateToday.data.push(i.date)
        // listDate.push(date);
        this.listTanggal.push('Hari ini')
      } else {
        this.listTanggal.push(i.date)
      }
    }
    console.log(this.listTanggal);
    this.formatAndRemoveDuplicates();
  }
  formatAndRemoveDuplicates() {
    const uniqueDates = new Set<string>();
    this.formattedDates = this.listTanggal.map((date: string | number | Date) => {
      if (date !== "Hari ini") {
        const dateParts = date.toString().split(' ')[0].split('-');
        const day = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const year = parseInt(dateParts[2]);
        const formattedDate = `${day} ${this.getMonthName(month)} ${year}`;
        uniqueDates.add(formattedDate);
        return formattedDate;
      }
      return date;
    });
    this.formattedDates = [this.listTanggal[0], ...Array.from(uniqueDates)];

    console.log(this.formattedDates);
    console.log(Array.from(uniqueDates));
    console.log(this.formattedDates);
  }

  getMonthName(month: number): string {
    const date = new Date(2000, month - 1, 1); // Using 2000 as a leap year
    return date.toLocaleString('en-us', { month: 'long' });
  }
  validateDate(date: string) {
    const [datePart, timePart] = date.split(' ');
    const [day, month, year] = datePart.split('-');
    const [hour, minute] = timePart.split(':');

    const inputDate = new Date(+year, +month - 1, +day, +hour, +minute);
    const today = new Date();

    const inputDateFormatted = `${inputDate.getDate()}-${inputDate.getMonth() + 1}-${inputDate.getFullYear()}`;
    const todayFormatted = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

    if (inputDateFormatted === todayFormatted) {
      return true;
    } else {
      return false;
    }
  }
}
