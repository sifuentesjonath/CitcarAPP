import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-metodo-pago',
  templateUrl: 'metodo-pago.html',
})
export class MetodoPagoPage {
  metodos:Object=[
    {
      "mtoD":'EFECTIVO',
      "mtoE":'*1239',
    },
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  //metodos
  ionViewCanEnter(){

  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad MetodoPagoPage');
  }

}
