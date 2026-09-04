import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NgxValidatorService } from '@angular-magic/ngx-validator';

import { DefaultValidatorComponent } from './default-validator.component';

/**
 * End-to-end cover for the Angular 22 OnPush default: drives the real page
 * through real DOM events (blur, input) and asserts the validator message
 * appears and disappears. This is what a manual pass over the demo checks.
 */
describe('DefaultValidatorComponent (integration)', () => {
  let fixture: ComponentFixture<DefaultValidatorComponent>;
  let host: HTMLElement;

  async function flush(): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
  }

  function inputFor(controlName: string): HTMLInputElement {
    const input = host.querySelector<HTMLInputElement>(`input[formcontrolname="${controlName}"]`);

    if (!input) {
      throw new Error(`No input rendered for control "${controlName}"`);
    }

    return input;
  }

  function messages(): string[] {
    return Array.from(host.querySelectorAll('p.ngx-validator'))
      .map(element => (element.textContent ?? '').trim());
  }

  async function type(input: HTMLInputElement, value: string): Promise<void> {
    input.value = value;
    input.dispatchEvent(new Event('input'));
    await flush();
  }

  async function blur(input: HTMLInputElement): Promise<void> {
    input.dispatchEvent(new Event('blur'));
    await flush();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultValidatorComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    TestBed.inject(NgxValidatorService).setValidationMessages({ required: '{{field}} required' });

    fixture = TestBed.createComponent(DefaultValidatorComponent);
    host = fixture.nativeElement as HTMLElement;
    await flush();
  });

  it('renders the form with no messages before the user touches anything', () => {
    expect(inputFor('name')).toBeTruthy();
    expect(messages()).toEqual([]);
  });

  it('shows the required message after blurring an empty field', async () => {
    await blur(inputFor('name'));

    expect(messages()).toContain('name required');
  });

  it('clears the message once a valid value is entered', async () => {
    const name = inputFor('name');
    await blur(name);

    expect(messages()).toContain('name required');

    await type(name, 'Dan');

    expect(messages()).not.toContain('name required');
  });

  it('shows the email format message and clears it on a valid address', async () => {
    const email = inputFor('email');
    await type(email, 'not-an-email');
    await blur(email);

    expect(messages()).toContain('Email is not valid');

    await type(email, 'dan@example.com');

    expect(messages()).not.toContain('Email is not valid');
  });

  it('interpolates min and max bounds for the age field', async () => {
    const age = inputFor('age');
    await type(age, '10');
    await blur(age);

    expect(messages()).toContain('age minimum value is 18');

    await type(age, '80');

    expect(messages()).toContain('age maximum value is 50');

    await type(age, '30');

    expect(messages().join(' ')).not.toContain('age m');
  });

  it('uses customName for the hobby control', async () => {
    const hobby = host.querySelector<HTMLInputElement>('input[type="text"]:not([formcontrolname])');

    if (!hobby) {
      throw new Error('No hobby input rendered');
    }

    await blur(hobby);

    expect(messages()).toContain('Hobby required');
  });

  it('marks every control touched when Submit is pressed', async () => {
    const submit = Array.from(host.querySelectorAll('button'))
      .find(button => (button.textContent ?? '').trim() === 'Submit');

    if (!submit) {
      throw new Error('No submit button rendered');
    }

    submit.click();
    await flush();

    expect(messages()).toContain('name required');
    expect(messages()).toContain('email required');
    expect(messages()).toContain('age required');
    expect(messages()).toContain('Hobby required');
  });
});
