import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable } from 'rxjs';
import {EnvironmentService} from '../providers/environment/environment.service';
import {GlobalVars} from '../providers/utils/global-vars';
import {UsuarioLogado} from '../model/usuario-logado';
//import {ConexaoPage } from './conexao';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import {AppServices} from './AppServices';
import {Http, Headers, Response} from '@angular/http';
import {HomePage } from '../providers/utils/conexao';
import {map} from 'rxjs/operators';
import { LoginComponent } from '../pages/login/login.page';


@Injectable()
export class AuthService{ 

  //public isLoggedIn = new BehaviorSubject(false);

  
  constructor(
    private router: Router,
    private globalVars: GlobalVars,
    private env: EnvironmentService,
    private httpClient: HttpClient,
    public injector:Injector,
    private http: Http,
    public home: HomePage,
    
  ) {
    
 
  }
  
 
login(dslogin : string, dssenha): Observable<UsuarioLogado>{
  return this.httpClient.post<UsuarioLogado>(
    this.env.getHostURL() + '/login',
    {login: dslogin, senha: dssenha});
}

logout() {
    this.globalVars.clearToken();
    this.globalVars.isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }
  

}
