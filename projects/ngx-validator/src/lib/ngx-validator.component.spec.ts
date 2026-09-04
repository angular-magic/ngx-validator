import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NgxValidatorComponent } from './ngx-validator.component';
import { NgxValidatorService } from './ngx-validator.service';

describe('NgxValidatorComponent', () => {
  let fixture: ComponentFixture<NgxValidatorComponent>;
  let service: NgxValidatorService;

  /** Text currently rendered by the validator, or null when it renders nothing. */
  function renderedText(): string | null {
    const paragraph = (fixture.nativeElement as HTMLElement).querySelector('p.ngx-validator');

    return paragraph ? (paragraph.textContent ?? '').trim() : null;
  }

  /** Flushes effects and refreshes the view. */
  async function flush(): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
  }

  async function setControl(control: FormControl): Promise<void> {
    fixture.componentRef.setInput('control', control);
    await flush();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxValidatorComponent],
    }).compileComponents();

    service = TestBed.inject(NgxValidatorService);
    fixture = TestBed.createComponent(NgxValidatorComponent);
    await flush();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders nothing without a control', () => {
    expect(renderedText()).toBeNull();
  });

  it('renders nothing for a valid control', async () => {
    const control = new FormControl('Dan', Validators.required);
    control.markAsTouched();
    await setControl(control);

    expect(renderedText()).toBeNull();
  });

  it('renders nothing for an invalid but untouched control', async () => {
    await setControl(new FormControl(null, Validators.required));

    expect(renderedText()).toBeNull();
  });

  // Regression guard for the Angular 22 OnPush default: the component no longer
  // reads control state directly in the template, so it has to pick up the
  // touched/status change from AbstractControl.events to re-render.
  it('renders the message once an already-invalid control becomes touched', async () => {
    const group = new FormGroup({ lastName: new FormControl(null, Validators.required) });
    await setControl(group.controls.lastName);

    expect(renderedText()).toBeNull();

    group.controls.lastName.markAsTouched();
    await flush();

    expect(renderedText()).toBe('last name required');
  });

  it('stops rendering once the control becomes valid again', async () => {
    const control = new FormControl<string | null>(null, Validators.required);
    control.markAsTouched();
    await setControl(control);

    expect(renderedText()).toBe('required');

    control.setValue('Dan');
    await flush();

    expect(renderedText()).toBeNull();
  });

  it('renders before touch when validationOnTouch is off', async () => {
    service.validationOnTouch.set(false);
    await setControl(new FormControl(null, Validators.required));

    expect(renderedText()).toBe('required');
  });

  it('uses customName for the field token', async () => {
    const control = new FormControl(null, Validators.required);
    control.markAsTouched();
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('customName', 'Hobby');
    await flush();

    expect(renderedText()).toBe('Hobby required');
  });

  it('lets customValidation override the configured message', async () => {
    const control = new FormControl(null, Validators.required);
    control.markAsTouched();
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('customValidation', { name: 'required', text: 'Please fill this in' });
    await flush();

    expect(renderedText()).toBe('Please fill this in');
  });

  it('picks up messages changed on the service at run time', async () => {
    const group = new FormGroup({ lastName: new FormControl(null, Validators.required) });
    group.controls.lastName.markAsTouched();
    await setControl(group.controls.lastName);

    expect(renderedText()).toBe('last name required');

    service.setValidationMessages({ required: '{{field}} is important for us' });
    await flush();

    expect(renderedText()).toBe('last name is important for us');
  });

  it('follows the control it is pointed at when the input changes', async () => {
    const first = new FormControl(null, Validators.required);
    first.markAsTouched();
    await setControl(first);

    expect(renderedText()).toBe('required');

    const second = new FormControl('valid', Validators.required);
    second.markAsTouched();
    await setControl(second);

    expect(renderedText()).toBeNull();
  });
});
