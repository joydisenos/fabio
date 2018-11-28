import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminDetallesPage } from './admin-detalles';

@NgModule({
  declarations: [
    AdminDetallesPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminDetallesPage),
  ],
})
export class AdminDetallesPageModule {}
