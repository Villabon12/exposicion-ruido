import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './tabs.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'info1',
        loadChildren: () => import('../info1/info1.module').then(m => m.Info1PageModule)
      },
      {
        path: 'info2',
        loadChildren: () => import('../info2/info2.module').then(m => m.Info2PageModule)
      },
      {
        path: '',
        redirectTo: '/folder/about/tabs/info1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/folder/about/tabs/info1',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
