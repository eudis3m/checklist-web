import { Component, OnInit, Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl,} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {SnotifyService} from 'ng-snotify';
import {GlobalVars} from '../../providers/utils/global-vars';
import {NgxSpinnerService} from 'ngx-spinner';
import {UsuarioLogado} from '../../model/usuario-logado';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {UsuariosWS} from '../../providers/ws/usuario.ws'; 
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Usuario  } from './../../model/usuario';

@Component({
  selector: 'app-tabs',
  templateUrl: 'usuario.page.html',
  styleUrls: ['usuario.page.scss']
})
//@Injectable()
export class UsuarioComponent implements OnInit{
  Group : FormGroup;
  private formSubmitAttempt: boolean; 
  dsCep : string;
  usuario:Usuario;
  constructor( private usuariows: UsuariosWS) {}

  isFieldValid(field: string) {
    return (
      (this.Group.get(field).valid && this.Group.get(field).touched)
    );
  }

  ngOnInit() {
  }

  private dsloginValidator(control: AbstractControl) {
    return this.usuariows.findByDslogin(control.value).pipe(
      map(result => {
          if (result != null && result.length > 0) {
            if (this. dsCep != null && this.dsCep === this.usuario.dsLogin) {
              return true;
            }
            return {'dsloginExists': true};
          }
          return true;
        }
      )
    );
  }
}
