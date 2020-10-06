import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
//import { Storage } from '@ionic/storage';//Manejo de cache
import {Md5} from "md5-typescript";//MD5
import { HttpClient } from '@angular/common/http';//conexión
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-registrarse',
  templateUrl: 'registrarse.html',
})
export class RegistrarsePage {
  data:any = {};
  pass:any = {};
  mensaje:any = {};
  private datos: FormGroup;
  constructor(public navCtrl: NavController,public navParams: NavParams,private http: HttpClient,public alertCtrl:AlertController,private fb: FormBuilder) {
    this.datos = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
      passwordC: ['', [Validators.required,Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
      celular:['', [Validators.required,Validators.pattern(/^[0-9_-]{6,18}$/)]],
    });
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad RegistrarsePage');
  }
  Registrar(){
    if(this.datos.value.nombre!=''&&this.datos.value.apellido!=''&&this.datos.value.password!=''&&this.datos.value.passwordC!=''&&this.datos.value.celular!=''){
      if(this.data.passwordC===this.data.password){
        var url = 'http://citcar.relatibyte.mx//Api/CheckRes.php';
        let pass=Md5.init(this.datos.value.password);
        //var contra=window.btoa(this.data.password);
        //let password=Md5.init(this.data.password);
        let body=JSON.stringify({nombre:this.datos.value.nombre,apellido:this.datos.value.apellido,correo:this.datos.value.correo,pass:pass,celular:this.datos.value.celular});
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
              message:"Email en uso, por favor intentelo de nuevo",
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
      else{
        let error = this.alertCtrl.create({
          title: 'Error',
          message:"Las contraseñas no coinciden",
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

}
