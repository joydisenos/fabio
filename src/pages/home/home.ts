import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetallesPage } from '../detalles/detalles';
import * as HighCharts from 'highcharts';
import { MovimientosPage } from '../movimientos/movimientos';
import { DepositoPage } from '../deposito/deposito';
import { InversionesPage } from '../inversiones/inversiones';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Perfil } from '../../models/perfil';
import { AdminPage } from '../admin/admin';
import { LoginPage } from '../login/login';
import { map } from 'rxjs/operators';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1Root = HomePage;
  tab2Root = MovimientosPage;
  tab3Root = DepositoPage;
  tab4Root = InversionesPage;
  perfil : AngularFireObject<Perfil>;
  perfilData : Observable<Perfil>;
  inversionesRef: AngularFireList<any>;
  inversiones: Observable<any>;
  disponible:any;
  movimientosRef: AngularFireList<any>;
  movimientos = {};
  abonos:any;
  arreglo1 = [];

  constructor(public navCtrl: NavController,
              public afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase) {

    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {
        this.perfil = this.afDatabase.object('usuarios/' + data.uid + '/perfil');
        this.perfilData = this.perfil.valueChanges();
        this.perfilData.subscribe(user => {
            this.disponible = user.disponible;
          if(user.tipo == 'admin')
          {
            this.navCtrl.setRoot(AdminPage);
          }
        } );

        this.inversionesRef = this.afDatabase.list('usuarios/' + data.uid + '/inversiones');
        this.inversiones = this.inversionesRef
          .snapshotChanges()  
          .pipe(
                  map(inversiones => 
                    inversiones.map(inversion => ({ 
                      key: inversion.key, 
                      ...inversion.payload.val() }))
                  )
              );


        this.movimientosRef = this.afDatabase.list('usuarios/' + data.uid + '/movimientos/');
        this.movimientos = this.movimientosRef.valueChanges();

        this.abonos = this.movimientos;

        this.abonos.forEach(abono => {
          
          abono.forEach(item => {
              this.arreglo1.push(parseFloat(item.cantidad));
          });
          
        });

        

          console.log(this.arreglo1);
          

      }   
      else{
        this.navCtrl.setRoot(LoginPage);
      }
    });

  }



  ionViewDidEnter() {
  

    var myChart = HighCharts.chart('container', {
      chart: {
        type: 'spline',
        height: '200px'
      },
      title: {
        text: ''
      },
     
      yAxis: {
        title: {
          text: ''
        }
      },
      series: [{
        name: 'Ingresos',
        data: [Math.floor((Math.random() * 500) + 1),
          Math.floor((Math.random() * 500) + 1),
          Math.floor((Math.random() * 500) + 1),
          Math.floor((Math.random() * 500) + 1),
          Math.floor((Math.random() * 500) + 1)] ,
        color: "#D4AF37"
      },
      {
        name: 'Gastos',
        data: [Math.floor((Math.random() * 500) + 1),
          Math.floor((Math.random() * 500) + 1),
          Math.floor((Math.random() * 500) + 1),
          Math.floor((Math.random() * 500) + 1),
          Math.floor((Math.random() * 500) + 1)],
        color: "#000000"
      },
    ]
    });
    
  }

  abrirDetalles(itemkey)
  {
    this.navCtrl.push(DetallesPage,{itemkey:itemkey});
  }

  abrirChat()
  {
    this.navCtrl.push(ChatPage);
  }

}
