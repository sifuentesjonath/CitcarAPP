import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';//conexión
import {Md5} from "md5-typescript";//MD5
import { Storage } from '@ionic/storage';//Manejo de cache
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
//imports pages
import { LoginPage } from '../login/login';
@IonicPage()
@Component({
  selector: 'page-edit-perfil',
  templateUrl: 'edit-perfil.html',
})
export class EditPerfilPage {
  nombre:  any={};
  apellido:any={};
  correo:  any={};
  correoO: any={};
  celular: any={};
  data:    any={};
  mensaje: any={};
  private datos: FormGroup;
  constructor(public navCtrl: NavController,private storage: Storage,public navParams: NavParams,private http: HttpClient,public alertCtrl:AlertController,private fb: FormBuilder) {
    this.datos = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      correo: ['', [Validators.required, Validators.email]],
      celular:['', [Validators.required,Validators.pattern(/^[0-9_-]{6,18}$/)]],
    });
  }
  //metodos
  ionViewCanEnter(){
      this.storage.get('confirmador').then((res) => {
        if(res!=null){
              var url = 'http://citcar.relatibyte.mx//Api/EditPerfil.php';
              this.correoO=res;
              //let pass=Md5.init(this.datos.value.password);
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
                else if(res===1){
                  let error = this.alertCtrl.create({
                    title: 'Error',
                    message:"Email en uso, por favor intentelo de nuevo",
                    buttons: ['Entendido']
                  });
                  error.present();
                }
                else{
                  this.nombre=  res[0].cliente_nombre;
                  this.apellido=res[0].cliente_apellido;
                  this.correo=  res[0].cliente_correo;
                  this.celular= res[0].cliente_celular;
                  /*this.mensaje=res;
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
                  //console.dir(nick+','+pass);*/
          
                }
              },err => {
                this.nombre='';
                this.apellido='';
                this.correo='';
                this.celular='';
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
      if(this.datos.value.nombre!=''&&this.datos.value.apellido!=''&&this.datos.value.celular!=''){
          var url = 'http://citcar.relatibyte.mx//Api/SavePerfil.php';
          let body=JSON.stringify({nombre:this.datos.value.nombre,apellido:this.datos.value.apellido,correoO:this.correoO,correo:this.datos.value.correo,celular:this.datos.value.celular});
          this.http.post(url,body).subscribe(res => {
            if(res===0){
              let error = this.alertCtrl.create({
                title: 'Error',
                message:"Ocurrio un error,intentelo de nuevo",
                buttons: ['Entendido']
              });
              error.present();
            }      
            else if(res==false){
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
              this.storage.set('confirmador',this.datos.value.correo);              
              this.storage.set('NombreC',this.datos.value.nombre+this.datos.value.apellido); 
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
    }
}
