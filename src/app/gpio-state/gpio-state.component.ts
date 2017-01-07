import {Component, OnInit} from '@angular/core';
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

  gpioIn = 16;
  servername: string = 'N/A';
  state: number;
  gpio: number;

  constructor(private configService: SwitchConfigService) {
  }

  ngOnInit() {
    this.configService.getConfig().subscribe(switchConfig => this.connect(switchConfig));
  }

  connect(switchConfig: SwitchConfig) {
    this.socket = io(switchConfig.service + '://' + switchConfig.server + ':' + switchConfig.port);

    this.socket.on('gpiostatus', function (data: any) {
      console.log('gpiostatus : ' + JSON.stringify(data));
      this.servername = data.servername;
      this.gpio = data.gpio;
      this.state = data.state;
    }.bind(this));

    this.socket.emit('get', {'gpio': this.gpioIn, 'cmd': 'state'});
  }

  changeState(gpioIn, state: boolean) {
    if (state) {
      this.socket.emit('send', {gpio: gpioIn, 'cmd': 'state', value: 'ON'});
    } else {
      this.socket.emit('send', {gpio: gpioIn, 'cmd': 'state', value: 'OFF'});
    }
  }
}
