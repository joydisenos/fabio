import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ChatPage } from '../chat/chat';
import { EmailComposer } from '@ionic-native/email-composer';

/**
 * Generated class for the DepositoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deposito',
  templateUrl: 'deposito.html',
})
export class DepositoPage {

movimiento = {
  cantidad:'',
  tipo:'retiro',
  estatus:'pendiente',
  concepto:'Retiro de Fondos'
};
perfilRef: AngularFireObject<any>;
perfil = {};
deposito={
  cantidad:'',
  tipo:'abono',
  estatus:'pendiente',
  concepto:''
};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase,
              public alertCtrl : AlertController,
              public emailComposer: EmailComposer) {

                

                this.afAuth.authState.subscribe(data => {
                  if(data && data.email && data.uid)
                  {
            
                    this.perfilRef = this.afDatabase.object('usuarios/' + data.uid + '/perfil');
                    this.perfil = this.perfilRef.snapshotChanges().subscribe(perfil => {
                      this.perfil = perfil.payload.val();
                    });

                  }
                  else{
                    this.navCtrl.setRoot(LoginPage);
                  }
                });
  }

  solicitarRetiro()
  {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {

        this.afDatabase.list('usuarios/' + data.uid + '/movimientos')
                        .push(this.movimiento);

                        let alert = this.alertCtrl.create({
                          title: 'Solicitud de retiro enviada',
                          subTitle: 'Su solicitud será procesada en breve',
                          buttons: ['Aceptar']
                        });
                        alert.present();
        this.navCtrl.setRoot(HomePage);

        let email = {
          to: 'info@ffvanc.com',
          subject: 'Solicitud de Retiro',
          body: 'El Usuario' + this.perfil.nombre +' '+ this.perfil.apellido  + 'ha solicitado un retiro de €' + this.movimiento.cantidad,
          isHtml: true
        };
        
        // Send a text message using default options
        this.emailComposer.open(email);
    
      }
      else{
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

  notificarAbono()
  {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {

        this.afDatabase.list('usuarios/' + data.uid + '/movimientos')
                        .push(this.deposito);

                        let alert = this.alertCtrl.create({
                          title: 'Solicitud de abono enviada',
                          subTitle: 'Su solicitud será procesada en breve',
                          buttons: ['Aceptar']
                        });
                        alert.present();
        this.navCtrl.setRoot(HomePage);

        let abono = {
          to: 'info@ffvanc.com',
          subject: 'Abono Registrado',
          body: 'El Usuario' + this.perfil.nombre +' '+ this.perfil.apellido  + 'ha notificado un nuevo abono',
          isHtml: true
        };
        
        // Send a text message using default options
        this.emailComposer.open(abono);
    
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
