import { TestBed } from '@angular/core/testing';

import { NgxValidatorService } from './ngx-validator.service';

describe('NgxValidatorService', () => {
  let service: NgxValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
