import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CambiarPassPage } from './cambiar-pass';

@NgModule({
  declarations: [
    CambiarPassPage,
  ],
  imports: [
    IonicPageModule.forChild(CambiarPassPage),
  ],
})
export class CambiarPassPageModule {}
