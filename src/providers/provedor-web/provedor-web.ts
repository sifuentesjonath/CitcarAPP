import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController} from 'ionic-angular';
import {Md5} from "md5-typescript";
import { Storage } from '@ionic/storage';
//import { LoginPage } from '../../pages/login/login';

@Injectable()
export class ProvedorWebProvider {
  data:any = {};
  items : Array<any> = [];
  change;
  constructor(private http: HttpClient,private storage: Storage,public alertCtrl:AlertController) {
    //console.log('Hello ProvedorWebProvider Provider');
  }
  submit(nickname,pass) {
    var url = 'http://citcar.relatibyte.com/connectApi.php';
    //var myData = JSON.stringify({username:nickname});
    let password=Md5.init(pass);
    let body=JSON.stringify({nickname:nickname,password:password});
    /*let alert = this.alertCtrl.create({
      title: 'Alerta!',
      message:p+'-'+pass,
      buttons: ['Entendido']
    });
    alert.present();*/
    /*this.http.get(url).subscribe((data : any) =>{
        console.dir(data);
        this.items = data;
    },(error : any) =>{
        console.dir(error);
    });*/
    this.http.post(url,body).subscribe(res => {
      if(res===0){
        let error = this.alertCtrl.create({
          title: 'Error',
          message:"Usuario o contraseña incorrecta,por favor intentelo de nuevo",
          buttons: ['Entendido']
        });
        error.present();
      }
      else{ 
        //this.login.onPage();
        let nick=res[0].cliente_nick;
        let pass=res[0].cliente_pass;
        this.storage.set('confirmador',nick+pass);
        this.change=1;
        //console.dir(nick+','+pass);

      }
    },err => {
      console.log('Error: ' + err.error);
      console.log('Name: ' + err.name);
      console.log('Message: ' + err.message);
      console.log('Status: ' + err.status);
    });
    /*this.http.post(url, {
      title:'login',
      body: JSON.stringify({
        nickname:nickname,
        password:password,
      })
    }).subscribe(res => {
        console.dir(res);
      },err => {
          console.log("Error occured");
        }
    );*/
  }
}
