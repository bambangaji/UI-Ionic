import { TranslateService } from 'src/app/Services/translate/translate.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {


  constructor(private translateService: TranslateService) {}

  transform(value: string, lang: string, params?: Record<string, any>, ): string {
    /* lang params is only for triggering pipe when config language changed */
    return this.translateService.translation(value, params);;
  }

}
