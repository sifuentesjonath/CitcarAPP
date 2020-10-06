import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams,AlertController} from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
@IonicPage()
@Component({
  selector: 'page-info-app',
  templateUrl: 'info-app.html',
})
export class InfoAppPage {
  version:string='';
  app:string='';
  constructor(public navCtrl:NavController,private alertCtrl:AlertController,public navParams:NavParams,private appVersion:AppVersion) {
  }
  //metodos
  ionViewCanEnter(){
    //this.appVersion.getVersionCode();
    this.appVersion.getVersionNumber().then((v)=> {
      this.appVersion.getAppName().then((appN)=>{
        this.app=appN;
        this.version=v;
      });
    });
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad InfoAppPage');
  }

}
