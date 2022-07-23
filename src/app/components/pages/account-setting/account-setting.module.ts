import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSettingRoutingModule } from './account-setting-routing.module';
import { AccountSettingComponent } from './account-setting.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


// i18n
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
export function HttpLoaderFactory (http: HttpClient){
    return new TranslateHttpLoader (http, './assets/i18n/','.json');
}

@NgModule({
  declarations: [
    AccountSettingComponent
  ],
  imports: [
    CommonModule,
    AccountSettingRoutingModule,
    TranslateModule.forRoot({
        defaultLanguage: 'vi-VN',
        loader:{
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
  ]
})
export class AccountSettingModule { }
