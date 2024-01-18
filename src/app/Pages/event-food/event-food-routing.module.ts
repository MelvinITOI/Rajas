import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventFoodPage } from './event-food.page';

const routes: Routes = [
  {
    path: '',
    component: EventFoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventFoodPageRoutingModule {}
