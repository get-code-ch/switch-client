/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';
import {SwitchConfigService} from './switch-config.service';
import {HttpModule} from '@angular/http';

describe('SwitchConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SwitchConfigService
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should ...', inject([SwitchConfigService], (service: SwitchConfigService) => {
    expect(service).toBeTruthy();
  }));
});
