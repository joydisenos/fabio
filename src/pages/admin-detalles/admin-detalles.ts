import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';


@IonicPage()
@Component({
  selector: 'page-admin-detalles',
  templateUrl: 'admin-detalles.html',
})
export class AdminDetallesPage {

  params:any;
  inversionRef : AngularFireObject<any>;
  inversion = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afDatabase: AngularFireDatabase,
              public alertCtrl: AlertController) {

    this.params = navParams.data;

    this.inversionRef = this.afDatabase.object(
      'usuarios/' 
      + this.params.userkey 
      + '/inversiones/' 
      + this.params.inversionkey);

    this.inversion = this.inversionRef.snapshotChanges()
                      .subscribe(inversion => {
                        this.inversion = inversion.payload.val();
                      });

  }

  actualizarInversion()
  {
    this.afDatabase.object(
      'usuarios/' 
      + this.params.userkey 
      + '/inversiones/' 
      + this.params.inversionkey).update(this.inversion);

      const alert = this.alertCtrl.create({
        title: 'Actualizada',
        subTitle: 'Inversión Modificada con Éxito',
        buttons: ['Aceptar']
      });
      alert.present();

      this.navCtrl.pop();
  }


}
