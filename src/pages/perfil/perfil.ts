import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ChatPage } from '../chat/chat';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  perfilRef:AngularFireObject<any>;
  perfil = { };


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase) {

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

  actualizarPerfil()
  {
    this.afAuth.authState.subscribe(auth =>{

      this.afDatabase.object('usuarios/' + auth.uid + '/perfil')
                      .set(this.perfil)
                      .then(() => this.navCtrl.setRoot(HomePage));

    })
  }

  abrirChat()
  {
    this.navCtrl.push(ChatPage);
  }

}
