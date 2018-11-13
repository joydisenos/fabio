import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CochesPage } from './coches';

@NgModule({
  declarations: [
    CochesPage,
  ],
  imports: [
    IonicPageModule.forChild(CochesPage),
  ],
})
export class CochesPageModule {}
