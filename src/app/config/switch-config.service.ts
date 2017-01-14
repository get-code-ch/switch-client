import {Injectable, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {SwitchConfig} from './switch-config';

@Injectable()
export class SwitchConfigService implements OnInit {
  private configurationSrc = new Subject<SwitchConfig>();

  configuration$ = this.configurationSrc.asObservable();

  constructor(private http: Http) {
  }

  ngOnInit() {
  }

  getConfig() {
    return this.http.get('http://pommepi3.pommepn:8080/switch.conf').map(response => {
      return <SwitchConfig>response.json().data;
    });
  }

  updateConfig(conf: SwitchConfig) {
    this.configurationSrc.next(conf);
  }


}
