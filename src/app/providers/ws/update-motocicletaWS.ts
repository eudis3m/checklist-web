import { EnvironmentService } from '../environment/environment.service';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseEntityWS } from './base-entity.ws';
import { UpdateMotocicleta } from '../../model/update-motocicleta';
import { CadastrarMotocicleta } from '../../model/cadastrar-motocicleta';

@Injectable()
export class UpdateMotocicletaWS extends BaseEntityWS<UpdateMotocicleta> {
updateMotocicleta:  UpdateMotocicleta;
cadastrarMotocicleta: CadastrarMotocicleta;
    constructor(private httpClient: HttpClient, private env: EnvironmentService, ) {
        super(httpClient, env.getHostURL() + '/checklist/');
    }


      public findPlacaMotocicleta(placa: string): Observable<CadastrarMotocicleta[]>{
        return this.httpClient.get<CadastrarMotocicleta[]>(this.env.getHostURL() + '/retiraveiculo/consultaMotocicleta/'+placa);
      }
}
