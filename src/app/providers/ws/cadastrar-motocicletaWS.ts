import { EnvironmentService } from '../environment/environment.service';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseEntityWS } from './base-entity.ws';
import { CadastrarMotocicleta } from '../../model/cadastrar-motocicleta';
import { UpdateMotocicleta } from '../../model/update-motocicleta';

@Injectable()
export class CadastrarMotocicletaWS extends BaseEntityWS<CadastrarMotocicleta> {
cadastrarMotocicleta:  CadastrarMotocicleta;
updateMotocicleta:  UpdateMotocicleta;
    constructor(private httpClient: HttpClient, private env: EnvironmentService, ) {
        super(httpClient, env.getHostURL() + '/checklistMotocicleta/');
    }

    public createMotocicleta(updateMotocicleta: UpdateMotocicleta): Observable<UpdateMotocicleta[]>{
        return this.httpClient.put<UpdateMotocicleta[]>(this.env.getHostURL()+ '/checklistMotocicleta/', updateMotocicleta);
      }

      public createVeiculoFoto(cadastrarMotocicleta: CadastrarMotocicleta, foto, foto_2, foto_3, foto_4, foto_5): Observable<CadastrarMotocicleta[]>{
        return this.httpClient.post<CadastrarMotocicleta[]>(this.env.getHostURL()+ '/checklistMotocicleta/', cadastrarMotocicleta +'/'+
        '?foto=' + foto + '?foto_2=' + foto_2 + '?foto_3=' + foto_3 + '?foto_4=' + foto_4 + '?foto_5=' + foto_5 );
      }
}
