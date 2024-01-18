import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDoubleClickDirective } from './directives/no-double-click.directive';
import { FilterPipe } from '../pipe/filter.pipe';




@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ NoDoubleClickDirective,FilterPipe,],
  imports: [
    CommonModule,

  ],
  exports:[NoDoubleClickDirective,FilterPipe]
})
export class FeatureModule { }
