import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatAdminPage } from './chat-admin';

@NgModule({
  declarations: [
    ChatAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatAdminPage),
  ],
})
export class ChatAdminPageModule {}
