import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-label-status',
  templateUrl: './label-status.component.html',
  styleUrls: ['./label-status.component.scss'],
})
export class LabelStatusComponent implements OnInit {
  @Input() status: string;
  constructor() { }

  ngOnInit() { }

}
