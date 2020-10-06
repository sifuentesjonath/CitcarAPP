import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';//conexión
import {Md5} from "md5-typescript";//MD5
import { Storage } from '@ionic/storage';//Manejo de cache
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-cambiar-pass',
  templateUrl: 'cambiar-pass.html',
})
export class CambiarPassPage {
  passwordO:any={};
  celular: any={};
  data:    any={};
  correoO: any={};
  correo:  any={};
  pass:    any={};
  mensaje: any={};
  private datos: FormGroup;
  constructor(public navCtrl: NavController,private storage: Storage,public navParams: NavParams,private http: HttpClient,public alertCtrl:AlertController,private fb: FormBuilder) {
    this.datos = this.fb.group({
      passwordOld: ['', [Validators.required,Validators.pattern(/^[a-z0-9_-]{7,18}$/)]],
      password: ['', [Validators.required,Validators.pattern(/^[a-z0-9_-]{7,18}$/)]],
      passwordC: ['', [Validators.required,Validators.pattern(/^[a-z0-9_-]{7,18}$/)]],
    });
  }
  //metodos
  ionViewCanEnter(){
    this.storage.get('confirmador').then((res) => {
      if(res!=null){
            var url = 'http://citcar.relatibyte.mx//Api/ConsultP.php';
            this.correoO=res;
            //let pass=Md5.init(this.datos.value.password);;
            let body=JSON.stringify({mail: this.correoO});
            this.http.post(url,body).subscribe(res => {
              if(res===0){
                let error = this.alertCtrl.create({
                  title: 'Error',
                  message:"Ocurrio un error,intentelo de nuevo",
                  buttons: ['Entendido']
                });
                error.present();
              }      
              else{
                this.passwordO=res[0].cliente_pass;
                this.correo=  res[0].cliente_correo;
                /*this.mensaje=res;
                //console.log(this.mensaje);
                let mess = this.alertCtrl.create({
                  title: 'Perfecto',
                  message:this.mensaje,
                  buttons: ['Entendido']
                });
                mess.present();*/
                //this.pass=res[0].cliente_pass;
                //this.storage.set('Apodo',this.nick);
                //this.storage.set('confirmador',this.nick+this.pass);
                //console.dir(nick+','+pass);
        
              }
            },err => {
              /*console.log('Error: ' + err.error);
              console.log('Name: ' + err.name);
              console.log('Message: ' + err.message);
              console.log('Status: ' + err.status);*/
            }); 
        }
        else{
          let error = this.alertCtrl.create({
            title: 'Advertencia',
            message:" Por favor llena todo los campos",
            buttons: ['Entendido']
          });
          error.present(); 
        }              
    });
  }
  Editar(){
    let passOld=Md5.init(this.datos.value.passwordOld);
    if(this.passwordO===passOld){
      if(this.datos.value.password!=''||this.datos.value.passwordC!='' || this.datos.value.passwordOld!=''){
          if(this.datos.value.passwordC===this.datos.value.password){
            var url = 'http://citcar.relatibyte.mx//Api/ChangePass.php';
            let passNew=Md5.init(this.datos.value.password);
            let body=JSON.stringify({pass:passNew,correo:this.correo});
            this.http.post(url,body).subscribe(res => {
              if(res===0){
                let error = this.alertCtrl.create({
                  title: 'Error',
                  message:"Ocurrio un error,intentelo de nuevo",
                  buttons: ['Entendido']
                });
                error.present();
              }      
              else if(res===1){
                let error = this.alertCtrl.create({
                  title: 'Error',
                  message:"Ocurrio un error.",
                  buttons: ['Entendido']
                });
                error.present();
              }
              else{ 
                this.mensaje=res;
                //console.log(this.mensaje);
                let mess = this.alertCtrl.create({
                  title: 'Perfecto',
                  message:this.mensaje,
                  buttons: ['Entendido']
                });
                mess.present();
                //this.pass=res[0].cliente_pass;
                //this.storage.set('Apodo',this.nick);
                //this.storage.set('confirmador',this.datos.value.correo);
                //console.dir(nick+','+pass);
        
              }
            },err => {
              /*console.log('Error: ' + err.error);
              console.log('Name: ' + err.name);
              console.log('Message: ' + err.message);
              console.log('Status: ' + err.status);*/
            });
          }
          else{
            let error = this.alertCtrl.create({
              title: 'Error',
              message:"La nueva contraseña no coincide",
              buttons: ['Entendido']
            });
            error.present();  
          }
        }
        else{
          let error = this.alertCtrl.create({
            title: 'Advertencia',
            message:" Por favor llena todo los campos",
            buttons: ['Entendido']
          });
          error.present(); 
        } 
    }
    else{
      let error = this.alertCtrl.create({
        title: 'Error',
        message:"Contraseña actual no coincide",
        buttons: ['Entendido']
      });
      error.present(); 
    }
  }
}
