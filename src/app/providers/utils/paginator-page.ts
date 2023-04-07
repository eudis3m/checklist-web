import {SelectItem} from 'primeng/api';
import {Injectable} from '@angular/core';

/**
 * Classe base para a paginação
 */
 @Injectable()
export abstract class PaginatorPage {

  cols: any[];
  totalRecords: number;
  linesPerPage: number;
  page: number;
  listLinesPerPage: SelectItem[];

  searchField: string;

  tipoExportacao: string;

  constructor() {
  }

  carregarDadosTabela() {
    this.searchField = '';
    this.page = 0;
    this.totalRecords = 0;
    this.linesPerPage = 15;
    this.listLinesPerPage = [
      {label: '5', value: 5},
      {label: '15', value: 15},
      {label: '25', value: 25},
      {label: '50', value: 50},
    ];
  }

  calcularPagina(event): number {
    if (event != null) {
      if (event.first === 0) {
        return 0;
      } else {
        return (+event.first) / (+event.rows);
      }
    }
    return 0;
  }

}
