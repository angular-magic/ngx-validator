import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { NgxValidatorService } from '../ngx-validator.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CustomValidation } from '../models/custom-validation.model';

@Pipe({
  name: 'getErrorMessage',
})
export class GetErrorMessagePipe implements PipeTransform {
  constructor(private ngxValidatorService: NgxValidatorService) {
  }

  transform(errors: ValidationErrors | null | undefined, customValidation: CustomValidation | CustomValidation[] | undefined): Observable<string | undefined> {
    return this.ngxValidatorService.messages$.pipe(map(response => {
      const properties = Object.keys(errors || {});
      let customMessage = null;
      let messages = response.messages;

      if (customValidation && Array.isArray(customValidation)) {
        customMessage = customValidation.find(validation => properties.includes(validation.name));
      }

      if (customValidation && !(Array.isArray(customValidation))) {
        const isCustomMessage = properties.some(property => customValidation.name === property);

        if (isCustomMessage) {
          customMessage = customValidation;
        }
      }

      if (customMessage) {
        messages = {
          ...messages,
          [customMessage.name]: customMessage.text,
        };
      }

      return messages[properties[0]];
    }));
  }
}
