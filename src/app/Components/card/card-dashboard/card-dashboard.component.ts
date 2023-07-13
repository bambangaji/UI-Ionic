import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.scss'],
})
export class CardDashboardComponent implements OnInit {
  @Input()
  title: string = '';
  @Input()
  content: string = '';
  @Input()
  desc: string = '';
  @Input()
  isUp: boolean = false;
  @Input()
  value: string = '';
  constructor() { }

  ngOnInit() { }

}
