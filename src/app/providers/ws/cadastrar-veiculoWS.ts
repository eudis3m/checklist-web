import { EnvironmentService } from '../environment/environment.service';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseEntityWS } from './base-entity.ws';
import { CadastrarVeiculo } from '../../model/cadastrar-veiculo';
import { Byte } from '@angular/compiler/src/util';
import { UpdateVeiculo } from '../../model/update-veiculo.';

@Injectable()
export class CadastrarVeiculoWS extends BaseEntityWS<CadastrarVeiculo> {
cadastrarVeiculo:  CadastrarVeiculo;
updateVeiculo:  UpdateVeiculo;
    constructor(private httpClient: HttpClient, private env: EnvironmentService, ) {
        super(httpClient, env.getHostURL() + '/checklist/');
    }

    public findPlacaVeiculo(placa: string): Observable<CadastrarVeiculo[]>{
        return this.httpClient.get<CadastrarVeiculo[]>(this.env.getHostURL() + '/retiraveiculo/consulta/'+placa);
      }

      public createVeiculo(updateVeiculo: UpdateVeiculo): Observable<UpdateVeiculo[]>{
        return this.httpClient.put<UpdateVeiculo[]>(this.env.getHostURL()+ '/checklist/', updateVeiculo);
      }

      public createVeiculoFoto(cadastrarVeiculo: CadastrarVeiculo, foto, foto_2, foto_3, foto_4, foto_5): Observable<CadastrarVeiculo[]>{
        return this.httpClient.post<CadastrarVeiculo[]>(this.env.getHostURL()+ '/checklist/', cadastrarVeiculo +'/'+
        '?foto=' + foto + '?foto_2=' + foto_2 + '?foto_3=' + foto_3 + '?foto_4=' + foto_4 + '?foto_5=' + foto_5 );
      }

      public createVeiculoCad(cadastrarVeiculo: CadastrarVeiculo): Observable<CadastrarVeiculo[]>{
        return this.httpClient.post<CadastrarVeiculo[]>(this.env.getHostURL()+ '/checklist/', cadastrarVeiculo );
      }
}
