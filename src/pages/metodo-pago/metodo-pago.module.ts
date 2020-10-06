import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MetodoPagoPage } from './metodo-pago';

@NgModule({
  declarations: [
    MetodoPagoPage,
  ],
  imports: [
    IonicPageModule.forChild(MetodoPagoPage),
  ],
})
export class MetodoPagoPageModule {}
