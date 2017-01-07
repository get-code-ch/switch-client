import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {SwitchConfig} from './switch-config';

@Injectable()
export class SwitchConfigService {
  configuration: SwitchConfig;

  constructor(private http: Http) {
  }

  getConfig() {
    return this.http.get('assets/switch.conf').map(response => <SwitchConfig>response.json().data);
  }

}
