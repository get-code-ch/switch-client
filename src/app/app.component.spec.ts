/* tslint:disable:no-unused-variable */

import {TestBed, async} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {GpioStateComponent} from './gpio-state/gpio-state.component';
import {SwitchConfigService} from './config/switch-config.service';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GpioStateComponent
      ],
      providers: [
        SwitchConfigService
      ],
      imports: [
        HttpModule
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  /*
   it(`should have as title 'app works!'`, async(() => {
   let fixture = TestBed.createComponent(AppComponent);
   let app = fixture.debugElement.componentInstance;
   expect(app.title).toEqual('app works!');
   }));

   it('should render title in a h1 tag', async(() => {
   let fixture = TestBed.createComponent(AppComponent);
   fixture.detectChanges();
   let compiled = fixture.debugElement.nativeElement;
   expect(compiled.querySelector('h1').textContent).toContain('app works!');
   }));
   */
});
