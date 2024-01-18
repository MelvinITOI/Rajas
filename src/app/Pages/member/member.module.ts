import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemberPageRoutingModule } from './member-routing.module';

import { MemberPage } from './member.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MemberPageRoutingModule
  ],
  declarations: [MemberPage]
})
export class MemberPageModule {}
