import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NsePage } from './nse.page';

const routes: Routes = [
  {
    path: '',
    component: NsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NsePageRoutingModule {}
