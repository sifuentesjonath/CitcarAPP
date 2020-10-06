import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//imports de paginas
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SolicitarPage} from '../pages/solicitar/solicitar';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { EditPerfilPage  } from '../pages/edit-perfil/edit-perfil';
import { CambiarPassPage }from '../pages/cambiar-pass/cambiar-pass';
import { InfoLegalPage} from '../pages/info-legal/info-legal';
import { TerminosSPage} from '../pages/terminos-s/terminos-s';
import { AvisoPPage}    from  '../pages/aviso-p/aviso-p';
import { InfoAppPage  } from '../pages/info-app/info-app';
import { MetodoPagoPage}from '../pages/metodo-pago/metodo-pago';
import { ViajesPage } from '../pages/viajes/viajes';
import { ConfiguracionesPage} from '../pages/configuraciones/configuraciones';
import { RegistrarsePage } from '../pages/registrarse/registrarse';
import { ResPasswordPage } from '../pages/res-password/res-password';
//import providers
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { Camera } from '@ionic-native/camera';
import { FileTransfer} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
//import { ProvedorWebProvider } from '../providers/provedor-web/provedor-web';
//imports especiales
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SolicitarPage,
    ListPage,
    LoginPage,
    RegistrarsePage,
    ResPasswordPage,
    PerfilPage,
    CambiarPassPage,
    EditPerfilPage,
    MetodoPagoPage,
    ViajesPage,
    ConfiguracionesPage,
    InfoLegalPage,
    TerminosSPage,
    AvisoPPage,
    InfoAppPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SolicitarPage,
    ListPage,
    LoginPage,
    ResPasswordPage,
    RegistrarsePage,
    PerfilPage,
    CambiarPassPage,
    EditPerfilPage,
    MetodoPagoPage,
    ViajesPage,
    ConfiguracionesPage,
    InfoLegalPage,
    TerminosSPage,
    AvisoPPage,
    InfoAppPage,
    MetodoPagoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    FileTransfer,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectivityServiceProvider,
    GoogleMapsProvider,
    Network,
    Geolocation,
    AppVersion
  ]
})
export class AppModule {}
