import {FormControl, FormGroup} from '@angular/forms';
import {CompareObjects} from './compare-objects';
import {AbstractControl} from '@angular/forms';
import { Injectable } from '@angular/core';


/**
 * Classe base para colocar metodos que as paginas usam FormGroup.
 */
@Injectable()
export abstract class FormGroupPage extends CompareObjects {

  public formGroup: FormGroup;

  constructor() {
    super();
  }

  /**
   * Marca todos os controls do formGroup da pagina como touched para que a validacao seja executada.
   * Metodo usado para forcar a aparecer o erro do mat-error ao abrir a pagina.
   */
  public validateAllFormFields(formGroup?: FormGroup) {
    if (formGroup == null) {
      this.validateAllFormFields(this.formGroup);
    } else {
      Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({onlySelf: true});
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      });
    }
  }

  /**
   * Chama o updateValueAndValidity de todos os controls do formGroup.
   */
  public updateAllValueAndValidity(formGroup?: FormGroup) {
    if (formGroup == null) {
      this.updateAllValueAndValidity(this.formGroup);
    } else {
      Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.updateValueAndValidity({onlySelf: true});
        } else if (control instanceof FormGroup) {
          this.updateAllValueAndValidity(control);
        }
      });
    }
  }

  /**
   * Remove os validators dos controls passados como parametro.
   * Atribui o validators dos controls como null.
   */
  public removeControlValidators(formControlNames: string[], formGroup?: FormGroup) {
    if (formGroup == null) {
      this.removeControlValidators(formControlNames, this.formGroup);
    } else {
      for (const name of formControlNames) {
        formGroup.get(name).setValidators(null);
      }
    }
  }

  /**
   * Adiciona um control nesse formGroup.
   * Se ja tem um control com o mesmo nome, nao faz nada.
   */
  public addControlIfNotExists(name: string, control: AbstractControl) {
    if (control != null && this.formGroup != null && !this.formGroup.contains(name)) {
      this.formGroup.addControl(name, control);
    }
  }

  protected updateFormGroupDisableCondition(name: string, disableConditions: {[ key: string ]: boolean}) {
    this.updateFormGroupDisable(name, disableConditions);
  }

  protected updateAllFormGroupDisableConditions(disableConditions: {[ key: string ]: boolean}) {
    this.updateFormGroupDisable(null, disableConditions);
  }

  /**
   * Atualiza o estado do 'disable' do control name passado como parametro.
   * Se nao passar parametro (null), entao atualiza o estado do 'disable'
   * de todos os controls presentes no disableConditions.
   */
  private updateFormGroupDisable(name: string | null, disableConditions: {[ key: string ]: boolean}) {
    // indica se um campo deve estar desabilitado
    if (name == null) {
      for (const conditionName of Object.keys(disableConditions)) {
        this.updateFormGroupDisable(conditionName, disableConditions);
      }
    } else {
      if (this.formGroup && disableConditions[name]) {
        this.formGroup.get(name).disable();
      } else {
        this.formGroup.get(name).enable();
      }
    }
  }

 
}
