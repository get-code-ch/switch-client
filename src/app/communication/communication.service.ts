import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';

import * as io from 'socket.io-client';

import {SwitchConfigService} from '../config/switch-config.service';
import {SwitchConfig, Gpio} from '../config/switch-config';


@Injectable()
export class CommunicationService {
  socket: any;

  private dataSrc = new Subject<any>();
  data$ = this.dataSrc.asObservable();

  configuration: SwitchConfig;


  constructor(private configService: SwitchConfigService) {
    this.configuration = new SwitchConfig;
    this.configuration.server = null;
    this.socket = null;
    this.configService.getConfig().subscribe(switchConfig => {
      this.configChangeEvent(switchConfig);
    });
  }

  configChangeEvent(switchConfig: SwitchConfig) {
    this.configService.updateConfig(switchConfig);
    this.configuration = switchConfig;
    if (this.socket !== null) {
      this.socket.disconnect();
    }
    this.connect();
  }

  connect() {
    this.socket = io(this.configuration.service + '://' + this.configuration.server + ':' + this.configuration.port);
    // Receive new status
    this.socket.on('gpiostatus', function (data: any) {
      console.log('gpiostatus : ' + JSON.stringify(data));
      let i = this.configuration.gpios.findIndex(element => element.id === data.id);
      this.configuration.gpios[i].state = data.state;
      this.dataSrc.next(data);
    }.bind(this));

    this.socket.on('configuration', function (data: any) {
      console.log('configuration : ' + JSON.stringify(data));
      this.configuration = data.data;
      this.configService.updateConfig(this.configuration);
    }.bind(this));

    this.configuration.gpios.filter(element => {
      console.log('connect: ' + JSON.stringify(element));
      this.socket.emit('get', {
        'id': element.id,
        'cmd': 'state',
        'state': element.state,
        'description': element.description
      });
    });
  }

  changeState(pin, state: boolean) {
    if (state) {
      this.socket.emit('set', {'id': pin, 'cmd': 'state', value: 'ON'});
    } else {
      this.socket.emit('set', {'id': pin, 'cmd': 'state', value: 'OFF'});
    }
  }

  addPin(pin: Gpio) {
    this.socket.emit('get', {'id': pin.id, 'cmd': 'state', 'state': pin.state, 'description': pin.description});
  }

}
