import { Observable } from 'rxjs';

import { computed, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';

const VALIDATION_MESSAGES = {
  required: '{{field}} required',
  email: 'Email is not valid',
  minlength: '{{field}} should have minimum {{length}} characters',
  maxlength: '{{field}} should have maximum {{length}} characters',
  min: '{{field}} minimum value is {{min}}',
  max: '{{field}} maximum value is {{max}}',
  pattern: '{{field}} have incorrect format',
  passwordNotEquals: 'Passwords are not the same',
  atLeastOne: 'At least one is required',
};

export interface NgxValidatorMessages {
  required?: string;
  email?: string;
  minlength?: string;
  maxlength?: string;
  min?: string;
  max?: string;
  pattern?: string;

  [key: string]: string | undefined;
}

export interface MessagesResponse {
  messages: NgxValidatorMessages;
}

@Injectable({
  providedIn: 'root',
})
export class NgxValidatorService {
  /** Active message templates, keyed by validation error name. */
  readonly messages = signal<NgxValidatorMessages>(VALIDATION_MESSAGES);

  /** Raw errors most recently applied through {@link setBackendErrorsOnForm}. */
  readonly backendValidation = signal<Record<string, string[]>>({});

  /**
   * When true (the default) messages only render once a control is both invalid
   * and touched. Set to false to render them as soon as the control is invalid.
   */
  readonly validationOnTouch = signal(true);

  readonly messages$: Observable<MessagesResponse> = toObservable(
    computed<MessagesResponse>(() => ({ messages: this.messages() })),
  );

  readonly backendValidation$: Observable<Record<string, string[]>> = toObservable(this.backendValidation);

  setValidationMessages(messages: NgxValidatorMessages): void {
    this.messages.update(current => ({ ...current, ...messages }));
  }

  setBackendErrorsOnForm(form: FormGroup, backendErrors: Record<string, string[]>): void {
    const generatedErrors: Record<string, string> = {};

    Object.keys(backendErrors).forEach(key => {
      const errorKey = `BE_${key}`;

      if (form.controls[key]) {
        if (Array.isArray(backendErrors[key])) {
          form.controls[key].setErrors({ [errorKey]: true });
          generatedErrors[errorKey] = backendErrors[key].join(' | ');
        }
      }
    });

    this.backendValidation.set(backendErrors);
    this.setValidationMessages(generatedErrors);
  }
}
