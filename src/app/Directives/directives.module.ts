import { NgModule } from '@angular/core';
import { OutsideClickDirective } from '../Directives/outside-click/outside-click.directive';
import { InputRuleDirective } from './input-rule/input-rule.directive';

@NgModule({
  declarations: [
    OutsideClickDirective,
    InputRuleDirective,
  ],
  exports: [
    OutsideClickDirective,
    InputRuleDirective,
  ]
})
export class DirectivesModule {}