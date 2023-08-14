import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hover',
  templateUrl: './hover.component.html',
  styleUrls: ['./hover.component.scss'],
})
export class HoverComponent implements OnInit {
  @Input() content: string;
  @Input() type: string;
  @Input() show: boolean;
  @Input() id: string;
  dataID: string;
  constructor() { }

  ngOnInit() { }

  openAlertChangeSchedule() {

  }
  // setData(data: any, type: string) {
  //   this.dataID = data;
  //   // this.id = data;
  //   // this.type = type;
  //   // this.show = true;
  //   // this.type = data;
  //   console.log(this.dataID);
  //   console.log(this.id);

  // }
}
