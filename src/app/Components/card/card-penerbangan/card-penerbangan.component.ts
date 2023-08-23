import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PickPenerbanganComponent } from '../../modal/pick-penerbangan/pick-penerbangan.component';

@Component({
  selector: 'app-card-penerbangan',
  templateUrl: './card-penerbangan.component.html',
  styleUrls: ['./card-penerbangan.component.scss'],
})
export class CardPenerbanganComponent implements OnInit {
  @ViewChild(PickPenerbanganComponent) pickPenerbangan: PickPenerbanganComponent;
  @Input() type: string = '';
  today: Date = new Date();
  constructor() { }

  ngOnInit() { }
  confirm() {
    this.pickPenerbangan.modal?.present();
  }
}
