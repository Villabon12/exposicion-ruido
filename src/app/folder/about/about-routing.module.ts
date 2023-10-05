import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutPage } from './about.page';

const routes: Routes = [
  {
    path: '',
    component: AboutPage
  },
  {
    path: 'info1',
    loadChildren: () => import('./info1/info1.module').then( m => m.Info1PageModule)
  },
  {
    path: 'info2',
    loadChildren: () => import('./info2/info2.module').then( m => m.Info2PageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutPageRoutingModule {}
