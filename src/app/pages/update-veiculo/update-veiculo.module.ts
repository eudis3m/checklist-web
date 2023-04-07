import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA,LOCALE_ID, Injectable  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UpdateVeiculoPage } from './update-veiculo.page';
// import { UpdateVeiculoPageRoutingModule} from './update-veiculo-routing.module';
import { BrMaskerModule } from 'br-mask';
//import { NgxMaskModule, IConfig } from 'ngx-mask';
//import {NgxMaskIonicModule} from 'ngx-mask-ionic';

/*const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};
*/
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    // NgxMaskModule.forRoot(maskConfigFunction),
    BrMaskerModule, 
    //NgxMaskIonicModule,
    //NgxMaskIonicModule.forRoot(),
    RouterModule.forChild([
      {
        path: '', 
        component: UpdateVeiculoPage
      }
    ]),
  ],
  declarations: [UpdateVeiculoPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class UpdateVeiculoPageModule {}
