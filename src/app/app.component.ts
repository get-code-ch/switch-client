import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {SwitchConfigService} from './config/switch-config.service';
import {SwitchConfig} from './config/switch-config';

import {CommunicationService} from './communication/communication.service';


@Component({
  selector: 'swc-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/styles/app.component.scss']
})

export class AppComponent implements OnInit {
  configSubscription: Subscription;
  dataSubscription: Subscription;
  configuration: SwitchConfig;
  rcvData: String;


  constructor(private configService: SwitchConfigService, private commService: CommunicationService) {
  }

  ngOnInit() {
    this.dataSubscription = this.commService.data$.subscribe(data => {
      this.rcvData = JSON.stringify(data);
      console.log('gpio-state data changed: ' + this.rcvData);
    });
    this.configSubscription = this.configService.configuration$.subscribe(switchConfig => {
      this.loadConfig(switchConfig);
    });
  }

  loadConfig(switchConfig: SwitchConfig) {
    this.configuration = switchConfig;
  }

  addGpio() {
    let pin = {
      id: 18,
      description: 'Hello',
      state: false
    };

    if (this.configuration.gpios.findIndex(element => element.id === 18) === -1) {
      this.configuration.gpios.push(pin);
      this.commService.addPin(pin);
      // this.configService.updateConfig(this.configuration);
    }
  }
}
