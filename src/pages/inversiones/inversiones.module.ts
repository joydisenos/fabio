import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InversionesPage } from './inversiones';

@NgModule({
  declarations: [
    InversionesPage,
  ],
  imports: [
    IonicPageModule.forChild(InversionesPage),
  ],
})
export class InversionesPageModule {}
