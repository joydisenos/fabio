import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../home/home';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    public alertCtrl : AlertController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  registroPage()
  {
    this.navCtrl.push(RegistroPage);
  }

   // Login de usuario
   loginUser()
   {
       this.afAuth.auth.signInWithEmailAndPassword(this.user.email,this.user.password ).then((user) => {
         this.navCtrl.setRoot(HomePage);
         }
       )
        .catch(err=>{
         let alert = this.alertCtrl.create({
           title: 'Error',
           subTitle: err.message,
           buttons: ['Aceptar']
         });
         alert.present();
       })
     }

signin(){
  this.afAuth.auth.createUserWithEmailAndPassword(this.user.email,this.user.password)
  .then((user) => {
    this.navCtrl.setRoot(HomePage);
  })
  .catch(err=>{
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: err.message,
      buttons: ['Aceptar']
    });
    alert.present();
  })

}

}
