import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NgxValidatorService } from '@angular-magic/ngx-validator';

import { BackendValidatorComponent } from './pages/backend-validator/backend-validator.component';
import { CustomValidatorComponent } from './pages/custom-validator/custom-validator.component';
import { RunTimeValidatorComponent } from './pages/run-time-validator/run-time-validator.component';

function messagesIn(host: HTMLElement): string[] {
  return Array.from(host.querySelectorAll('p.ngx-validator'))
    .map(element => (element.textContent ?? '').trim());
}

async function flush(fixture: ComponentFixture<unknown>): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
}

function clickButton(host: HTMLElement, label: string): void {
  const button = Array.from(host.querySelectorAll('button'))
    .find(candidate => (candidate.textContent ?? '').trim() === label);

  if (!button) {
    throw new Error(`No button labelled "${label}"`);
  }

  button.click();
}

describe('RunTimeValidatorComponent (integration)', () => {
  let fixture: ComponentFixture<RunTimeValidatorComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunTimeValidatorComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    TestBed.inject(NgxValidatorService).setValidationMessages({ required: '{{field}} required' });

    fixture = TestBed.createComponent(RunTimeValidatorComponent);
    host = fixture.nativeElement as HTMLElement;
    await flush(fixture);
  });

  it('renders messages for the pre-touched form', () => {
    expect(messagesIn(host)).toContain('name required');
  });

  it('swaps every message when the template is changed at run time', async () => {
    clickButton(host, 'Change message');
    await flush(fixture);

    expect(messagesIn(host)).toContain('Sleight of hand and no magic.');

    clickButton(host, 'Change message but keep control names');
    await flush(fixture);

    expect(messagesIn(host)).toContain('name is important for us');

    clickButton(host, 'Reset');
    await flush(fixture);

    expect(messagesIn(host)).toContain('name required');
  });
});

describe('BackendValidatorComponent (integration)', () => {
  it('renders backend errors under the matching controls', async () => {
    await TestBed.configureTestingModule({
      imports: [BackendValidatorComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(BackendValidatorComponent);
    const host = fixture.nativeElement as HTMLElement;
    await flush(fixture);

    clickButton(host, 'Submit');
    await flush(fixture);

    expect(messagesIn(host)).toContain('This email is already in use');
    expect(messagesIn(host)).toContain('Maximum age is 50');
  });
});

describe('CustomValidatorComponent (integration)', () => {
  it('renders the custom validation text once the control is touched', async () => {
    await TestBed.configureTestingModule({
      imports: [CustomValidatorComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(CustomValidatorComponent);
    const host = fixture.nativeElement as HTMLElement;
    await flush(fixture);

    expect(messagesIn(host)).toEqual([]);

    clickButton(host, 'Submit');
    await flush(fixture);

    expect(messagesIn(host)).toContain('Name is required your son of a b***h!');
    expect(messagesIn(host)).toContain('password required');
  });

  // The demo wraps <ngx-validator> in <mat-error>, and mat-form-field only
  // projects mat-error once its own ErrorStateMatcher reports an error state
  // (invalid && (touched || submitted)). So validationOnTouch cannot show
  // messages earlier here, however it is configured -- Material gates them
  // upstream. NgxValidatorComponent's own behaviour is covered in the library.
  it('is still gated by mat-error when validationOnTouch is off', async () => {
    await TestBed.configureTestingModule({
      imports: [CustomValidatorComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    TestBed.inject(NgxValidatorService).validationOnTouch.set(false);

    const fixture = TestBed.createComponent(CustomValidatorComponent);
    const host = fixture.nativeElement as HTMLElement;
    await flush(fixture);

    expect(host.querySelectorAll('mat-error').length).toBe(0);
    expect(messagesIn(host)).toEqual([]);
  });
});
