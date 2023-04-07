import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnvironmentService} from '../environment/environment.service';
import {Headers, Http, ResponseContentType} from '@angular/http';

@Injectable({ providedIn: 'root' })
export abstract class BaseEntityWS<T> {

  private _url: string;

  constructor(private _httpClient: HttpClient, private url: string) {
    this._url = url;
    if (url.slice(-1).trim() !== '/') {
      this._url = url ;
    }
  }

  

  public findById(id: number): Observable<T> {
    return this._httpClient.get<T>(this._url );
  }

  public findAll(page?: number, linesPerPage?: number, orderBy?: string, direction?: string, field?: string, nmusuario ?: string): Observable<any[]> {
    return this._httpClient.get<any[]>(this._url + this.configuraParametrosFindAll(page, linesPerPage, orderBy, direction, field, nmusuario));
  }
  

  public save(obj: T): Observable<T> {
    if(obj['oid'] == null)  
    {
    return this.insert(obj);
    } else if(obj['oid'] != null){
      return this.update(obj);
    }
    
  }
  

  public insert(obj: T): Observable<T> {
    return this._httpClient.post<T>(this._url, obj);
  }


  public findTabela(field?: string): Observable<any[]> {
    let finalUrl = 'tabela/?field=' + field;
    if (field == null || field.trim() === '') {
      finalUrl = '/tabela/';
    }
    return this._httpClient.get<any[]>(this._url + finalUrl);
  }

 public findUpdate(page?: number, linesPerPage?: number, orderBy?: string, direction?: string, field?: string, nmusuario ?: string): Observable<any[]> {
  let finalUrl = 'update/?field=' + field;
  if (field == null || field.trim() === '') {
    finalUrl = '/update/';
  }
  return this._httpClient.get<any[]>(this._url+ finalUrl + this.configuraParametrosFindAll(page, linesPerPage, orderBy, direction, field,nmusuario ));
 }
  public update(obj: T): Observable<T> {
   // debugger;
    return this._httpClient.put<T>(this._url , obj);
  }

 
  public delete(oid: number) {
    return this._httpClient.delete<T>(this._url+ oid);
  }
 public configuraParametros(nmusuario : string){
  let elements = '';
  if (nmusuario != null ) {
    if (!elements.includes('?')) {
      elements += '?nmusuario=' + nmusuario;
    } else {
      elements += '&nmusuario=' + nmusuario;
    }
  }
  return elements;
  }
  public configuraParametrosFindAll(page: number, linesPerPage: number, orderBy: string, direction: string, field: string, nmusuario: string ): string {
    let elements = '';

    // PAGE
    if (page != null) {
      elements += '?page=' + page;
    }

    // LINES PER PAGE
    if (linesPerPage != null ) {
      if (!elements.includes('?')) {
        elements += '?linesPerPage=' + linesPerPage;
      } else {
        elements += '&linesPerPage=' + linesPerPage;
      }
    }

    // ORDER BY AND DIRECTION
    if (orderBy != null && direction != null) {
      if (!elements.includes('?')) {
        elements += '?orderBy=' + orderBy + '&direction=' + direction;
      } else {
        elements += '&orderBy=' + orderBy + '&direction=' + direction;
      }
    }

    // FIELD
    if (field != null ) {
      if (!elements.includes('?')) {
        elements += '?field=' + field;
      } else {
        elements += '&field=' + field;
      }
    }

    if (nmusuario != null ) {
      if (!elements.includes('?')) {
        elements += '?nmusuario=' + nmusuario;
      } else {
        elements += '&nmusuario=' + nmusuario;
      }
    }
    
    return elements;
  }


}
