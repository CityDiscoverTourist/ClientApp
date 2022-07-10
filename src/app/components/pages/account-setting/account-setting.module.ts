import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSettingRoutingModule } from './account-setting-routing.module';
import { AccountSettingComponent } from './account-setting.component';

@NgModule({
  declarations: [
    AccountSettingComponent
  ],
  imports: [
    CommonModule,
    AccountSettingRoutingModule,
  ]
})
export class AccountSettingModule { }
