import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { NavigationService } from 'src/app/Services/navigation/navigation.service';
import { DetailBagComponent } from '../modal/detail-bag/detail-bag.component';
import { NotificationsUserComponent } from '../modal/notifications-user/notifications-user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public mouse = false;
  constructor(private navigationService: NavigationService, private authService: AuthService) { }
  @ViewChild(NotificationsUserComponent) notificationsComponent: NotificationsUserComponent
  ngOnInit() {
  }
  changeMouse() {
    this.mouse = !this.mouse;
  }
  goToHome() {
    this.navigationService.toDashboardPage();
  }
  async logout() {
    await this.authService.removeSession();
  }
  goToTroli() {
    // this.navigationService.toTroliPage();
  }
  openNotifications() {
    this.notificationsComponent.modal?.present()
  }
}
