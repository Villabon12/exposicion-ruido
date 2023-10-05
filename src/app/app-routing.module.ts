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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
