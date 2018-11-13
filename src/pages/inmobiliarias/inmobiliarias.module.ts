import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InmobiliariasPage } from './inmobiliarias';

@NgModule({
  declarations: [
    InmobiliariasPage,
  ],
  imports: [
    IonicPageModule.forChild(InmobiliariasPage),
  ],
})
export class InmobiliariasPageModule {}
