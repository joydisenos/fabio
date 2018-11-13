import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositoPage } from './deposito';

@NgModule({
  declarations: [
    DepositoPage,
  ],
  imports: [
    IonicPageModule.forChild(DepositoPage),
  ],
})
export class DepositoPageModule {}
