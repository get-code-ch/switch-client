import {Component, OnInit} from '@angular/core';

import {SwitchConfigService} from './config/switch-config.service';
import {SwitchConfig} from './config/switch-config';

@Component({
  selector: 'swc-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/styles/app.component.scss']
})

export class AppComponent implements OnInit {
  configuration: SwitchConfig;

  constructor(private configService: SwitchConfigService) {
  }

  ngOnInit() {
    this.configService.getConfig().subscribe(switchConfig => this.loadConfig(switchConfig));
  }

  loadConfig(switchConfig: SwitchConfig) {
    this.configuration = switchConfig;
    console.log(JSON.stringify(this.configuration));
    this.configService.updateConfig(this.configuration);
  }

  addGpio() {
    this.configuration.gpios.push({
      id: 18,
      description: 'Hello',
      state: false
    });
    this.configService.updateConfig(this.configuration);
  }
}
