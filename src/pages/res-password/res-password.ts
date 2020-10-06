import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
//import { Storage } from '@ionic/storage';//Manejo de cache
import { HttpClient } from '@angular/common/http';//conexión
@IonicPage()
@Component({
  selector: 'page-res-password',
  templateUrl: 'res-password.html',
})
export class ResPasswordPage {
  data:any = {};
  mensaje:any = {};
  constructor(public navCtrl: NavController,public navParams: NavParams,private http: HttpClient,public alertCtrl:AlertController) {
    this.data.correo = '';
  }

  ionViewDidLoad() {
  }
  enviarR(){
    var url = 'http://citcar.relatibyte.mx//Api/resPassApi.php';
    //let password=Md5.init(this.data.password);
    let body=JSON.stringify({correo:this.data.correo});
    this.http.post(url,body).subscribe(res => {
      if(res===0){
        let error = this.alertCtrl.create({
          title: 'Error',
          message:"Email incorrecto,por favor verifique su correo",
          buttons: ['Entendido']
        });
        error.present();
      }
      else{ 
        this.mensaje=res;
        //console.log(this.mensaje);
        let mess = this.alertCtrl.create({
          title: 'Correcto.',
          message:this.mensaje,
          buttons: ['Entendido']
        });
        mess.present();
        //this.pass=res[0].cliente_pass;
        //this.storage.set('Apodo',this.nick);
        //this.storage.set('confirmador',this.nick+this.pass);
        //console.dir(nick+','+pass);

      }
    },err => {
      console.log('Error: ' + err.error);
      console.log('Name: ' + err.name);
      console.log('Message: ' + err.message);
      console.log('Status: ' + err.status);
    });
  }

}
