import { TLanguage } from 'src/app/Interfaces/index.interface';
import { StorageService } from 'src/app/Services/storage/storage.service';
import { Injectable } from "@angular/core";
import * as idJson from 'src/assets/lang/id.json';
import * as enJson from 'src/assets/lang/en.json';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  lang: TLanguage = 'id';

  constructor(private storageService: StorageService) {
    this.loadLanguage();
  }

  setLanguage(value: TLanguage): Promise<void> {
    this.lang = value;
    return this.storageService.storeStorage('language', value);
  }

  translation(label: string, params?: any): string {
    let lang: string = 'id';
    if(this.lang === 'en' || this.lang === 'id') {
      lang = this.lang;
    }

    const content = {
      'en' : enJson,
      'id' : idJson
    }

    try {
      let translated = (content as any)[lang][label];
      
      if (params) {
        Object.keys(params).forEach((key) => {
          const regex = new RegExp(`{{${key}}}`);
          translated = (translated as string).replace(regex, params[key]);
        });
      };

      if (!translated) {
        translated = label;
      };

      return translated;
    } catch (error) {
      if((content as any)['id'][label] != undefined && (content as any)['id'][label] != null) {
        return (content as any)['id'][label];
      }
      else {
        return label;
      }
    }
  }

  private async loadLanguage(): Promise<void> {
    this.lang = await this.getDefaultLanguage();
  }

  private async getDefaultLanguage(): Promise<TLanguage> {
    return await this.storageService.reStorage('language') ?? 'id';
  }

}
