import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { BlogPageComponent } from './components/pages/blog-page/blog-page.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { NganluongComponent } from './components/common/nganluong/nganluong.component';

const routes: Routes = [
    // {path: '', component: HomeOneComponent},
    {path: 'home-one', component: HomeOneComponent},
    {path: '', component: HomeTwoComponent},
    {path: 'home-two', component: HomeTwoComponent},
    {path: 'nganluong', component: NganluongComponent},
    {path: 'home-three', component: HomeThreeComponent},
    {path: 'blog', component: BlogPageComponent},
    {path: 'single-blog', component: BlogDetailsComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
