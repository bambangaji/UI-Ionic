import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() content: string;
  @Input() type: string;
  @Input() show: boolean;
  @Input() id: string;
  @Output() onChange = new EventEmitter<any>();
  dataID: string;
  date: any = "2023-01-01";
  constructor(private popoverController: PopoverController) { }

  ngOnInit() { }

  confirm(p: any) {
    console.log(p);
    this.onChange.emit(p)
  }
}
