import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
//imports pages
import {InfoAppPage}   from '../../pages/info-app/info-app';
import {TerminosSPage} from '../../pages/terminos-s/terminos-s';
import {AvisoPPage}    from '../../pages/aviso-p/aviso-p';
@Component({
  selector: 'page-info-legal',
  templateUrl: 'info-legal.html',
})
export class InfoLegalPage {
  items = [
    'Terminos y Condiciones',
    'Aviso de Privacidad'
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController) {
  }

 //metodos
 ionViewCanEnter(){
 }
 itemSelected(item: string) {
    if(item==='Terminos y Condiciones'){
      let currentIndex = this.navCtrl.getActive().index;
      this.navCtrl.push(TerminosSPage).then(() => {
        this.navCtrl.remove(currentIndex);
      });
    }
    else if(item==='Aviso de Privacidad'){
      let currentIndex = this.navCtrl.getActive().index;
      this.navCtrl.push(AvisoPPage).then(() => {
        this.navCtrl.remove(currentIndex);
      });
    }
  }
  infoApp(){
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(InfoAppPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }

}
