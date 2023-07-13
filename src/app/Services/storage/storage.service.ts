import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { IUser } from 'src/app/Interfaces/user.interface';
export type TStorageName =
  'isNavbarFull'
  | 'token'
  | 'profile'
  | 'token_expired'
  | 'language'
  | 'address'
  ;

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  token?: string;
  token_expired?: string;
  profile?: IUser;
  language?: 'id' | 'en';
  isNavbarFull?: boolean;
  address?: string;
  constructor() { }

  storeStorage(name: TStorageName, payload: any) {
    return this.setStorage(name, payload)
      .then((_) => { this[name] = payload })
  }

  reStorage(name: TStorageName) {
    return this.getStorage(name)
      .then((result: any | undefined) => {
        this[name] = result
        return this[name];
      }
      )
  }

  async removeStorage(name: TStorageName): Promise<void> {
    return Preferences.remove({
      key: name
    });
  }

  async clearAuthStorage(): Promise<void[]> {
    return Promise.all([
      this.removeStorage('profile'),
      this.removeStorage('token'),
    ]);
  }

  async clearStorage(): Promise<void> {
    return Preferences.clear();
  }

  private setStorage(key: string, value: any): Promise<void> {
    return Preferences.set({
      key: key,
      value: JSON.stringify(value)
    });
  }

  private getStorage(key: string): any {
    return Preferences.get({ key: key })
      .then((result: any) => {
        if (result.value) {
          return JSON.parse(result.value)
        }
        return undefined;
      })
      .catch((_: any) => undefined);
  }
}
