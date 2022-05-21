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
import { HttpClientModule } from '@angular/common/http';
import { GooglemapComponent } from './components/common/googlemap/googlemap.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
