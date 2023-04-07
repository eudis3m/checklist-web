import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsuarioLogado} from '../../model/usuario-logado';
import {EnvironmentService} from '../environment/environment.service';

@Injectable()
export class LoginWS {

  constructor(private httpClient: HttpClient, private env: EnvironmentService) {
  }

  login(dslogin: string, dssenha: string): Observable<UsuarioLogado> {
    return this.httpClient.post<UsuarioLogado>(this.env.getHostURL() + '/login', {login: dslogin, senha: dssenha});
  }

}
