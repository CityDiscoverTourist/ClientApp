import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingComponent } from './account-setting.component';

const routes: Routes = [
    {
      path: '',
      component: AccountSettingComponent,
      children: [
        {
          path: '',
          loadChildren: () =>
            import('./profile/profile.module').then(
              (m) => m.ProfileModule
            ),
        },
        {
          path: 'profile',
          loadChildren: () =>
            import('./profile/profile.module').then(
              (m) => m.ProfileModule
            ),
        },
        {
            path: 'history',
            loadChildren: () =>
              import('./history/history.module').then(
                (m) => m.HistoryModule
              ),
          },
      ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingRoutingModule { }
