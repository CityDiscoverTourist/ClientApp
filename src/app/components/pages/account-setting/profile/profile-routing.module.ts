import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
    {
        path: "",
        component: ProfileComponent,
        // data: { title: "Danh sách quest", url: "quest" },
    },
    {
        path: "profile",
        component: ProfileComponent,
        // data: { title: "Danh sách quest", url: "quest" },
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
