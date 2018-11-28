import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  mensajesRef:AngularFireList<any>;
  mensajes:Observable<any>;

  mensaje = {
    mensaje:'',
    user:'yo'
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afDatabase: AngularFireDatabase,
              public afAuth: AngularFireAuth) {

                this.afAuth.authState.subscribe(data => {
                  if(data && data.email && data.uid)
                  {
            
                    this.mensajesRef = this.afDatabase.list('usuarios/' + data.uid + '/mensajes');
                    this.mensajes = this.mensajesRef
                      .snapshotChanges()  
                      .pipe(
                              map(mensajes => 
                                mensajes.map(mensaje => ({ 
                                  key: mensaje.key, 
                                  ...mensaje.payload.val() }))
                              )
                          );
            
                  }
                  else{
                    this.navCtrl.setRoot(LoginPage);
                  }
                });
  }

  enviarMensaje()
  {

    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {

        this.afDatabase.list('usuarios/' + data.uid + '/mensajes')
                            .push(this.mensaje);
        this.mensaje.mensaje = '';
       

      }
      else{
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

}
