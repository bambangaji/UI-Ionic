import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalScheduleCreateComponent } from '../../modal/modal-schedule-create/modal-schedule-create.component';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
export type countryType = 'country' | 'with-image' | 'normal' | 'inisial' | 'tanggal'
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class DropdownCustomComponent implements OnInit {
  @ViewChild(ModalScheduleCreateComponent) createScheduleComponent?: ModalScheduleCreateComponent;
  @Input() type: countryType = 'normal';

  list_country = [
    { name: 'America', icon: 'assets/icon/usa.svg' },
    { name: 'Brazil', icon: 'assets/icon/usa.svg' },
    { name: 'Canada', icon: 'assets/icon/usa.svg' },
    { name: 'America', icon: 'assets/icon/usa.svg' },
    { name: 'Brazil', icon: 'assets/icon/usa.svg' },
    { name: 'Canada', icon: 'assets/icon/usa.svg' },
    { name: 'America', icon: 'assets/icon/usa.svg' },
    { name: 'Brazil', icon: 'assets/icon/usa.svg' },
    { name: 'Canada', icon: 'assets/icon/usa.svg' }
  ]
  @Input() list_data = ['Udara', 'Darat', 'Laut'];
  list_tanggal = ['Hari ini', 'Kemarin', '7 Hari terakhir', '30 Hari terakhir', 'Bulan ini', 'Tahun ini', 'Tanggal rentang']
  @Input() search: boolean = true;
  private dataSubscription: Subscription;
  constructor(public popoverController: PopoverController, public modalSchedule: ModalScheduleCreateComponent) {
    this.dataSubscription = this.modalSchedule.data$.subscribe((data) => {
      console.log(data);
      if (data.length !== 0) {
        this.type = 'normal'
        this.list_data = data;
      }

      console.log(this.list_data);

    });
  }

  ngOnInit() { }

  setData(data: any, type: countryType) {
    console.log('sadad');
    this.type = type;
    if (type === 'country') {

    }
    if (type === 'normal') {
      this.list_data = data;
    }
    if (type === 'with-image') {

    }
    console.log(type);
    console.log(data);
    console.log(this.list_data);

  }
  selectCountry(p: any) {
    console.log(p);
    this.popoverController.dismiss(p);
  }
}
