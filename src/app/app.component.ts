import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { InversionesPage } from '../pages/inversiones/inversiones';
import { MovimientosPage } from '../pages/movimientos/movimientos';
import { TarjetaPage } from '../pages/tarjeta/tarjeta';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from '@angular/fire/auth';
import { PerfilPage } from '../pages/perfil/perfil';
import { DepositoPage } from '../pages/deposito/deposito';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  perfilRef:AngularFireObject<any>;
  perfil = {};

  constructor(private afAuth: AngularFireAuth,
              public platform: Platform,
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public afDatabase: AngularFireDatabase) {

    this.initializeApp();

    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {
        this.perfilRef = this.afDatabase.object('usuarios/' + data.uid + '/perfil');
        this.perfil = this.perfilRef.snapshotChanges().subscribe(perfil => {
          this.perfil = perfil.payload.val();
        });
    
      }
    });

    this.pages = [

      { title: 'Inicio', component: HomePage },
      { title: 'Perfil', component: PerfilPage },
      { title: 'Inversiones', component: InversionesPage },
      { title: 'Retiro', component: DepositoPage },
      { title: 'Movimientos', component: MovimientosPage },
      { title: 'Asociar Cuenta', component: TarjetaPage }
    ];


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logOut()
  {
    return this.afAuth.auth.signOut().
    then(() =>
    {
      this.nav.setRoot(LoginPage);
    });
  }

}
