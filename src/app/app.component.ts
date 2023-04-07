import { Component, Injectable , ChangeDetectorRef , Optional } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';
import { OnInit, ViewChild, Input} from '@angular/core';
//import {MatSidenav} from '@angular/material';
import {Observable} from 'rxjs';
import {GlobalVars} from './providers/utils/global-vars';
import {HomeComponent} from './pages/home/home.page';
import { LoginComponent } from './pages/login/login.page';
import { UsuarioComponent} from '../app/pages/usuario/usuario.page';
import { CadastrarVeiculoPage} from './pages/cadastrar-veiculo/cadastrar-veiculo.page';
import { RelatorioVeiculoPage } from './pages/relatorio-veiculo/relatorio-veiculo.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
//@Injectable()
export class AppComponent {
 // rootPage: any = LoginComponent;
  @Input()
  hideToggle: boolean;
  @ViewChild('sidenav') sidenav;
  isLoggedIn: Observable<boolean>;
  pages: Array<{title: string, component: any}>;
  constructor(
    @Optional() private changeDetectorRef: ChangeDetectorRef,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService, private router: Router,
    private global: GlobalVars
    
  ) { 
    this.initializeApp();
    this.changeDetectorRef = changeDetectorRef;
   /* this.pages =[
  { title: 'login', component: LoginComponent },
  { title: 'cadastrar-veiculo', component: CadastrarVeiculoPage }, 
  { title: 'relatorio-veiculo', component: RelatorioVeiculoPage},
  { title: 'home', component: HomeComponent},
  { title: 'usuario', component: UsuarioComponent },
    ]*/
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.global.isLoggedIn.subscribe(state => {
        if (state) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }
  
  ngOnInit() {
    this.isLoggedIn = this.global.isLoggedIn;
   // window.location.reload(true);
  }

  onLogout() {
    this.authService.logout();
  }

  close() {
    this.sidenav.close();
  }
  
}
