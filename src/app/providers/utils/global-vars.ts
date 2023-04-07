import {Injectable} from '@angular/core';
import {EnvironmentService} from '../environment/environment.service';
import {UsuarioLogado} from '../environment/usuario-logado';
import {AuthService} from '../../auth/auth.service';
import { Platform } from '@ionic/angular';
import {BehaviorSubject, Observable } from 'rxjs';
//import { Storage } from '@ionic/storage';
import {NativeStorage   } from '@ionic-native/native-storage/ngx';

@Injectable({providedIn: 'root'})
export class GlobalVars {
  private auth : AuthService
 private readonly STORAGE_TOKEN = 'access_token';
  public usuarioLogado: UsuarioLogado | null = null;
  public isLoggedIn = new BehaviorSubject(false);


  constructor(private env: EnvironmentService, public platform: Platform,  public Nativestorage : NativeStorage) {
    this.platform.ready().then(() => {
     this.getToken();
    });
  }

  public isUsuarioLogado(): boolean {
    return this.usuarioLogado != null;
  }

  public getUsuarioLogado(): UsuarioLogado {
    return this.usuarioLogado;
  }
  public setUsuarioLogado(login : string){
    return this.usuarioLogado.login = login;
  }
 getToken() {
  this.Nativestorage.getItem(this.STORAGE_TOKEN).then(res => {
      if (res) {
        this.isLoggedIn.next(true);
      }
    })
  }

  public  setToken(token: string) {
   return this.Nativestorage.setItem(this.STORAGE_TOKEN, token).then(() => {
      this.isLoggedIn.next(true);
    });
  }

  public clearToken() {
    this.Nativestorage.remove(this.STORAGE_TOKEN).then(() => {
      this.isLoggedIn.next(false);
    });
  }

  public getMensagemErroPadrao(): string {
    return 'Houve um erro de servidor, tente novamente mais tarde.';
  }
  isAuthenticated(){
    return this.isLoggedIn.value;
  }
}
