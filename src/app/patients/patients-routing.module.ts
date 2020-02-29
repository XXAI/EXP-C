import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from "./index/index.component";

const routes: Routes = [
  {
    path:'',
    component: IndexComponent,
    redirectTo: 'del-dia'
  },
  {
    path: 'del-dia',
    component: IndexComponent
  },
  {
    path: 'todos',
    component: IndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
