import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AdminUsuarioPage } from '../admin-usuario/admin-usuario';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  usuariosRef:AngularFireList<any>;
  usuarios:Observable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afDatabase: AngularFireDatabase,
              public actionSheet: ActionSheetController,
              public afAuth: AngularFireAuth,
              public alertCtrl: AlertController) {

    this.usuariosRef = this.afDatabase.list('usuarios',
    ref => ref.orderByChild('tipo').equalTo('user'));
    this.usuarios = this.usuariosRef
          .snapshotChanges()  
          .pipe(
                  map(usuarios => 
                    usuarios.map(usuario => ({ 
                      key: usuario.key, 
                      ...usuario.payload.val() }))
                  )
              );


  }

  abrirUsuario(key)
  {

    this.navCtrl.push(AdminUsuarioPage , {key:key});
  }

  abrirOpciones(key)
  {
    const actionSheet = this.actionSheet.create({
      title: 'Acciones',
      buttons: [
        {
          text: 'Ver Detalles',
          handler: () => {
            this.abrirUsuario(key);
          }
        },{
          text: 'Eliminar Usuario',
          handler: () => {
            this.afDatabase.object(
              'usuarios/' 
              + key).update({
                tipo:'eliminado'
              });


              const alert = this.alertCtrl.create({
                title: 'Usuario Eliminado',
                subTitle: 'El usuario fué eliminado con éxito',
                buttons: ['Aceptar']
              });
              alert.present();
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
           
          }
        }
      ]
    });
    actionSheet.present();
  }

}
