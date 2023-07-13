import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor() { }
  listDataCard =
    [
      {
        title: 'Total Bag',
        desc: 'Ini adalah data total bag',
        value: '20',
        content: '50Kg',
        isUp: false,
      },
      {
        title: 'Total Bag',
        desc: 'Ini adalah data total bag',
        value: '20',
        content: '50',
        isUp: true,
      },
      {
        title: 'Total Bag',
        desc: 'Ini adalah data total bag',
        value: '20',
        content: '50Kg',
        isUp: false,
      },
      {
        title: 'Total Bag',
        desc: 'Ini adalah data total bag',
        value: '20',
        content: '50',
        isUp: true,
      },
    ]
  ngOnInit() {
  }

}
