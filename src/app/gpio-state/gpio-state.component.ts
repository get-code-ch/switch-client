import {Component} from '@angular/core';

import * as io from 'socket.io-client';

@Component({
  selector: 'swc-gpio-state',
  templateUrl: './gpio-state.component.html',
  styleUrls: [ '../../assets/styles/app.component.scss']
})

export class GpioStateComponent {
  // socket = io.connect('http://' + window.location.hostname + ':8080');
  socket: any;

  gpioIn = 12;
  servername: string = 'N/A';
  state: number;
  gpio: number;

  constructor() {
    // this.servername = 'N/A';
    // console.log(this.servername);
    this.socket = io('http://pommepi3.pommepn:8080');

    this.socket.on('gpiostatus', function (data: any) {
      console.log('gpiostatus : ' + JSON.stringify(data));
      this.servername = data.servername;
      this.gpio = data.gpio;
      this.state = data.state;
    }.bind(this));

    this.socket.emit('get', {'gpio': this.gpioIn, 'cmd': 'state'});
  }

}
