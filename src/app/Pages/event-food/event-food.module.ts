import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EventFoodPageRoutingModule } from './event-food-routing.module';
import { EventFoodPage } from './event-food.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventFoodPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [EventFoodPage]
})
export class EventFoodPageModule {}
