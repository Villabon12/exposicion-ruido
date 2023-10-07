import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inicio',
    pathMatch: 'full'
  },  
  {
    path: 'folder/inicio',
    loadChildren: () => import('./folder/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'folder/about',
    loadChildren: () => import('./folder/about/tabs/tabs.module').then( m => m.TabsModule)
  },
  {
    path: 'folder/nde',
    loadChildren: () => import('./folder/nde/nde.module').then( m => m.NdePageModule)
  },
  {
    path: 'folder/other',
    loadChildren: () => import('./folder/other/other.module').then( m => m.OtherPageModule)
  },
  {
    path: 'folder/recursos',
    loadChildren: () => import('./folder/recursos/recursos.module').then( m => m.RecursosPageModule)
  },
  {
    path: 'folder/spam',
    loadChildren: () => import('./folder/spam/spam.module').then( m => m.SpamPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
