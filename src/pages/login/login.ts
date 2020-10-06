//imports
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegistrarsePage } from '../registrarse/registrarse';
import { Storage } from '@ionic/storage';//Manejo de cache
import { HttpClient } from '@angular/common/http';//conexión
import {Md5} from "md5-typescript";//MD5
import { Injectable } from '@angular/core';
import { ResPasswordPage } from '../res-password/res-password';//página para restablecer contraseña.
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
@Injectable()
export class LoginPage {
  nombre:any ={};
  apellido:any={};
  email:any = {};
  pass:any = {};
  private datos: FormGroup;
  //constructor y declaración de uso de biblotecas
  constructor(public navCtrl: NavController,private storage:Storage,public navParams:NavParams,private http:HttpClient,public alertCtrl:AlertController,public loadingCtrl:LoadingController,private fb:FormBuilder) {
    this.datos = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
    });
  }
  //metodos
  ionViewCanEnter(){
    this.storage.get('confirmador').then((res) => {
      if(res!=null){
        let currentIndex = this.navCtrl.getActive().index;
        this.navCtrl.push(HomePage).then(() => {
            this.navCtrl.remove(currentIndex);
        });
      }                     
    });
  }
  /*ionViewDidLoad() {
    //this.storage.clear();
    this.storage.get('confirmador').then((res) => {
      if(res!=null){
        let currentIndex = this.navCtrl.getActive().index;
        this.navCtrl.push(HomePage).then(() => {
            this.navCtrl.remove(currentIndex);
        });
      }                     
    });
  }*/
  ingresar(){
    //this.provedor.submit(this.data.nickname,this.data.password);
    var url ='http://citcar.relatibyte.mx//Api/connectApi.php';
    let password=Md5.init(this.datos.value.password);
    let body=JSON.stringify({correo:this.datos.value.correo,password:password});
    this.http.post(url,body).subscribe(res => {
      let loading = this.loadingCtrl.create({
        content: 'Cargando...'
      });
      loading.present();
      setTimeout(() => {
        if(res===0){
          let error = this.alertCtrl.create({
            title: 'Error',
            message:"Usuario o contraseña incorrecta,por favor intentelo de nuevo",
            buttons: ['Entendido']
          });
          error.present();
        }
        else{ 
          this.nombre=res[0].cliente_nombre;
          this.apellido=res[0].cliente_apellido;
          this.email=res[0].cliente_correo;
          //this.pass=res[0].cliente_pass;
          this.storage.set('NombreC',this.nombre+' '+this.apellido);
          this.storage.set('confirmador',this.email);
          this.storage.set('Id',res[0].idCliente);
          //console.dir(nick+','+pass);
          let currentIndex = this.navCtrl.getActive().index;
          this.navCtrl.push(HomePage).then(() => {
          this.navCtrl.remove(currentIndex);
          });
        }
      }, 1000);  
      setTimeout(() => {
        loading.dismiss();
      }, 2000);
    },err => {
      /*console.log('Error: ' + err.error);
      console.log('Name: ' + err.name);
      console.log('Message: ' + err.message);
      console.log('Status: ' + err.status);*/
    });
  }
  passwordR(){
    //let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(ResPasswordPage).then(() => {
        //this.navCtrl.remove(currentIndex);
    });
  }
  registrarse(){
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(RegistrarsePage).then(() => {
        this.navCtrl.remove(currentIndex);
    });
    // set a key/value
    //this.storage.set('name', 'Max');
    // Or to get a key/value pair
    /*this.storage.get('name').then((val) => {
      let storag = this.alertCtrl.create({
        title: 'Prueba',
        message:val,
        buttons: ['Entendido']
      });
      storag.present();*/
      //console.log('Your age is', val);
    //});
  }
}
