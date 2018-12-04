import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminDetallesPage } from '../admin-detalles/admin-detalles';
import { Perfil } from '../../models/perfil';


@IonicPage()
@Component({
  selector: 'page-admin-usuario',
  templateUrl: 'admin-usuario.html',
})
export class AdminUsuarioPage {

  key:string;
  perfilRef:AngularFireObject<any>;
  perfil:any = { };
  seccion = 'inversion';
  inversionesRef: AngularFireList<any>;
  inversiones: Observable<any>;
  movimientosRef: AngularFireList<any>;
  movimientos: Observable<any>;
  solicitudesRef: AngularFireList<any>;
  solicitudes: Observable<any>;
  mensajesRef: AngularFireList<any>;
  mensajes: Observable<any>;
  perfil2 : AngularFireObject<Perfil>;
  perfilData : Observable<Perfil>;
  disponible:any;
  total:any;
  movimientoref:any ={};
  inversion:any = {
    nombre:'',
    descripcion:'',
    inversion:'',
    fecha:''
  };

  params = {
    userkey : '',
    inversionkey : ''
  };

  movimiento:any = {
    cantidad:'',
    tipo:'',
    estatus:'',
    concepto:''
  };

  mensaje:any = {
    mensaje:'',
    user:'admin'
  };

  cuentaRef:AngularFireObject<any>;
  cuenta = { };


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afDatabase: AngularFireDatabase,
              public afAuth: AngularFireAuth,
              public actionSheet: ActionSheetController,
              public alertCtrl : AlertController) {

        this.key = this.navParams.get('key');
        this.params.userkey = this.navParams.get('key');
        
        this.perfilRef = this.afDatabase.object('usuarios/' + this.key + '/perfil');
        this.perfil = this.perfilRef.snapshotChanges().subscribe(perfil => {
          this.perfil = perfil.payload.val();
        });

        this.inversionesRef = this.afDatabase.list('usuarios/' + this.key + '/inversiones');
                    this.inversiones = this.inversionesRef
                      .snapshotChanges()  
                      .pipe(
                              map(inversiones => 
                                inversiones.map(inversion => ({ 
                                  key: inversion.key, 
                                  ...inversion.payload.val() }))
                              )
                          );

        this.movimientosRef = this.afDatabase.list('usuarios/' + this.key + '/movimientos',
        ref => ref.orderByChild('estatus').equalTo('aprobado'));
        this.movimientos = this.movimientosRef
          .snapshotChanges()  
          .pipe(
                  map(movimientos => 
                    movimientos.map(movimiento => ({ 
                      key: movimiento.key, 
                      ...movimiento.payload.val() }))
                  )
              );

        this.solicitudesRef = this.afDatabase.list('usuarios/' + this.key + '/movimientos',  ref => ref.orderByChild('estatus').equalTo('pendiente'));
        this.solicitudes = this.solicitudesRef
          .snapshotChanges()  
          .pipe(
                  map(movimientos => 
                    movimientos.map(movimiento => ({ 
                      key: movimiento.key, 
                      ...movimiento.payload.val() }))
                  )
              );


        this.mensajesRef = this.afDatabase.list('usuarios/' + this.key + '/mensajes');
        this.mensajes = this.mensajesRef
          .snapshotChanges()  
          .pipe(
                  map(mensajes => 
                    mensajes.map(mensaje => ({ 
                      key: mensaje.key, 
                      ...mensaje.payload.val() }))
                  )
              );

              this.perfil2 = this.afDatabase.object('usuarios/' + this.key + '/perfil');
        this.perfilData = this.perfil2.valueChanges();
        this.perfilData.subscribe(user => {
            this.disponible = user.disponible;
            this.total = user.total;
        } );

        this.cuentaRef = this.afDatabase.object('usuarios/' + this.key + '/cuenta');
                    this.cuenta = this.cuentaRef.snapshotChanges().subscribe(perfil => {
                      this.cuenta = perfil.payload.val();
                    });
  }

  agregarInversion()
  {
    this.afDatabase.list('usuarios/' + this.key + '/inversiones')
                    .push(this.inversion);
    
    const resta = (parseFloat(this.disponible) - parseFloat(this.inversion.inversion));

    this.afDatabase.object('usuarios/'+this.key+'/perfil')
                                .update({
                                  disponible: resta
                                });

    this.inversion = {
      nombre:'',
      descripcion:'',
      inversion:'',
      fecha:''
    }
  }

  abrirDetalles(key)
  {
    this.params.inversionkey = key;
    
    this.navCtrl.push(AdminDetallesPage , this.params)
  }

  abrirOpciones(key)
  {
    const actionSheet = this.actionSheet.create({
      title: 'Acciones',
      buttons: [
        {
          text: 'Ver Detalles',
          handler: () => {
            this.abrirDetalles(key);
          }
        },{
          text: 'Eliminar',
          handler: () => {
            this.afDatabase.object(
              'usuarios/' 
              + this.key +
              '/inversiones/'
              + key
             ).remove();


              const alert = this.alertCtrl.create({
                title: 'Eliminado',
                subTitle: 'La inversión fué Eliminada con éxito',
                buttons: ['Aceptar']
              });
              alert.present();
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
           
          }
        }
      ]
    });
    actionSheet.present();
  }

  agregarAbono()
  {
    this.movimiento.estatus = 'aprobado';
    this.movimiento.tipo = 'abono';
   


    this.afDatabase.list('usuarios/' 
                          + this.key 
                          + '/movimientos')
                  .push(this.movimiento);

    const suma = (parseFloat(this.disponible) + parseFloat(this.movimiento.cantidad));
    const sumatotal = (parseFloat(this.total) + parseFloat(this.movimiento.cantidad));

    this.afDatabase.object('usuarios/'+this.key+'/perfil')
                                .update({
                                  disponible: suma,
                                  total: sumatotal
                                });


    

    this.movimiento = {
      cantidad:'',
      tipo:'',
      estatus:'',
      concepto:''
    }
  }

  enviarMensaje()
  {
    this.afDatabase.list('usuarios/' + this.key + '/mensajes')
                            .push(this.mensaje);
        this.mensaje.mensaje = '';
  }

  verificarMovimiento(movimientokey)
  {

    const actionSheet = this.actionSheet.create({
      title: 'Verificar Transacción',
      buttons: [
        {
          text: 'Aprobar',
          handler: () => {
            
            this.movimientoref = this.afDatabase.object('usuarios/'+this.key+'/movimientos/' + movimientokey);
            this.movimientoref
            .valueChanges().subscribe( movimiento => {
              
              if(movimiento.tipo == 'abono')
              {
                const monto1 = parseFloat(this.disponible) + parseFloat(movimiento.cantidad);
                const monto3 = parseFloat(this.total) + parseFloat(movimiento.cantidad);
                console.log(monto1);
                console.log(parseFloat(this.disponible));
                console.log(parseFloat(movimiento.cantidad));
                this.afDatabase.object('usuarios/' + this.key +'/perfil')
                                .update({
                                  disponible: monto1,
                                  total: monto3 
                                });
              }
              else if(movimiento.tipo == 'retiro')
              {
                const monto2 = parseFloat(this.disponible) - parseFloat(movimiento.cantidad);
                const monto4 = parseFloat(this.total) - parseFloat(movimiento.cantidad);
              
                console.log(parseFloat(this.disponible));
                console.log(parseFloat(movimiento.cantidad));
                this.afDatabase.object('usuarios/'+ this.key + '/perfil')
                                .update({
                                  disponible: monto2,
                                  total: monto4
                                });
              }
            });

            this.movimientoref.update({
              estatus:'aprobado'
            });
          }
        },{
          text: 'Negar',
          handler: () => {
            this.afDatabase.object('usuarios/'+this.key+'/movimientos/' + movimientokey)
                                .update({
                                  estatus:'negado',
                                });
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
           
          }
        }
      ]
    });
    actionSheet.present();
  }

}
