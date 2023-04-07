import { Injectable } from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable()
export class CustomValidators {

  static validatorDateBR(control: FormControl) {
    const date = control.value;

    if (date == null) {
      return null;
    }
    if (date.toString().length === 8) {
      const dia = date.substring(0, 2);
      const mes = date.substring(2, 4);
      const ano = date.substring(4, 8);

      if (+dia > 31) {
        return {'dateValid': true};
      }
      if (+mes > 12) {
        return {'dateValid': true};
      }
      if (+ano < 1900 || +ano > 2200) {
        return {'dateValid': true};
      }
    }

    return null;
  }

  static validaEmail(control: FormControl) {
    const emailRegex = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    const email: string = control.value;

    if (email == null || email.length === 0) {
      return null;
    }

    let regex = new RegExp(emailRegex);
    const valid: boolean = regex.test(email);
    return valid ? null : {'emailValid': true};
  }

  static validalogin(control: FormControl) {
    const login = control.value;
    const valid: boolean = login;
    return valid ? null : {'dsloginValid': true};
  }
  static validaTamanho11(control: FormControl) {
    const value = control.value;
    if (value != null) {
      const valid: boolean = value.toString().length <= +12;
      return valid ? null : {'sizeValid': true};
    }
    return null;
  }

  static validacnpj(control: FormControl) {
    const cnpj = control.value;
    const valid: boolean = CustomValidators.isEmpty(cnpj) || CustomValidators.isCNPJValido(cnpj);
    return valid ? null : {'cnpjValid': true};
  }

  static validaCPF(control: FormControl) {
    const strCpf: string = control.value;
    const valid: boolean = CustomValidators.isEmpty(strCpf) || CustomValidators.isCPFValido(strCpf);
    return valid ? null : {'cpfValid': true};
  }

  static isCPFValido(cpf) {
    if (cpf != null) {
      const strCpf = cpf;
      if (!CustomValidators.isEmpty(strCpf) && strCpf.length === 11 && !CustomValidators.isTodosCaracteresRepetidos(strCpf)) {
        let d1, d2;
        let digito1, digito2, resto;
        let digitoCPF;
        let nDigResult;
        d1 = d2 = 0;
        digito1 = digito2 = resto = 0;
        for (let nCount = 1; nCount < strCpf.length - 1; nCount++) {
          digitoCPF = +(strCpf.substring(nCount - 1, nCount));
          d1 = d1 + (11 - nCount) * digitoCPF;
          d2 = d2 + (12 - nCount) * digitoCPF;
        }
        resto = (d1 % 11);
        if (resto < 2) {
          digito1 = 0;
        } else {
          digito1 = 11 - resto;
        }
        d2 += 2 * digito1;
        resto = (d2 % 11);
        if (resto < 2) {
          digito2 = 0;
        } else {
          digito2 = 11 - resto;
        }
        const nDigVerific = strCpf.substring(strCpf.length - 2, strCpf.length);
        nDigResult = digito1 + '' + digito2;
        return nDigVerific === nDigResult;
      }
    }
    return false;
  }

  static isCNPJValido(cnpj) {
    if (cnpj != null) {
      const _cnpj = cnpj.replace(/[^\d]+/g, '');
      if (CustomValidators.isEmpty(_cnpj) || _cnpj.length !== 14 || CustomValidators.isTodosCaracteresRepetidos(_cnpj)) {
        return false;
      }
      // Valida DVs
      let tamanho = _cnpj.length - 2;
      let numeros = _cnpj.substring(0, tamanho);
      const digitos = _cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += +numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
          pos = 9;
        }
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado !== +digitos.charAt(0)) {
        return false;
      }
      tamanho = tamanho + 1;
      numeros = _cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += +numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
          pos = 9;
        }
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      return resultado === +digitos.charAt(1);
    }
    return null;
  }

  static isEmpty(str) {
    return (str == null || (typeof (str.trim) === 'function' && str.trim().length === 0));
  }

  static isTodosCaracteresRepetidos(str) {
    if (str && str.length > 1) {
      const primeiro = str.charAt(0);
      for (let i = 1; i < str.length; i++) {
        if (primeiro !== str.charAt(i)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

}
