import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA,LOCALE_ID, Injectable  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AssinaturaPage } from './assinatura.page';
//import { SignaturePad} from 'angular2-signaturepad';
import { SignaturePad } from 'angular5-signaturepad/signature-pad';

@NgModule({
  declarations: [
    AssinaturaPage,
    SignaturePad 
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AssinaturaPage
      }
    ]),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [

  ]
})
export class AssinaturaPageModule {}
