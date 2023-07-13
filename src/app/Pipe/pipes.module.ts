import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { TranslatePipe } from './translate/translate.pipe';
import { TotalReducerPipe } from './total-reducer/total-reducer.pipe';
import { ArrayFilterPipe } from './array-filter/array-filter.pipe';
import { ArraySearchPipe } from './array-search/array-search.pipe';
import { InisialNamePipe } from './inisialName/inisial-name.pipe';
import { GetCodeCountryPipe } from './get-code-country/get-code-country.pipe';
import { TimeFormatPipe } from './time-format/time-format.pipe';
import { TimeFormattedPipe } from './time-formatted/time-formatted.pipe';

@NgModule({
  declarations:[
    TranslatePipe,
    TotalReducerPipe,
    ArrayFilterPipe,
    ArraySearchPipe,
    InisialNamePipe,
    GetCodeCountryPipe,
    TimeFormatPipe,
    TimeFormattedPipe,
  ],
  imports:[CommonModule],
  exports:[
    TranslatePipe,
    TotalReducerPipe,
    ArrayFilterPipe,
    ArraySearchPipe,
    InisialNamePipe,
    GetCodeCountryPipe,
    TimeFormatPipe,
    TimeFormattedPipe
  ],
})

export class PipesModule{};
