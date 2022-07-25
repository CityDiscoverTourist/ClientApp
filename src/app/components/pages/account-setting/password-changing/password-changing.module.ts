import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordChangingRoutingModule } from './password-changing-routing.module';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

// i18n
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory (http: HttpClient){
    return new TranslateHttpLoader (http, './assets/i18n/','.json');
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PasswordChangingRoutingModule,
    TranslateModule.forRoot({
        defaultLanguage: 'vi-VN',
        loader:{
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PasswordChangingModule { }
