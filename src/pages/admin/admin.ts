import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
              public afAuth: AngularFireAuth) {

    this.usuariosRef = this.afDatabase.list('usuarios');
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

}
