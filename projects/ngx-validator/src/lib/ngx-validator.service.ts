import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
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
  messages: BehaviorSubject<MessagesResponse> = new BehaviorSubject<MessagesResponse>({
    messages: VALIDATION_MESSAGES,
  });

  messages$: Observable<MessagesResponse> = this.messages.asObservable();
  backendValidation: BehaviorSubject<Record<string, string[]>> = new BehaviorSubject({});
  backendValidation$: Observable<Record<string, string[]>> = this.backendValidation.asObservable();

  setValidationMessages(messages: NgxValidatorMessages): void {
    this.messages.next({ messages: { ...VALIDATION_MESSAGES, ...messages } });
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

    this.setValidationMessages(generatedErrors);
  }
}
