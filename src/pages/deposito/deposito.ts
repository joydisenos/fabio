import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ChatPage } from '../chat/chat';
import { EmailComposer } from '@ionic-native/email-composer';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the DepositoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deposito',
  templateUrl: 'deposito.html',
})
export class DepositoPage {

movimiento = {
  cantidad:'',
  tipo:'retiro',
  estatus:'pendiente',
  concepto:'Retiro de Fondos'
};
perfilRef: AngularFireObject<any>;
perfil:any = {};
deposito={
  cantidad:'',
  tipo:'abono',
  estatus:'pendiente',
  concepto:''
};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase,
              public alertCtrl : AlertController,
              private userService: UserServiceProvider) {

                

                this.afAuth.authState.subscribe(data => {
                  if(data && data.email && data.uid)
                  {
            
                    this.perfilRef = this.afDatabase.object('usuarios/' + data.uid + '/perfil');
                    this.perfil = this.perfilRef.snapshotChanges().subscribe(perfil => {
                      this.perfil = perfil.payload.val();
                    });

                  }
                  else{
                    this.navCtrl.setRoot(LoginPage);
                  }
                });
  }

  solicitarRetiro()
  {
    console.log(this.perfil.disponible);
    console.log(this.movimiento.cantidad);

    const solicitado = parseFloat(this.movimiento.cantidad);
    const balance = parseFloat(this.perfil.disponible);

    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {

        if (balance >= solicitado)
        {
          this.afDatabase.list('usuarios/' + data.uid + '/movimientos')
                        .push(this.movimiento);

                        const alert = this.alertCtrl.create({
                          title: 'Solicitud de retiro enviada',
                          subTitle: 'Su solicitud será procesada en breve',
                          buttons: ['Aceptar']
                        });
                        alert.present();
        this.navCtrl.setRoot(HomePage);

        const mail = {
          
          asunto: 'Solicitud de Retiro',
          mensaje: 'El Usuario ' + this.perfil.nombre +' '+ this.perfil.apellido  + ' ha solicitado un retiro de €' + this.movimiento.cantidad
        };

      this.userService.mail(mail).subscribe(
        (data) => { // Success
          console.log('mailing');
        },
        (error) =>{
          console.error(error);
        });


      }else{
        const alert = this.alertCtrl.create({
          title: 'Monto Excedido',
          subTitle: 'La cantidad solicitada no puede ser mayor a la cantidad disponible',
          buttons: ['Aceptar']
        });
        alert.present();
      }
    
      }
      else{
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

  notificarAbono()
  {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {

        this.afDatabase.list('usuarios/' + data.uid + '/movimientos')
                        .push(this.deposito);

                        const alert = this.alertCtrl.create({
                          title: 'Solicitud de abono enviada',
                          subTitle: 'Su solicitud será procesada en breve',
                          buttons: ['Aceptar']
                        });
                        alert.present();
        this.navCtrl.setRoot(HomePage);

        const mail = {
          asunto: 'Abono Registrado',
          mensaje: 'El Usuario ' + this.perfil.nombre +' '+ this.perfil.apellido  + ' ha notificado un nuevo abono'
        };
        
        this.userService.mail(mail).subscribe(
          (data) => { // Success
            console.log('mailing');
          },
          (error) =>{
            console.error(error);
          });
    
      }
      else{
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

  abrirChat()
  {
    this.navCtrl.push(ChatPage);
  }

}
