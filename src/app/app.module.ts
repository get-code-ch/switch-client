import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {GpioStateComponent} from './gpio-state/gpio-state.component';
import {AppComponent} from './app.component';

import {SwitchConfigService} from './config/switch-config.service';

@NgModule({
  declarations: [
    GpioStateComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [SwitchConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
