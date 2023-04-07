import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA,LOCALE_ID, Injectable  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {UpdateMotocicletaPage } from './update-motocicleta.page';
//import { UpdateMotocicletaPageRoutingModule} from './update-motocicleta-routing.module';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BrMaskerModule,
    RouterModule.forChild([
      {
        path: '',
        component: UpdateMotocicletaPage
      }
    ]),
  ],
  declarations: [UpdateMotocicletaPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class UpdateMotocicletaPageModule {}
