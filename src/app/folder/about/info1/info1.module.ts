import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Info1PageRoutingModule } from './info1-routing.module';

import { Info1Page } from './info1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Info1PageRoutingModule
  ],
  declarations: [Info1Page]
})
export class Info1PageModule {}
