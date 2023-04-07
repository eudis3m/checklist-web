import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './../../model/usuario';
import { EnvironmentService } from '../environment/environment.service';
import { BaseEntityWS } from './base-entity.ws';

//@Injectable({ providedIn: 'root' })
@Injectable()
export class UsuariosWS extends BaseEntityWS<Usuario> {

  constructor(private httpClient: HttpClient, private env: EnvironmentService) {
    super(httpClient, env.getHostURL() + '/usuarios/');
  }

  public buscarListaUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.env.getHostURL() + '/usuarios');
  }

  public findByDslogin(dsLogin: string): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.env.getHostURL() + '/usuarios/dsLogin/' + dsLogin);
  }
}
