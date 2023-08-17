import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { filter, Subject, takeUntil } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { EncryptionService } from '../encryption/encryption.service';

export enum ERoutePath {
  ROOT = '/',
  //LOGIN REGISTER
  LOGIN = '/login',
  FORGOT_PASSWORD = '/forgot-password',
  FORGOT_PASSWORD_SET_NEW = '/forgot-password/set-new',
  //MAIN
  DASHBOARD = '/main/dashboard/home',
  PENGATURAN = '/main/dashboard/settings',
  //schedule
  SCHEDULE = '/main/dashboard/schedule',
  SCHEDULE_LOG = '/main/dashboard/schedule/log',
  SCHEDULE_IMPORT = '/main/dashboard/schedule/import',

  //MANIFEST
  MANIFEST = '/main/dashboard/manifest',
  MANIFEST_BAG = '/main/dashboard/manifest/bag',
  MANIFEST_SCHEDULED = '/main/dashboard/manifest/scheduled',
  MANIFEST_HISTORY = '/main/dashboard/manifest/history',
  MANIFEST_TABLE = '/table',
  MANIFEST_CREATE = '/main/dashboard/manifest/create-manifest',

  //regulasi
  REGULASI = '/main/dashboard/regulasi',

  //penerbangan
  PENERBANGAN = '/main/dashboard/penerbangan',

  //stock
  STOCK = '/main/dashboard/stock',
  //schedule-penerbangan
  SCHEDULE_PENERBANGAN = '/main/dashboard/schedule-penerbangan',

}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public routeSubs: Subject<boolean> = new Subject();
  public urlHistories: string[] = [];
  public currentRoute: string = "";
  private urlParamHistories: NavigationExtras[] = [
    {

    }
  ];

  constructor(private router: Router, private navCtrl: NavController, private encryptionService: EncryptionService) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      takeUntil(this.routeSubs)
    ).subscribe((route) => {
      if (!this.urlHistories.length) {
        this.urlHistories.push((route as NavigationEnd).url);
        this.urlParamHistories.push({
          state: undefined,
          queryParams: undefined,
          replaceUrl: false,
        });

        this.routeSubs.next(true);
        this.routeSubs.complete();
      }
    });
  }

  toLoginPage() {
    this.setRoot(ERoutePath.LOGIN, undefined, undefined, true);
  }

  toDashboardPage() {
    this.setRoot(ERoutePath.DASHBOARD, undefined, undefined, true);
  }

  toSchedulePage() {
    this.setRoot(ERoutePath.SCHEDULE, undefined, undefined, true);
  }

  toScheduleLogPage() {
    this.setRoot(ERoutePath.SCHEDULE_LOG, undefined, undefined, true);
  }

  toScheduleImportPage() {
    this.setRoot(ERoutePath.SCHEDULE_IMPORT, undefined, undefined, true);
  }
  toCreateManifestPage() {
    this.setRoot(ERoutePath.MANIFEST_CREATE, undefined, undefined, true);
  }
  toManifestBagPage() {
    this.setRoot(ERoutePath.MANIFEST_BAG, undefined, undefined, true);
  }
  toManifestScheduledPage() {
    this.setRoot(ERoutePath.MANIFEST_SCHEDULED, undefined, undefined, true);
  }
  toManifestHistoryPage() {
    this.setRoot(ERoutePath.MANIFEST_HISTORY, undefined, undefined, true);
  }
  toTablePage(type: string, uuid: string) {
    this.push(ERoutePath.MANIFEST_TABLE, undefined, { type: type, uuid: uuid }, true);
  }
  toRegulasiPage() {
    this.setRoot(ERoutePath.REGULASI, undefined, undefined, true);
  }
  toSettingsPage() {
    this.setRoot(ERoutePath.PENGATURAN, undefined, undefined, true);
  }
  toStockPage() {
    this.setRoot(ERoutePath.STOCK, undefined, undefined, true);
  }

  async toPage(path: string): Promise<void> {
    try {
      await this.push(path, undefined, undefined, true);
    } catch (error) {
      throw new Error('Url tidak ditemukan atau terjadi kesalahan');
    }
  }

  /**
  * The navigated URL become previous page of the history.
  * If error occured, developer must provide navigate to any default route page.
  */
  pop() {
    this.urlHistories.pop();
    this.urlParamHistories.pop();

    if (this.urlHistories.length && this.urlParamHistories.length) {
      return new Promise((resolve, reject) => {
        this.router.navigate([this.urlHistories[this.urlHistories.length - 1]], {
          state: this.urlParamHistories[this.urlParamHistories.length - 1].state,
          queryParams: this.urlParamHistories[this.urlParamHistories.length - 1].queryParams,
          replaceUrl: this.urlParamHistories[this.urlParamHistories.length - 1].replaceUrl,
        })
          .catch(() => reject(false));
      })
    }
    return this.toDashboardPage();
  }

  /** The specified URL become the root of navigation route.
  * @param urlTo URL expected.
  * @param stateParams State params.
  * @param queryParams Query params.
  */
  private setRoot(
    urlTo: string,
    stateParams?: Record<string, string>,
    queryParams?: Record<string, string | string[]>,
    replaceUrl?: boolean
  ) {
    this.currentRoute = urlTo;
    this.resetHistories()
    this.urlHistories.push(urlTo);
    this.urlParamHistories.push({
      state: stateParams,
      queryParams: queryParams,
      replaceUrl: replaceUrl ?? false,
    });

    // this.router.navigate([urlTo])
    this.navCtrl.navigateForward(urlTo)
  }

  /**
  * The navigated URL become next page of the history.
  * @param urlTo URL expected.
  * @param stateParams State params.
  * @param queryParams Query params.
  */
  private push(
    urlTo: string,
    stateParams?: Record<string, string>,
    queryParams?: Record<string, string | string[]>,
    replaceUrl?: boolean
  ) {
    this.currentRoute = urlTo;
    // Replace route param template if stateParams provided
    if (stateParams && Object.keys(stateParams).length) {
      Object.keys(stateParams).forEach((key) => {
        urlTo = urlTo.replace(`:${key}`, stateParams[key])
      })
    }

    this.urlHistories.push(urlTo);
    this.urlParamHistories.push({
      state: stateParams,
      queryParams: queryParams,
      replaceUrl: replaceUrl ?? false,
    });

    // Navigate to expected URL
    return this.router.navigate([urlTo], {
      state: stateParams,
      queryParams: queryParams,
      replaceUrl: replaceUrl ?? false,
    })
  }

  private resetHistories() {
    this.urlHistories = [];
    this.urlParamHistories = [];
  }
}
