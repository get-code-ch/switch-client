import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {SwitchConfig} from './switch-config';
import {environment} from '../../environments/environment';

@Injectable()
export class SwitchConfigService {
  private configurationSrc = new Subject<SwitchConfig>();

  configuration$ = this.configurationSrc.asObservable();

  constructor(private http: Http) {
  }

  getConfig() {
    if (environment.production) {
      return this.http.get('http://pommepi3.pommepn:8080/switch.conf').map(response => {
        return <SwitchConfig>response.json().data;
      });
    } else {
      return this.http.get('http://localhost/switch.conf').map(response => {
        return <SwitchConfig>response.json().data;
      });
      /*
      return this.http.get('switch.conf').map(response => {
        return <SwitchConfig>response.json().data;
      });
       */
    }
  }

  updateConfig(conf: SwitchConfig) {
    this.configurationSrc.next(conf);
  }

}
