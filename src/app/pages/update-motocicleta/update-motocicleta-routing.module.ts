import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { UpdateMotocicletaPage} from './update-motocicleta.page';

const routes: Routes = [
 /* {
    path: '',
    component: CadastrarVeiculoPage
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateMotocicletaPageRoutingModule {}
 