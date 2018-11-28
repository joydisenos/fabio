import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetallesPage } from '../detalles/detalles';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { LoginPage } from '../login/login';
import { ChatPage } from '../chat/chat';

/**
 * Generated class for the InversionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inversiones',
  templateUrl: 'inversiones.html',
})
export class InversionesPage {

  inversionesRef: AngularFireList<any>;
  inversiones: Observable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afDatabase: AngularFireDatabase,
              public afAuth: AngularFireAuth) {

                this.afAuth.authState.subscribe(data => {
                  if(data && data.email && data.uid)
                  {
            
                    this.inversionesRef = this.afDatabase.list('usuarios/' + data.uid + '/inversiones');
                    this.inversiones = this.inversionesRef
                      .snapshotChanges()  
                      .pipe(
                              map(inversiones => 
                                inversiones.map(inversion => ({ 
                                  key: inversion.key, 
                                  ...inversion.payload.val() }))
                              )
                          );
            
                  }
                  else{
                    this.navCtrl.setRoot(LoginPage);
                  }
                });
  }


  abrirDetalles(itemkey)
  {
    this.navCtrl.push(DetallesPage,{itemkey:itemkey});
  }

  abrirChat()
  {
    this.navCtrl.push(ChatPage);
  }

}
