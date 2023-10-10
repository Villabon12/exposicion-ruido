import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NsePageRoutingModule } from './nse-routing.module';

import { NsePage } from './nse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NsePageRoutingModule
  ],
  declarations: [NsePage]
})
export class NsePageModule {}
