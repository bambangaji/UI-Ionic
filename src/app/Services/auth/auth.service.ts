import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/Services/storage/storage.service';
import { IUser } from 'src/app/Interfaces/user.interface';
import { NavigationService } from '../navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated$?: BehaviorSubject<boolean | undefined> = new BehaviorSubject<boolean | undefined>(undefined);

  constructor(private storageService: StorageService, private navigationService: NavigationService) {
    this.checkIsAuthenticated();
  }

  async checkIsAuthenticated(): Promise<boolean> {
    await this.storageService.reStorage('profile');
    await this.storageService.reStorage('token');

    const { profile, token } = this.storageService;
    if (!profile || !token) {
      this.isAuthenticated$?.next(false);
      return false;
    }
    this.isAuthenticated$?.next(true);
    return true;
  }

  async setSession(profile: IUser, token: string, token_expired: string) {
    await this.storageService.storeStorage('profile', profile);
    await this.storageService.storeStorage('token', token);
    await this.storageService.storeStorage('token_expired', token_expired);
    this.isAuthenticated$?.next(true);
  }
  async setAddress(data: any) {
    console.log(data);
    
    await this.storageService.storeStorage('address', data);
  }

  async isTokenExpired(): Promise<boolean> {
    const expiryDate = await this.storageService.reStorage('token_expired');
    const date = new Date(expiryDate);

    if (date !== null && !isNaN(date.getTime())) {
      const currentDate = new Date();

      if (date < currentDate) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }
  async removeSession() {
    this.storageService.removeStorage('profile')
    this.storageService.removeStorage('token');
    this.navigationService.toLoginPage()
  }
}
