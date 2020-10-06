import { Component, ViewChild } from '@angular/core';
import { Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//imports pages
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import {PerfilPage} from '../pages/perfil/perfil';
import {InfoLegalPage} from '../pages/info-legal/info-legal';
import { MetodoPagoPage}from '../pages/metodo-pago/metodo-pago';
import { ViajesPage } from '../pages/viajes/viajes';
import {ConfiguracionesPage} from '../pages/configuraciones/configuraciones';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    // Navegación del Menú
    this.pages = [
      { title: 'Inicio', component: HomePage },
      { title: 'Perfil', component: PerfilPage },
      { title: 'Configuración', component: ConfiguracionesPage },
      { title: 'Viajes', component: ViajesPage },
      { title: 'Métodos de Pago', component:MetodoPagoPage},
      { title: 'Información Legal', component: InfoLegalPage }
    ];

  }
  //Splash
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  //Linque del Menú Toggle
  openPage(x) {
    this.nav.setRoot(this.pages[x].component);
  }

}
