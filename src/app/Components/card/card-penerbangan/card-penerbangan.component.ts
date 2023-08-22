import { Component, OnInit, ViewChild } from '@angular/core';
import { PickPenerbanganComponent } from '../../modal/pick-penerbangan/pick-penerbangan.component';

@Component({
  selector: 'app-card-penerbangan',
  templateUrl: './card-penerbangan.component.html',
  styleUrls: ['./card-penerbangan.component.scss'],
})
export class CardPenerbanganComponent implements OnInit {
  @ViewChild(PickPenerbanganComponent) pickPenerbangan: PickPenerbanganComponent;
  today: Date = new Date();
  constructor() { }

  ngOnInit() { }
  confirm() {
    this.pickPenerbangan.modal?.present();
  }
}
