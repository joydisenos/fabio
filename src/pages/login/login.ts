import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../home/home';
import { AdminPage } from '../admin/admin';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Perfil } from '../../models/perfil';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user= { email : '', password : ''};
  perfil : AngularFireObject<Perfil>;
  perfilData : Observable<Perfil>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    public alertCtrl : AlertController,
    public afDatabase: AngularFireDatabase,
    public userService: UserServiceProvider ) {

  }

 

  registroPage()
  {
    this.navCtrl.push(RegistroPage);
  }

   // Login de usuario
   loginUser()
   {
       this.afAuth.auth.signInWithEmailAndPassword(this.user.email,this.user.password ).then((user) => {
         this.verificarUsuario();
         }
       )
        .catch(err=>{
         const alert = this.alertCtrl.create({
           title: 'Error',
           subTitle: err.message,
           buttons: ['Aceptar']
         });
         alert.present();
       });
     }

signin(){
  this.navCtrl.push(RegistroPage);
}

verificarUsuario()
{
  this.afAuth.authState.subscribe(data => {
    if(data && data.email && data.uid)
    {
      this.perfil = this.afDatabase.object('usuarios/' + data.uid + '/perfil');
      this.perfilData = this.perfil.valueChanges();
      this.perfilData.subscribe(user => {
        if(user.tipo == 'admin')
        {
          this.navCtrl.setRoot(AdminPage);
        }else{
          this.navCtrl.setRoot(HomePage);
       
        }
      } );

    }
  });
}

}
