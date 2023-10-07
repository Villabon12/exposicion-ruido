import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NdePageRoutingModule } from './nde-routing.module';

import { NdePage } from './nde.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NdePageRoutingModule
  ],
  declarations: [NdePage],
})
export class NdePageModule {}
