import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';

/**
 * Generated class for the DetallesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalles',
  templateUrl: 'detalles.html',
})
export class DetallesPage {

  key:string;
  inversionRef:AngularFireObject<any>;
  inversion = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afDatabase: AngularFireDatabase,
              public afAuth: AngularFireAuth) {


    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {

        this.key = this.navParams.get('itemkey');
        console.log(this.key);
        this.inversionRef = this.afDatabase.object('usuarios/' + data.uid + '/inversiones/' + this.key);
        this.inversion = this.inversionRef.snapshotChanges().subscribe(inversion => {
          this.inversion = inversion.payload.val();
        });
    
      }
      else{
        this.navCtrl.setRoot(LoginPage);
      }
    });




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallesPage');
  }

}
