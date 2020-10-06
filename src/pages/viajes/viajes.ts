import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-viajes',
  templateUrl: 'viajes.html',
})
export class ViajesPage {
  viajes:Object=[
    {
    "fecha":"11/11/18,19:48",
    "modelo":'Chevrolet Beat',
    "costo":'116.74',
    "metodoP":'EFECTIVO'
    },
    {
    "fecha":"11/12/18,19:48",
    "modelo":'Honda Civic Type-R',
    "costo":'110.74',
    "metodoP":''
    },
  ];
  pausa:boolean=false;
  constructor(public navCtrl: NavController,public navParams:NavParams,public loadingCtrl:LoadingController,public alertCtrl:AlertController) {
  }
  //metodos
  ionViewCanEnter(){
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    },3000);
  }
  ionViewDidLoad() {
  }
  ionViewDidEnter(){
    this.pausa=true;
  }  
  presentLoadingText() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();
    setTimeout(() => {
      let error = this.alertCtrl.create({
        title: 'Error',
        message:"Usuario o contraseña incorrecta,por favor intentelo de nuevo",
        buttons: ['Entendido']
      });
      error.present();
    }, 1000);  
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

}
