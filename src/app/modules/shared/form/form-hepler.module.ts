import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from '../../swiper/swiper.module';
import { DataListComponent } from './component/data-list/data-list.component';
import { ConditionOperatorPipe } from './pipe/condtion-operator.pipe';
import { CurrencyFormatPipe } from './pipe/currency-format.pipe';
import { FormControlActionPipe } from './pipe/form-control-action.pipe';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import { TransformArrayPipe } from './pipe/transform-array.pipe';

@NgModule({
    declarations: [
        ConditionOperatorPipe,
        TransformArrayPipe,
        FormControlActionPipe,
        CurrencyFormatPipe,
        SafeHtmlPipe,
        DataListComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        SwiperModule,
        ReactiveFormsModule,
        
    ],
    exports: [ ConditionOperatorPipe, CurrencyFormatPipe,SafeHtmlPipe,DataListComponent],
})
export class FormHelperModule { }
