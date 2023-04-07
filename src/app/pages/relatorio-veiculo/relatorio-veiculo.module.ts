import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA,LOCALE_ID, Injectable  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RelatorioVeiculoPage } from './relatorio-veiculo.page';
//import { SignaturePad } from 'angular5-signaturepad/signature-pad';
import { BrMaskerModule } from 'br-mask';
//import {ExternalDocument} from 'pdfjs';

@NgModule({
  declarations: [
    RelatorioVeiculoPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    //ExternalDocument,
    BrMaskerModule,
    RouterModule.forChild([
      {
        path: '',
        component: RelatorioVeiculoPage
      }
    ]),
   // SignaturePad
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [

  ]
})
export class RelatorioVeiculoPageModule {}
