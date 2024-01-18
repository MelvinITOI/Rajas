import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TokenPageRoutingModule } from './token-routing.module';

import { TokenPage } from './token.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FormHelperModule } from 'src/app/modules/shared/form/form-hepler.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TokenPageRoutingModule,
    SharedModule,
    FormHelperModule
  ],
  declarations: [TokenPage]
})
export class TokenPageModule {}
