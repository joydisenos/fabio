import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { LoginPage } from '../login/login';
import { ChatPage } from '../chat/chat';

/**
 * Generated class for the TarjetaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tarjeta',
  templateUrl: 'tarjeta.html',
})
export class TarjetaPage {

  cuentaRef:AngularFireObject<any>;
  cuenta = { };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase,
              public alertCtrl : AlertController) {

                this.afAuth.authState.subscribe(data => {
                  if(data && data.email && data.uid)
                  {
            
                    this.cuentaRef = this.afDatabase.object('usuarios/' + data.uid + '/cuenta');
                    this.cuenta = this.cuentaRef.snapshotChanges().subscribe(perfil => {
                      this.cuenta = perfil.payload.val();
                    });
                
                  }
                  else{
                    this.navCtrl.setRoot(LoginPage);
                  }
                });
              }
 

  registrarTarjeta()
  {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {
        this.afDatabase.object('usuarios/' + data.uid + '/cuenta')
                        .set(this.cuenta);

        let alert = this.alertCtrl.create({
          title: 'Cuenta Registrada',
          subTitle: 'Su cuenta fué registrada con éxito',
          buttons: ['Aceptar']
        });
        alert.present();
    
      }
      else{
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

  abrirChat()
  {
    this.navCtrl.push(ChatPage);
  }

}