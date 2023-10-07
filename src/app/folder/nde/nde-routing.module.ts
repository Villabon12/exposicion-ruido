import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NdePage } from './nde.page';

const routes: Routes = [
  {
    path: '',
    component: NdePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NdePageRoutingModule {}
