import { NgModule , Component, Injectable } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes , CanActivate} from '@angular/router';
import {NgbActiveModal, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import {AuthGuard} from './auth/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.page';
import { UsuarioComponent} from '../app/pages/usuario/usuario.page';
import {HomeComponent} from './pages/home/home.page';
import {LoginPageModule} from './pages/login/login.module';
import { CadastrarVeiculoPage} from './pages/cadastrar-veiculo/cadastrar-veiculo.page';
import { RelatorioVeiculoPage } from './pages/relatorio-veiculo/relatorio-veiculo.page';

const routes: Routes = [
   { path: '', redirectTo: 'login',  pathMatch: 'full'},
   { path: 'login', loadChildren:'./pages/login/login.module#LoginPageModule'}, 
   { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
   { path: 'camera', loadChildren: './pages/camera/camera.module#CameraPageModule'},
   { path: 'assinatura', loadChildren: './pages/assinatura/assinatura.module#AssinaturaPageModule'},
   {  path: 'cadastrar-veiculo', loadChildren: './pages/cadastrar-veiculo/cadastrar-veiculo.module#CadastrarVeiculoPageModule'  },
   {  path: 'cadastrar-motocicleta', loadChildren: './pages/cadastrar-motocicleta/cadastrar-motocicleta.module#CadastrarMotocicletaPageModule'  },
   {  path: 'update-veiculo', loadChildren: './pages/update-veiculo/update-veiculo.module#UpdateVeiculoPageModule'  },
   {  path: 'update-motocicleta', loadChildren: './pages/update-motocicleta/update-motocicleta.module#UpdateMotocicletaPageModule'  },
   { path: 'relatorio-veiculo', loadChildren: './pages/relatorio-veiculo/relatorio-veiculo.module#RelatorioVeiculoPageModule'},
   { path: 'usuario', component: UsuarioComponent , canActivate: [AuthGuard] },
  //{ path: '**', redirectTo: 'loader', pathMatch: 'full' },
  //{ path: '**', redirectTo: ''}*/
 
     
   /* { path: 'login',
      component: LoginComponent,
      children: [
        { path: 'cadastrar-veiculo', loadChildren: './pages/cadastrar-veiculo/cadastrar-veiculo.module' }, 
        { path: 'relatorio-veiculo',loadChildren: './pages/relatorio-vistoria/relatorio-vistoria.module', outlet: 'relatorio-veiculo'},
        { path: 'home', component: HomeComponent , canActivate: [AuthGuard] },
        { path: 'usuario', component: UsuarioComponent , canActivate: [AuthGuard] }
      ]
    }
    
   /*
   { path: '',
      component: LoginComponent,
      children: [
        {
      path: '',
      redirectTo: 'loader',
      pathMatch: 'full'
    },
      {
        path: 'loader',
        loadChildren: () => import('./pages/loader/loader.module').then( m => m.LoaderPageModule)
      },
      {
        path: 'cadastrar-veiculo',
        loadChildren: () => import('./pages/cadastrar-veiculo/cadastrar-veiculo.module').then(m => m.CadastrarVeiculoPageModule)
      },
      {
        path: 'usuario',
        loadChildren: () => import('./pages/usuario/usuario.module').then(m => m.UsuarioPageModule)
      },      
    ]
  }
  */
     /* {
        path: '',
        redirectTo: 'loader',
        pathMatch: 'full'
      },
        {
          path: 'login',
          loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
        },
        {
          path: 'loader',
          loadChildren: () => import('./loader/loader.module').then( m => m.LoaderPageModule)
        },
        {
          path: 'cadastrar-veiculo',
          loadChildren: () => import('./cadastrar-veiculo/cadastrar-veiculo.module').then(m => m.CadastrarVeiculoPageModule)
        },
  */
      /*  {
          path: '',
          redirectTo: 'loader',
          pathMatch: 'full'
        },
          {
            path: 'login',
            loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
          },
          {
            path: 'loader',
            loadChildren: () => import('./loader/loader.module').then( m => m.LoaderPageModule)
          },
          {
            path: 'cadastrar-veiculo',
            loadChildren: () => import('./cadastrar-veiculo/cadastrar-veiculo.module').then(m => m.CadastrarVeiculoPageModule)
          },
          */
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
   CommonModule,
   NgbModule,
  ],
  declarations: [],
  exports: [RouterModule]
})
//@Injectable()
export class AppRoutingModule {}
