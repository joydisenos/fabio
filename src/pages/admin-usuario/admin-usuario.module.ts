import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminUsuarioPage } from './admin-usuario';

@NgModule({
  declarations: [
    AdminUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminUsuarioPage),
  ],
})
export class AdminUsuarioPageModule {}
