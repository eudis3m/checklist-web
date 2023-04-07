import { IonicModule } from '@ionic/angular';
import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ReactiveFormsModule,
  RouterModule.forChild([
    {
      path: '',
      component: UsuarioComponent
    }
  ]),
],
  declarations: [UsuarioComponent]
})
@Injectable()
export class UsuarioPageModule {}
