import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalScheduleCreateComponent } from '../modal/modal-schedule-create/modal-schedule-create.component';
import { FilterComponent } from '../modal/filter/filter.component';
import { NavigationService } from 'src/app/Services/navigation/navigation.service';

@Component({
  selector: 'app-label-page',
  templateUrl: './label-page.component.html',
  styleUrls: ['./label-page.component.scss'],
})
export class LabelPageComponent implements OnInit {
  @ViewChild(ModalScheduleCreateComponent) createScheduleComponent?: ModalScheduleCreateComponent;
  @ViewChild(FilterComponent) filterComponent?: FilterComponent;


  @Input()
  title: string = 'Dashboard';
  @Input()
  subTitle: string = '';

  constructor(public navigationService: NavigationService) { }

  ngOnInit() { }
  openFilter() {
    this.filterComponent?.modal?.present();
  }
  openHistory() {
    this.navigationService.toScheduleLogPage();
  }
  createSchedule() {
    this.createScheduleComponent?.modal?.present();
  }
  goToPage() {

  }
}
