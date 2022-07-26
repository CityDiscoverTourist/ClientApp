import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSettingRoutingModule } from './account-setting-routing.module';
import { AccountSettingComponent } from './account-setting.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


// i18n
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { PasswordChangingComponent } from './password-changing/password-changing.component';
export function HttpLoaderFactory (http: HttpClient){
    return new TranslateHttpLoader (http, './assets/i18n/','.json');
}

@NgModule({
  declarations: [
    AccountSettingComponent,
    // PasswordChangingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AccountSettingRoutingModule,
    TranslateModule.forRoot({
        defaultLanguage: 'vi-VN',
        loader:{
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountSettingModule { }
