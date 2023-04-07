import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';


@Injectable({providedIn: 'root'})
export class EnvironmentService {

  public getHostURL(): string {
    return environment.hostURL;
  }

  public isCurrentDev(): boolean {
    return environment.envName === 'dev';
  }

  public isCurrentHomolog(): boolean {
    return environment.envName === 'homolog';
  }

  public isCurrentProd(): boolean {
    return environment.envName === 'prod';
  }

}
