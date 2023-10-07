import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';  // Asegúrate de importar IonicModule
import { TabsRoutingModule } from './tabs-routing.module';
import { TabsComponent } from './tabs.component';

@NgModule({
  declarations: [TabsComponent],
  imports: [
    CommonModule,
    IonicModule,  // Añade IonicModule a la lista de imports
    TabsRoutingModule
  ]
})
export class TabsModule { }
