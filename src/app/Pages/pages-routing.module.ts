import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlServices } from '../helper/utility/urlservices';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('../Pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('../Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'token',
    loadChildren: () => import('./token/token.module').then( m => m.TokenPageModule)
  },
  {
    path: UrlServices.AUTH_PAGE.PROFILE.split(/[/]+/).pop(),
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'barcode',
    loadChildren: () => import('./barcode/barcode.module').then( m => m.BarcodePageModule)
  },
  {
    path: 'member',
    loadChildren: () => import('./member/member.module').then( m => m.MemberPageModule)
  },
  {
    path: 'event-food',
    loadChildren: () => import('./event-food/event-food.module').then( m => m.EventFoodPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
