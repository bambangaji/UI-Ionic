import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, finalize, tap, timeout } from 'rxjs';
import { GlobalService } from 'src/app/Services/global/global.service';
import { StorageService } from 'src/app/Services/storage/storage.service';
import { ILoginResp, IResp } from 'src/app/Interfaces/index.interface';
import { AuthService } from '../auth/auth.service';
import { query } from '@angular/animations';
export type TIncomingStatus = 'unconfirmed' | 'confirmed';
export type TInboundStatus = 'belum-divalidasi' | 'sudah-tervalidasi' | 'hold';
export type TConsolidationStatus = 'OPEN' | 'READY' | 'CLOSED';
export type TScheduleStatus = 'OPEN' | 'OUTBOUND' | 'CANCELED';
export type TManifestStatus = 'OPEN' | 'CONFIRMED' | 'CLOSED';
export type TPaymentStatus = 'unconfirmed' | 'confirmed';
export type TTroubleStatus = 'menunggu' | 'ditangani' | 'selesai' | 'dibatalkan';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  apiUrl?: string;

  isFetchingUnits: boolean = false;
  isFetchingCommodities: boolean = false;

  REQUEST_TIMEOUT: number = 25000;

  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
    private storageService: StorageService,
    private authService: AuthService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  makeBaseHeader() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-type': 'application/json',
        Key: environment.backOfficeKey
      })
    };
    return httpOptions;
  }

  async makeAuthenticatedHeader() {
    const token = await this.storageService.reStorage('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-type': 'application/json',
        token: `${token}`,
        Key: environment.backOfficeKey
      })
    };
    return httpOptions;
  }


  private async makeHttpPostRequest<T>(url: string, body: any, isLoading: boolean = true, type: number = 1, query: string = ''): Promise<IResp<T>> {
    const host = this.apiUrl;
    if (isLoading) {
      this.globalService.showLoading();
    }
    const header = await this.makeAuthenticatedHeader();

    const request$ = this.getRequestObservable(type, host!, url, body, header, query);

    return new Promise((resolve, reject) => {
      request$
        .pipe(
          timeout(this.REQUEST_TIMEOUT),
          tap({
            error: (error) => {
              console.log(error);
              if (error.status === 401) {
                this.authService.removeSession();
                this.globalService.showToast(error.error.msg ? error.error.msg : 'Please login again', 'danger')
              }
            }
          }),
          finalize(() => {
            this.globalService.hideLoading();
          })
        )
        .subscribe({
          next: successHelper.bind(this, resolve),
          error: errorHelper.bind(this, reject),
        });
    });
  }

  private getRequestObservable(type: number, host: string, url: string, body: any, header: any, queryParam: string): Observable<any> {
    switch (type) {
      case 2:
        return this.http.patch(`${host}${url}`, JSON.stringify(body), header);
      case 3:
        return this.http.get(`${host}${url}${queryParam}`, header);
      case 4:
        header.body = JSON.stringify(body);
        return this.http.delete(`${host}${url}`, header,);
      default:
        return this.http.post(`${host}${url}`, JSON.stringify(body), header);
    }
  }

  login(body: { email?: any, password?: any }): Promise<IResp<any>> {
    return this.makeHttpPostRequest<ILoginResp>('backoffice/login', body);
  }

}

async function errorHelper(reject: (reason: any) => void, error: any) {
  reject(error);
}

function successHelper(resolve: (reason: any) => void, result: any) {
  resolve(result);
}