import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoAppPage } from './info-app';

@NgModule({
  declarations: [
    InfoAppPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoAppPage),
  ],
})
export class InfoAppPageModule {}
