import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { UpdateVeiculoPage} from './update-veiculo.page';

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
export class UpdateVeiculoPageRoutingModule {}
