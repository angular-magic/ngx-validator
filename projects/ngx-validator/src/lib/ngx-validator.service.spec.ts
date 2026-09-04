import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  it('ships default messages', () => {
    expect(service.messages()['required']).toBe('{{field}} required');
  });

  it('validates on touch by default', () => {
    expect(service.validationOnTouch()).toBe(true);
  });

  it('merges new messages over the defaults', () => {
    service.setValidationMessages({ required: 'You must fill this in' });

    expect(service.messages()['required']).toBe('You must fill this in');
    expect(service.messages()['email']).toBe('Email is not valid');
  });

  it('applies backend errors onto matching controls', () => {
    const form = new FormGroup({
      email: new FormControl('taken@example.com', Validators.email),
      age: new FormControl(60),
    });

    service.setBackendErrorsOnForm(form, {
      email: ['This email is already in use'],
      age: ['Maximum age is 50', 'Must be a number'],
    });

    expect(form.controls.email.errors).toEqual({ BE_email: true });
    expect(service.messages()['BE_email']).toBe('This email is already in use');
    expect(service.messages()['BE_age']).toBe('Maximum age is 50 | Must be a number');
  });

  it('ignores backend errors for controls the form does not have', () => {
    const form = new FormGroup({ email: new FormControl(null) });

    service.setBackendErrorsOnForm(form, { nickname: ['Already taken'] });

    expect(service.messages()['BE_nickname']).toBeUndefined();
  });

  it('records the raw backend errors it was given', () => {
    const form = new FormGroup({ email: new FormControl(null) });
    const errors = { email: ['This email is already in use'] };

    service.setBackendErrorsOnForm(form, errors);

    expect(service.backendValidation()).toEqual(errors);
  });
});
