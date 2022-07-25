import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordChangingComponent } from './password-changing.component';

const routes: Routes = [
    {
        path: "",
        component: PasswordChangingComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordChangingRoutingModule { }
