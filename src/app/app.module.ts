import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from './firebase.config';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CochesPage } from '../pages/coches/coches';
import { InmobiliariasPage } from '../pages/inmobiliarias/inmobiliarias';
import { OffStorePage } from '../pages/off-store/off-store';
import { MovimientosPage } from '../pages/movimientos/movimientos';
import { TarjetaPage } from '../pages/tarjeta/tarjeta';
import { ContactoPage } from '../pages/contacto/contacto';
import { BalancePage } from '../pages/balance/balance';
import { DepositoPage } from '../pages/deposito/deposito';
import { InversionesPage } from '../pages/inversiones/inversiones';
import { DetallesPage } from '../pages/detalles/detalles';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { PerfilPage } from '../pages/perfil/perfil';
import { AdminPage } from '../pages/admin/admin';
import { AdminUsuarioPage } from '../pages/admin-usuario/admin-usuario';
import { ChatPage } from '../pages/chat/chat';
import { ChatAdminPage } from '../pages/chat-admin/chat-admin';
import { AdminDetallesPage } from '../pages/admin-detalles/admin-detalles';
import { EmailComposer } from '@ionic-native/email-composer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CochesPage,
    InmobiliariasPage,
    OffStorePage,
    BalancePage,
    MovimientosPage,
    TarjetaPage,
    DepositoPage,
    ContactoPage,
    InversionesPage,
    DetallesPage,
    LoginPage,
    RegistroPage,
    PerfilPage,
    AdminPage,
    AdminUsuarioPage,
    ChatPage,
    ChatAdminPage,
    AdminDetallesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CochesPage,
    InmobiliariasPage,
    OffStorePage,
    BalancePage,
    MovimientosPage,
    TarjetaPage,
    DepositoPage,
    ContactoPage,
    InversionesPage,
    DetallesPage,
    LoginPage,
    RegistroPage,
    PerfilPage,
    AdminPage,
    AdminUsuarioPage,
    ChatPage,
    ChatAdminPage,
    AdminDetallesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
