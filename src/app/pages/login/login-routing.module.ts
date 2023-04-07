import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarVeiculoPage} from '../cadastrar-veiculo/cadastrar-veiculo.page';
import { RelatorioVeiculoPage } from '../relatorio-veiculo/relatorio-veiculo.page';
import {AuthGuard} from '../../auth/auth.guard';
import { LoginComponent } from './login.page';

const routes: Routes = [
 /* {
    path: '',
    component: LoginComponent
  },
    { path: 'cadastrar-veiculo', component: CadastrarVeiculoPage, canActivate: [AuthGuard] },
    { path: 'relatorio-veiculo', component: RelatorioVeiculoPage},*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
