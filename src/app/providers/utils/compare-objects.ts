import { Injectable } from "@angular/core";

/**
 * Compara dois objetos.
 * Usado no [compareWith] do mat-select.
 */
@Injectable()
export abstract class CompareObjects {

  /**
   * Compara dois objetos pelo id, objetos sao iguais se ids sao iguais.
   * @param obj1
   * @param obj2
   * @returns {boolean}
   */
  public compareIds(obj1: any, obj2: any): boolean {
    return obj1 && obj2 && obj1.id === obj2.id;
  }

}
