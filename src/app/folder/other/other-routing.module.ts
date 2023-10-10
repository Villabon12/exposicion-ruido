import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherPage } from './other.page';

const routes: Routes = [
  {
    path: '',
    component: OtherPage
  },
  {
    path: 'nse',
    loadChildren: () => import('./nse/nse.module').then( m => m.NsePageModule)
  },
  {
    path: 'ctm',
    loadChildren: () => import('./ctm/ctm.module').then( m => m.CtmPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherPageRoutingModule {}
