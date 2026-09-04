import { ValidationErrors } from '@angular/forms';

import { CustomValidation } from '../models/custom-validation.model';
import { NgxValidatorMessages } from '../ngx-validator.service';

/**
 * Picks the message template for the first error on a control, letting a
 * matching `customValidation` entry win over the configured defaults.
 */
export function resolveErrorMessage(
  errors: ValidationErrors | null | undefined,
  customValidation: CustomValidation | CustomValidation[] | undefined,
  messages: NgxValidatorMessages,
): string | undefined {
  const properties = Object.keys(errors ?? {});
  const customMessage = findCustomMessage(properties, customValidation);

  if (customMessage) {
    return customMessage.text;
  }

  return messages[properties[0]];
}

function findCustomMessage(
  properties: string[],
  customValidation: CustomValidation | CustomValidation[] | undefined,
): CustomValidation | undefined {
  if (!customValidation) {
    return undefined;
  }

  if (Array.isArray(customValidation)) {
    return customValidation.find(validation => properties.includes(validation.name));
  }

  return properties.includes(customValidation.name) ? customValidation : undefined;
}
