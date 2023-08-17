import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/Services/navigation/navigation.service';

@Component({
  selector: 'app-schedule-penerbangan',
  templateUrl: './schedule-penerbangan.page.html',
  styleUrls: ['./schedule-penerbangan.page.scss'],
})
export class SchedulePenerbanganPage implements OnInit {

  constructor(private navigationService: NavigationService) { }
  showTooltip: boolean = false;
  showTooltipBerat: boolean = false;
  today: Date = new Date();
  ngOnInit() {
  }
  toggleTooltip() {

  }

  goToCreateManifest() {
    this.navigationService.toCreateManifestPage();
  }
}
