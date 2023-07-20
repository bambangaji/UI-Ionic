import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalScheduleCreateComponent } from '../modal/modal-schedule-create/modal-schedule-create.component';
import { FilterComponent } from '../modal/filter/filter.component';
import { NavigationService } from 'src/app/Services/navigation/navigation.service';
import { SidebarDashboardComponent } from '../sidebar/sidebar-dashboard/sidebar-dashboard.component';

@Component({
  selector: 'app-label-page',
  templateUrl: './label-page.component.html',
  styleUrls: ['./label-page.component.scss'],
})
export class LabelPageComponent implements OnInit {
  @ViewChild(ModalScheduleCreateComponent) createScheduleComponent?: ModalScheduleCreateComponent;
  @ViewChild(SidebarDashboardComponent) sidebarComponent?: SidebarDashboardComponent;
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
  goToTitlePage() {
    if (this.title.toLowerCase() === 'schedule') {
      return this.navigationService.toSchedulePage();
    }
  }
  goToSubTitlePage() {
    if (this.subTitle.toLowerCase() === 'log aktifitas') {
      return this.navigationService.toScheduleLogPage();
    }
    if (this.subTitle.toLowerCase() === 'import') {
      return this.navigationService.toScheduleImportPage();
    }
  }
  openLogHistory() {
    console.log('sss');
    
    this.sidebarComponent?.modal?.present();
  }
}
