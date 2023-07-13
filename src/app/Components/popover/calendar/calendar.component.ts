import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  date: any = "2023-01-01";
  constructor(private popoverController:PopoverController) { }

  ngOnInit() { }

  confirm(p: any) {
    console.log(p);
    this.popoverController.dismiss(p)
  }
}
