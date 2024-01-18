import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { FeatureModule } from '../feature/feature.module';
import { SwipeItemComponent } from './component/swipe-item/swipe-item.component';
import { SortPipe } from './pipe/sort.pipe';
import { FeatureModule } from "../feature/feature.module";



@NgModule({
    declarations: [SwipeItemComponent, SortPipe],
    exports: [SwipeItemComponent, SortPipe],
    imports: [
        CommonModule,
        IonicModule,
        FeatureModule
    ]
})
export class SwiperModule { }
