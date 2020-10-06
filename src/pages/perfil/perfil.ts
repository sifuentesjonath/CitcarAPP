import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';//Manejo de cache
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { HttpClient } from '@angular/common/http';//conexión
import { Observable } from 'rxjs/Observable';
//imports pages
import { EditPerfilPage  } from '../../pages/edit-perfil/edit-perfil';
import { LoginPage } from '../../pages/login/login';
import { CambiarPassPage }from '../../pages/cambiar-pass/cambiar-pass';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  NombreC:String='';
  data:any={};
  imgP:any='assets/imgs/perfil.png';
  imgPA:any='';
  cliente:any={};
  confirmador:String='';
  constructor(public navCtrl: NavController,private storage: Storage,private http: HttpClient,public navParams: NavParams,public alertCtrl:AlertController,private camara:Camera,private transfer:FileTransfer,private file:File,private loadingCtrl:LoadingController) {
    this.data.nombre = '';
    this.data.appm = '';
    this.data.mail = '';
    this.data.password = '';
  }

  ionViewDidLoad() {
    this.storage.get('NombreC').then((res) => {
      if(res!=null){
        this.NombreC=res;
        this.storage.get('Id').then((res) => {
          if(res!=null){
            this.cliente=res;
            this.imgP='http://citcar.relatibyte.mx//images/perfiles/'+this.cliente+'.jpg';
            this.imgPA=this.imgP;
            this.storage.get('confirmador').then((res) => {
              if(res!=null){
              this.confirmador=res;
              }
            });
          }
        });  
      }                   
    });
  }
  ionViewCanLeave(){
    if(this.imgP!=this.imgPA){
      let url='http://citcar.relatibyte.mx//Api/UpdateImg.php';
      let datos= new FormData(); 
      datos.append('file',JSON.stringify({cliente:this.cliente,img:this.imgP}));
      //let body=JSON.stringify({cliente:this.cliente,img:datos});
      //let data:Observable<any>=this.http.post(url,body);
      this.http.post(url,datos).subscribe(res => {
        this.storage.clear();
        this.storage.set('NombreC',this.NombreC);
        this.storage.set('confirmador',this.confirmador);
        this.storage.set('Id',this.cliente);
        /*let prueba=this.storage.keys(); 
        let error = this.alertCtrl.create({
          title: 'Prueba',
          message:JSON.stringify(prueba),
          buttons: ['Entendido']
        });
        error.present();*/
      });
    }
  }
  changeImg(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camara.DestinationType.DATA_URL,
      sourceType: this.camara.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }
    this.camara.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imgP = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
  editar(){
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(EditPerfilPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }
  Focus(){
    console.log('Hola2');
    let error = this.alertCtrl.create({
      title: 'Prueba',
      message:'Hola',
      buttons: ['Entendido']
    });
    error.present();
  }
  cambio(){
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(CambiarPassPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
    //if(this.imgP!=this.imgPA){  
      /*data.subscribe(res=>{
        let error = this.alertCtrl.create({
          title: 'Prueba',
          message:res,
          buttons: ['Entendido']
        });
        error.present();
      })*/
    //}
  }
  cerrar(){
    this.storage.clear();
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(LoginPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }
}
