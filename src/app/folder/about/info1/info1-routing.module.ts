import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Info1Page } from './info1.page';

const routes: Routes = [
  {
    path: '',
    component: Info1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Info1PageRoutingModule {}
