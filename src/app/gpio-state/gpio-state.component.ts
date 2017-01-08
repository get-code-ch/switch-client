import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import * as io from 'socket.io-client';
import {SwitchConfigService} from '../config/switch-config.service';
import {SwitchConfig} from '../config/switch-config';

@Component({
  selector: 'swc-gpio-state',
  templateUrl: './gpio-state.component.html',
  styleUrls: ['../../assets/styles/app.component.scss']
})

export class GpioStateComponent implements OnInit {
  socket: any;
  subscription: Subscription;
  configuration: SwitchConfig;

  constructor(private configService: SwitchConfigService) {
    this.configuration = new SwitchConfig;
    this.configuration.server = null;
    this.socket = null;
  }

  ngOnInit() {
    this.subscription = this.configService.configuration$.subscribe(switchConfig => {
      this.configChangeEvent(switchConfig);
    });
  }

  configChangeEvent(switchConfig: SwitchConfig) {
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
      let i = this.configuration.gpios.findIndex(element => element.id === data.gpio);
      this.configuration.gpios[i].state = data.state;
    }.bind(this));

    this.configuration.gpios.filter(element => {
      console.log('connect: ' + JSON.stringify(element));
      this.socket.emit('get', {'gpio': element.id, 'cmd': 'state', 'state': element.state, 'description': element.description});
    });
  }

  changeState(gpioIn, state: boolean) {
    if (state) {
      this.socket.emit('set', {gpio: gpioIn, 'cmd': 'state', value: 'ON'});
    } else {
      this.socket.emit('set', {gpio: gpioIn, 'cmd': 'state', value: 'OFF'});
    }
  }
}
