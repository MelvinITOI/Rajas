import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './component/header/header.component';
import { FormHelperModule } from './form/form-hepler.module';
// import { FormHelperModule } from "./shared/form/form-hepler.module";



@NgModule({
    declarations: [
      HeaderComponent,
    ],
    exports: [HeaderComponent,],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        FormHelperModule
    ]
})
export class SharedModule { }
