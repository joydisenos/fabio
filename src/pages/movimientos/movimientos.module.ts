import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovimientosPage } from './movimientos';

@NgModule({
  declarations: [
    MovimientosPage,
  ],
  imports: [
    IonicPageModule.forChild(MovimientosPage),
  ],
})
export class MovimientosPageModule {}
