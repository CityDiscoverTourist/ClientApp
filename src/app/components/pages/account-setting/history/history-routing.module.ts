import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history.component';

const routes: Routes = [
    {
        path: "",
        component: HistoryComponent,
        // data: { title: "Danh sách quest", url: "quest" },
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
