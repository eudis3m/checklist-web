import { EnvironmentService } from '../environment/environment.service';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseEntityWS } from './base-entity.ws';
import { UpdateVeiculo } from '../../model/update-veiculo.';
import { CadastrarVeiculo } from '../../model/cadastrar-veiculo';
import { CadastrarMotocicleta } from '../../model/cadastrar-motocicleta';

@Injectable()
export class UpdateVeiculoWS extends BaseEntityWS<UpdateVeiculo> {
updateVeiculo:  UpdateVeiculo;
cadastrarVeiculo: CadastrarVeiculo;
cadastrarMotocicleta: CadastrarMotocicleta;
    constructor(private httpClient: HttpClient, private env: EnvironmentService, ) {
        super(httpClient, env.getHostURL() + '/checklist/');
    }

   /* public findPlacaVeiculo(placa: string): Observable<CadastrarVeiculo[]>{
        return this.httpClient.get<CadastrarVeiculo[]>(this.env.getHostURL() + '/retiraveiculo/consultaVeiculo/'+placa);
      }
    */

      public findPlacaVeiculo(placa: string): Observable<CadastrarVeiculo[]>{
        return this.httpClient.get<CadastrarVeiculo[]>(this.env.getHostURL() + '/retiraveiculo/consultaVeiculo/'+placa);
      }


      public findPlacaMotocicleta(placa: string): Observable<CadastrarMotocicleta[]>{
        return this.httpClient.get<CadastrarMotocicleta[]>(this.env.getHostURL() + '/retiraveiculo/consultaMotocicleta/'+placa);
      }
}
