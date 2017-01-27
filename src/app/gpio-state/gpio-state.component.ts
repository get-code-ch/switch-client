import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {SwitchConfigService} from '../config/switch-config.service';
import {SwitchConfig} from '../config/switch-config';

import {CommunicationService} from '../communication/communication.service';

@Component({
  selector: 'swc-gpio-state',
  templateUrl: './gpio-state.component.html',
  styleUrls: ['../../assets/styles/app.component.scss']
})

export class GpioStateComponent implements OnInit {
  socket: any;
  confSubscription: Subscription;
  dataSubscription: Subscription;
  configuration: SwitchConfig;

  constructor(private configService: SwitchConfigService, private commService: CommunicationService) {
    this.configuration = new SwitchConfig;
    this.configuration.server = null;
    this.socket = null;
  }

  ngOnInit() {
    this.dataSubscription = this.commService.data$.subscribe();
    this.confSubscription = this.configService.configuration$.subscribe(switchConfig => {
      this.configuration = switchConfig;
    });
  }

  changeState(pin, state: boolean) {
    this.commService.changeState(pin, state);
  }

  removePin(pin) {
    this.commService.removePin(pin);
  }

}
