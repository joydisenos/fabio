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
import { LoginPage } from '../login/login';
import { map } from 'rxjs/operators';
import { ChatPage } from '../chat/chat';
import { AdminPage } from '../admin/admin';

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
  movimiento : AngularFireObject<any>;
  movimientoRef : Observable<any>;
  inversionesRef: AngularFireList<any>;
  inversiones: Observable<any>;
  disponible:any;
  total:any;
  movimientosRef: AngularFireList<any>;
  movimientos = {};
  movimientos2Ref: AngularFireList<any>;
  movimientos2 = {};
  abonos:any;
  abonos2:any;
  arreglo1 :Array<number> = [];
  arreglo2 :Array<number> = [];
  numero1 = '';
  numero2 = '';

  constructor(public navCtrl: NavController,
              public afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase) {

    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid)
      {
        this.perfil = this.afDatabase.object('usuarios/' + data.uid + '/perfil');
        this.perfilData = this.perfil.valueChanges();
        this.perfilData.subscribe(user => {
          if(user.tipo == 'admin')
          {
            this.navCtrl.setRoot(AdminPage);
          }
            this.disponible = user.disponible;
            this.total = user.total;

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


        this.movimientosRef = this.afDatabase.list('usuarios/' + data.uid + '/movimientos/' , 
        ref => ref.orderByChild('tipo').equalTo('abono'));
        this.movimientos = this.movimientosRef.snapshotChanges()
        .pipe(
          map(movimientos => 
            movimientos.map(movimiento => ({ 
              key: movimiento.key, 
              ...movimiento.payload.val() }))
          )
      );
        this.abonos = this.movimientos;

        this.abonos.forEach(abono => {
          
              abono.forEach((item , key) => {
                  
                  this.arreglo1[key] = parseFloat(item.cantidad);
                  
              });
          
        });


        this.movimientos2Ref = this.afDatabase.list('usuarios/' + data.uid + '/movimientos/',
        ref => ref.orderByChild('tipo').equalTo('retiro'));
        this.movimientos2 = this.movimientos2Ref.snapshotChanges()
        .pipe(
          map(movimientos => 
            movimientos.map(movimiento => ({ 
              key: movimiento.key, 
              ...movimiento.payload.val() }))
          )
      );
        this.abonos2 = this.movimientos2;

        this.abonos2.forEach(abono => {
          
              abono.forEach((item , key) => {
                  
                  this.arreglo2[key] = parseFloat(item.cantidad);
                  
              });
          
        });

      }   
      else{
        this.navCtrl.setRoot(LoginPage);
      }
    });

  }


  ionViewDidEnter() {
  
    let myChart = HighCharts.chart('grafico', {
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
        data : this.arreglo1 ,
        color: "#D4AF37"
      },
      {
        name: 'Gastos',
        data: this.arreglo2 ,
        color: "#000000"
      },
    ]
    });

    myChart;
    
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
