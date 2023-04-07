import { Component, OnInit, Injectable,ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {SnotifyService} from 'ng-snotify';
import {GlobalVars} from '../../providers/utils/global-vars';
import {NgxSpinnerService} from 'ngx-spinner';
import {UsuarioLogado} from '../../model/usuario-logado';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {LoginWS} from '../../providers/ws/login.ws'; 
import {Observable} from 'rxjs';
import { Router , RouterOutlet , ActivatedRouteSnapshot ,  ActivationStart} from '@angular/router';
import { CadastrarUsuarioPage } from '../cadastrar-usuario/cadastrar-usuario.page';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
//@Injectable()
export class LoginComponent implements OnInit {
 
  Group : FormGroup;
  private formSubmitAttempt: boolean; 
  usuariologado :UsuarioLogado;
  showContentLogin: boolean;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
 
  constructor(
              public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private globalVars: GlobalVars,
              private snotifyService: SnotifyService,
              private spinner: NgxSpinnerService,
              private loginWS: LoginWS,
              private router: Router,
             // private snapshot: ActivatedRouteSnapshot,
              //private outlet: RouterOutlet 
              /*private iab: InAppBrowser*/) {


  }

 ngOnInit() {
    this.Group = this.formBuilder.group({
      dsLogin: ['', Validators.required],
      dssenha: ['', Validators.required]
    });
    
   const isAuthenticated: Observable<boolean> = this.globalVars.isLoggedIn;
   isAuthenticated.subscribe(result => {
      this.showContentLogin = !result;
    });
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === "login")
          this.outlet.deactivate();
  });

  }

  isFieldInvalid(field: string) {
    return (
      (!this.Group.get(field).valid && this.Group.get(field).touched) ||
      (this.Group.get(field).untouched && this.formSubmitAttempt)
    );
  }

 login() {
      this.spinner.show();
 
    if (this.Group.valid) {
      this.loginWS.login(this.Group.get('dsLogin').value, this.Group.get('dssenha').value).subscribe(result => {
       this.spinner.hide();
        if (result != null) {
        this.globalVars.usuarioLogado = result;
        this.globalVars.setToken(result.senha);
      // this.globalVars.setToken(result.id.toString());
       alert('Seja bem-vindo!');
       this.router.navigate(['home']);

        } else {
          alert('Usuário ou senha Inválidos');
        } 

      }, error => {
        this.spinner.hide();
        this.snotifyService.error('Erro no servidor!, favor entre em contato de um de nossos analistas');
        console.log(error);
      });
    }
    this.formSubmitAttempt = true;
  }
  

 
}