import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetallesPage } from '../detalles/detalles';
import * as HighCharts from 'highcharts';
import { MovimientosPage } from '../movimientos/movimientos';
import { DepositoPage } from '../deposito/deposito';
import { InversionesPage } from '../inversiones/inversiones';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1Root = HomePage;
  tab2Root = MovimientosPage;
  tab3Root = DepositoPage;
  tab4Root = InversionesPage;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
   
    var myChart = HighCharts.chart('container', {
      chart: {
        type: 'spline',
        height: '200px'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['Julio','Agosto','Septiembre','Octubre', 'Noviembre', 'Diciembre']
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      series: [{
        name: 'Ingresos',
        data: [23,2344,45,100, 560, 1000],
        color: "#D4AF37"
      },
      {
        name: 'Gastos',
        data: [23,456,65,400, 450, 470],
        color: "#000000"
      },
    ]
    });
    
  }

  abrirDetalles()
  {
    this.navCtrl.push(DetallesPage);
  }

}
