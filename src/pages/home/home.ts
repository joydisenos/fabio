import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetallesPage } from '../detalles/detalles';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  abrirDetalles()
  {
    this.navCtrl.push(DetallesPage);
  }

}
