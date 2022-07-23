import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

// i18n
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory (http: HttpClient){
    return new TranslateHttpLoader (http, './assets/i18n/','.json');
}

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FontAwesomeModule,
    FormsModule,
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
export class ProfileModule { }
