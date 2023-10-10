import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CtmPageRoutingModule } from './ctm-routing.module';

import { CtmPage } from './ctm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CtmPageRoutingModule
  ],
  declarations: [CtmPage]
})
export class CtmPageModule {}
