import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../home/home';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoginPage } from '../login/login';
import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  user= { email : '', 
          password : '',
          nombre:'',
          apellido:'',
          fecha:'',
          domicilio:'',
          tipo:'',
          disponible:''
        };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase,
              public alertCtrl : AlertController,
              public emailComposer: EmailComposer) {
  }

  registro()
  {
    if(this.user.nombre != '' && this.user.apellido != '' && this.user.domicilio != '')
    {
    this.afAuth.auth.createUserWithEmailAndPassword(this.user.email,this.user.password)
        .then((user) => {

          this.afAuth.authState.subscribe(data => {
            if(data && data.email && data.uid)
            {

              this.afDatabase.object( 'usuarios/' + data.uid ).set({
                tipo:'user',
              });

              
              this.afDatabase.object( 'usuarios/' + data.uid + '/perfil').set({
                nombre: this.user.nombre,
                apellido: this.user.apellido,
                fecha: this.user.fecha,
                domicilio: this.user.domicilio,
                tipo:'user',
                disponible:0,
                total:0
              });

              

              this.afDatabase.object( 'usuarios/' + data.uid + '/cuenta').set({
                nombre: this.user.nombre + ' ' + this.user.apellido,
                numero: '',
                tarjeta: '',
                direccion: ''
              });

              this.navCtrl.setRoot(HomePage);

              const email = {
                to: ['info@ffvanc.com', 'administracion@ffvanc.com'],
                subject: 'Nuevo Registro de Usuario',
                body: 'El Usuario' + this.user.nombre +' '+ this.user.apellido  + 'se Ha registrado en la aplicación',
                isHtml: true
              };
              
              // Send a text message using default options
              this.emailComposer.open(email);

          
            }
            else{
              this.navCtrl.setRoot(LoginPage);
            }
          });

          
        })
        .catch(err=>{
          const alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: err.message,
            buttons: ['Aceptar']
          });
          alert.present();
        });
      }else{
        const alert = this.alertCtrl.create({
          title: 'Complete Todos los Campos',
          subTitle: 'Todos los campos son requeridos',
          buttons: ['Aceptar']
        });
        alert.present();
      }
  }

}
