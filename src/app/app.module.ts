import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreloaderComponent } from './components/common/preloader/preloader.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { SubscribeComponent } from './components/common/subscribe/subscribe.component';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { ContactComponent } from './components/common/contact/contact.component';
import { BlogComponent } from './components/common/blog/blog.component';
import { AppDownloadComponent } from './components/common/app-download/app-download.component';
import { TeamComponent } from './components/common/team/team.component';
import { FaqComponent } from './components/common/faq/faq.component';
import { PricingComponent } from './components/common/pricing/pricing.component';
import { OverviewComponent } from './components/common/overview/overview.component';
import { TestimonialsComponent } from './components/common/testimonials/testimonials.component';
import { AppScreenshotsComponent } from './components/common/app-screenshots/app-screenshots.component';
import { FeaturesComponent } from './components/common/features/features.component';
import { AboutComponent } from './components/common/about/about.component';
import { FunfactsComponent } from './components/common/funfacts/funfacts.component';
import { HowItWorksComponent } from './components/common/how-it-works/how-it-works.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { BlogPageComponent } from './components/pages/blog-page/blog-page.component';

// custome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GooglemapComponent } from './components/common/googlemap/googlemap.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { FacebookComponent } from './components/common/facebook/facebook.component';
import { FacebookModule } from 'ngx-facebook';
import { LeafletComponent } from './components/common/leaflet/leaflet.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NganluongComponent } from './components/pages/nganluong/nganluong.component';
import { GoongmapComponent } from './components/common/goongmap/goongmap.component';
import { PurchasePageComponent } from './components/pages/purchase-page/purchase-page.component';
// import { BillComponent } from './share/modals/bill/bill.component';

// Firebase npm i firebase@8.2.3 & npm i @angular/fire@6.1.4
import { AngularFireModule } from '@angular/fire';
import { FirebaseService } from './services/firebase.service';
import { NgToastModule } from 'ng-angular-popup';

// angularx-social-login
import {SocialAuthServiceConfig, SocialAuthService} from 'angularx-social-login';
import {FacebookLoginProvider} from 'angularx-social-login';
import { PaymentSuccessComponent } from './components/common/payment-success/payment-success.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { BillComponent } from './shared/modals/bill/bill.component';
import { NavLoginComponent } from './shared/modals/nav-login/nav-login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManageAccountComponent } from './components/pages/manage-account/manage-account.component';
import { CustomerInfoComponent } from './components/common/customer-info/customer-info.component';
import { CustomerHistoryComponent } from './components/common/customer-history/customer-history.component';


// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDPY2x3DUHx-Dvl4a65tKlg2oBbV7YECbM",
    authDomain: "citytourist-cea6c.firebaseapp.com",
    projectId: "citytourist-cea6c",
    storageBucket: "citytourist-cea6c.appspot.com",
    messagingSenderId: "586319496318",
    appId: "1:586319496318:web:5458b3b183fff40936842f",
    measurementId: "G-QCS274N6EE"
  };

// i18n
export function HttpLoaderFactory (http: HttpClient){
    return new TranslateHttpLoader (http, './assets/i18n/','.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
    FooterComponent,
    NavbarComponent,
    SubscribeComponent,
    HomeOneComponent,
    HomeTwoComponent,
    HomeThreeComponent,
    ContactComponent,
    BlogComponent,
    AppDownloadComponent,
    TeamComponent,
    FaqComponent,
    PricingComponent,
    OverviewComponent,
    TestimonialsComponent,
    AppScreenshotsComponent,
    FeaturesComponent,
    AboutComponent,
    FunfactsComponent,
    HowItWorksComponent,
    BlogDetailsComponent,
    BlogPageComponent,
    GooglemapComponent,
    FacebookComponent,
    LeafletComponent,
    NganluongComponent,
    GoongmapComponent,
    PurchasePageComponent,
    PaymentSuccessComponent,
    BillComponent,
    NavLoginComponent,
    ManageAccountComponent,
    CustomerInfoComponent,
    CustomerHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgToastModule,
    FacebookModule.forRoot(),
    TranslateModule.forRoot({
        defaultLanguage: 'vi-VN',
        loader:{
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserAnimationsModule,
    NgbModule,

  ],
  providers: [FirebaseService,
    {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false,
          providers: [
            {
              id: FacebookLoginProvider.PROVIDER_ID,
              provider: new FacebookLoginProvider('558517472540828'),
            },
          ],
          onError: (err) => {
            console.error(err);
          },
        } as SocialAuthServiceConfig,
      },
      SocialAuthService,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
