import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OffStorePage } from './off-store';

@NgModule({
  declarations: [
    OffStorePage,
  ],
  imports: [
    IonicPageModule.forChild(OffStorePage),
  ],
})
export class OffStorePageModule {}
