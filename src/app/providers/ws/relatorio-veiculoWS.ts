import { EnvironmentService } from '../environment/environment.service';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseEntityWS } from './base-entity.ws';
import { RelatorioVeiculo } from '../../model/relatori-veiculo';

@Injectable()
export class RelatorioVeiculoWS extends BaseEntityWS<RelatorioVeiculo> {
relatorioveiculo:  RelatorioVeiculo;
    constructor(private httpClient: HttpClient, private env: EnvironmentService, ) {
        super(httpClient, env.getHostURL() + '/retiraveiculo/');
    }

  public findPlaca(placa: string): Observable<RelatorioVeiculo[]>{
    return this.httpClient.get<RelatorioVeiculo[]>(this.env.getHostURL() + '/retiraveiculo/consulta/'+placa);
  }
  /*
  public findRelatorio(placa: string, email: string): Observable<RelatorioVeiculo[]>{
    return this.httpClient.get<RelatorioVeiculo[]>(this.env.getHostURL() + '/retiraveiculo/relatorio/'+ placa +'/' +'?email='+ email);
  }
  */

  public findRelatorio(placa: string, email: string): Observable<string>{
    return this.httpClient.get<string>(this.env.getHostURL() + '/retiraveiculo/relatorio/'+ placa +'/' +'?email='+ email);
  }
}
