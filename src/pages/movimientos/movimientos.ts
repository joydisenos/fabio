import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { LoginPage } from '../login/login';
import { Observable } from 'rxjs';
import { ChatPage } from '../chat/chat';

/**
 * Generated class for the MovimientosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movimientos',
  templateUrl: 'movimientos.html',
})
export class MovimientosPage {

  movimientosRef : AngularFireList<any>;
  movimientos: Observable<any>;

  perfilRef:AngularFireObject<any>;
  perfil = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase) {

    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {

        this.movimientosRef = this.afDatabase.list('usuarios/' + data.uid + '/movimientos');
        this.movimientos = this.movimientosRef.valueChanges();

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

  abrirChat()
  {
    this.navCtrl.push(ChatPage);
  }

}
