import { AuthService } from 'src/app/Services/auth/auth.service';
import { Injectable, ViewChild } from '@angular/core';
import { LoadingController, PopoverController, ToastController } from '@ionic/angular';
import { BehaviorSubject, TimeoutError } from 'rxjs';
import { TranslatePipe } from 'src/app/Pipe/translate/translate.pipe';
// import { TranslateService } from 'src/app/Services/translate/translate.service';
import { IOption, StatusCode } from 'src/app/Interfaces/index.interface';
import { TranslateService } from '../translate/translate.service';
import { CURRENCIES } from './currencies';
import { COUNTRIES_EXT } from './list-country';
import { DropdownCustomComponent, countryType } from 'src/app/Components/popover/country/country.component';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {
  today = new Date();
  private dataSubject = new BehaviorSubject<any>([]);
  public valuePopOver = '';
  data$ = this.dataSubject.asObservable();
  translate: (translate_key: string, params?: Record<string, any>) => string;

  loadingAX?: HTMLIonLoadingElement;

  // Static & Reusables variables;
  // weightUnits: IUnit[]      = [];
  // commodities: ICommodity[] = [];

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private translateService: TranslateService,
    private authService: AuthService,
    private popoverController: PopoverController,
  ) {
    this.translate = (translate_key: string, param?: Record<string, any>) => {
      return new TranslatePipe(this.translateService).transform(translate_key, this.translateService.lang, param);
    };
  }

  config(key: 'apiUrlMode' | 'apiUrlOffline' | 'requestTimeout') {
    const config = {
      'apiUrlMode': 0,
      'apiUrlOffline': 'https://support.abangexpress.co.id/api/',
      'requestTimeout': 25000,
    };
    return config[key]
  }
  todo() {
    this.showToast('Feature Coming Soon!', 'secondary')
  }
  async presentPopover(e: Event, data: any, type: countryType): Promise<any> {
    this.dataSubject.next({
      data: data,
      type: type
    })
    const popover = await this.popoverController.create({
      component: DropdownCustomComponent,
      event: e,
      size: 'cover'
    });
    let output = '';
    popover.onDidDismiss().then((result) => {
      if (result.role === 'cancel') {
        console.log('Popover dismissed');
      } else {
        const selectedOption = result.data;
        console.log(`Selected option: ${selectedOption}`);
        output = selectedOption;
        this.valuePopOver = selectedOption;
        // Handle the selected option here
      }
    });
    await popover.present();
    return output;
    // this.roleMsg = `Popover dismissed with role: ${role}`;
  }
  async showToast(
    msg: string = '',
    type: 'secondary' | 'danger' | 'warning' | 'success' = 'secondary',
    duration: number = 1500
  ) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration,
      color: type,
      cssClass: `toast-${type}`,
    });
    toast.present();
  }

  async showLoading() {
    this.loadingAX = await this.loadingController.create({
      message: '<div class="loading-title" > <p class="mb-0 bold-text">Sedang memuat</p><p class="mb-0">Harap menunggu</p></div> <img src="assets/gif/loader.gif">',
      animated: true,
      spinner: null,
      cssClass: 'loader-css-class',
      backdropDismiss: false,

    })
    return this.loadingAX.present();
  }
  delay(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }
  async hideLoading() {


    if (!this.loadingAX) { await this.showLoading() };
    return this.loadingAX!.dismiss();
  }

  errorHandler(error: any, mainMessage: string = '') {
    console.log(error);


    if (error?.status === StatusCode.UNAUTHENTICATED) {
      this.hideLoading();
      // this.authService.removeSession();
      return;
    }
    if ((error as any).status !== StatusCode.SUCCESS) {
      this.showToast(error.error?.message ? error.error?.message : error.statusText, 'danger')

      return;
    }
  }
  async convertToIoption(originalArray: any): Promise<IOption[]> {
    const convertedArray = originalArray.map((obj: { id: any; name: any; }) => {
      return {
        value: obj.id,
        label: obj.name
      };
    });
    return convertedArray;
  }
  getURLImagePartner(code: string): string {
    return "https://api.pakdome.com/logo/partner/14px/" + code
  }
  mapOpener(link?: string) {
    if (!link || !link.includes('https://')) {
      this.showToast('t_link_empty', 'warning');
      return
    }
    window.open(link, '_blank', 'noopener noreferrer');
  }
  formatDate(dateString: string) {
    const utcTime = new Date(dateString);
    const utcPlus7Time = new Date(utcTime.getTime()); // Adding 7 hours to convert to UTC+7

    // Format the UTC+7 time as needed (e.g., using toLocaleString())
    const formattedTime = utcPlus7Time.toLocaleString();

    // return this.datePipe.transform(formattedTime, 'dd MMM yyyy')!;
  }
  convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve((reader.result as string));
      };
      reader.readAsDataURL(blob);
    });
  }

  convertBlobToBase64WithValidation(event: any): Promise<string> {
    const file = event.files[0];
    const MAX_FILE_SIZE_MB = 2.5;
    const size = file?.size;
    console.log(size / (1024 * 1024));

    if (size / (1024 * 1024) > MAX_FILE_SIZE_MB) {
      this.showToast(this.translate('t_file_exceed', { max: `${MAX_FILE_SIZE_MB} Mb` }), 'warning');
      return Promise.reject(new Error('File size exceeded'));
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve((reader.result as string));
      };
      reader.readAsDataURL(file);
    });
  }

  // getAxInfo(): IVendor {
  //   return {
  //     name: "PT Pasti Global Ekspresindo",
  //     address: {
  //       address_detail: "Jl. Raya Condet No 27.B, Kel. Balekambang, Kec. Kramat Jati, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13530 Indonesia.",
  //       address_phone: "8111361777",
  //       address_uuid: "",
  //       address_city: "Jakarta Timur",
  //       address_district: "",
  //       address_google_url: "",
  //       address_label: "Agent Pusat",
  //       address_note: "",
  //       address_other_lang: "",
  //       address_province: "DKI Jakarta",
  //       address_serial_id: 0,
  //       address_zipcode: 13530,
  //       dis_id: 0,
  //       city_id: 0,
  //       country: undefined,
  //       country_id: 0,
  //       created_at: null,
  //       is_deleted: 0,
  //       is_primary: 0,
  //       latitude: 0,
  //       longitude: 0,
  //       prov_id: 0,
  //       updated_at: null,
  //     },
  //     user: {
  //       uuid: "0",
  //       email: "info@abangexpress.co.id",
  //       name: "Abang Express Pusat",
  //       role_id: 0,
  //       document: null,
  //       phone_number: "8111361777",
  //       username: "AX PUSAT",
  //       users_settings: "",
  //     },
  //     vendor_serial_id: 0,
  //     udara: 0,
  //     laut: 0
  //   }
  // }

  async copyToClipboard(item: string): Promise<void> {
    await navigator.clipboard?.writeText(item);
    this.showToast(`${item} copied to clipboard`, 'secondary');
  }

  // openDocument(link?: string) {
  //   if (!link) {
  //     const message = this.translate('t_document_link_invalid')
  //     this.showToast(message, 'danger')
  //     return;
  //   }

  //   window.open(link, '_blank');
  // } 
}