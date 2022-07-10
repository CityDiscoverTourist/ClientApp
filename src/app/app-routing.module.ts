import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { BlogPageComponent } from './components/pages/blog-page/blog-page.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { NganluongComponent } from './components/pages/nganluong/nganluong.component';
import { PurchasePageComponent } from './components/pages/purchase-page/purchase-page.component';
import { PaymentSuccessComponent } from './components/common/payment-success/payment-success.component';
import { ManageAccountComponent } from './components/pages/manage-account/manage-account.component';
import { CustomerInfoComponent } from './components/common/customer-info/customer-info.component';
import { CustomerHistoryComponent } from './components/common/customer-history/customer-history.component';

const routes: Routes = [
    // {path: '', component: HomeOneComponent},
    {path: 'home-one', component: HomeOneComponent},
    {path: '', component: HomeTwoComponent},
    {path: 'home-two', component: HomeTwoComponent},
    {path: 'home-three', component: HomeThreeComponent},
    // {path: 'blog', component: BlogPageComponent},
    {path: 'quest', component: BlogPageComponent},
    // {path: 'single-blog', component: BlogDetailsComponent},
    {path: 'single-quest', component: BlogDetailsComponent},
    {path: 'nganluong_f111ad9929ddee3beb48e08f1c7fbb4f.html', component: NganluongComponent},
    {path: 'purchase-page', component: PurchasePageComponent},
    {path: 'thank', component: PaymentSuccessComponent},
    {path: 'manage-account', component: ManageAccountComponent},
    {path: 'account-info', component: CustomerInfoComponent},
    {path: 'account-history', component: CustomerHistoryComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
