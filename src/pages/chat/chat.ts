import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginPage } from '../login/login';
import { Perfil } from '../../models/perfil';
import { UserServiceProvider } from '../../providers/user-service/user-service';

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
  perfil : AngularFireObject<Perfil>;
  perfilData : Observable<Perfil>;
  usuario: any;

  mensaje = {
    mensaje:'',
    user:'yo'
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afDatabase: AngularFireDatabase,
              public afAuth: AngularFireAuth,
              private userService: UserServiceProvider) {

                this.afAuth.authState.subscribe(data => {
                  if(data && data.email && data.uid)
                  {

                    this.perfil = this.afDatabase.object('usuarios/' + data.uid + '/perfil');
                    this.perfilData = this.perfil.valueChanges();
                    this.perfilData.subscribe(user => {
                      
                        this.usuario = {
                          nombre : user.nombre,
                          apellido: user.apellido,
                        };

                    } );
            
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

            const mail = {
              asunto: 'Mensaje de: ' + this.usuario.nombre + ' ' + this.usuario.apellido,
              mensaje: this.mensaje.mensaje
          };

          this.userService.mail(mail).subscribe(
            (data) => { // Success
              console.log('mailing');
            },
            (error) =>{
              console.error(error);
            });

        this.mensaje.mensaje = '';
       

      }
      else{
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

}
