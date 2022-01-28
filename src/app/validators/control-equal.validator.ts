import { FormGroup } from '@angular/forms';

export function controlsEqual(controlName: string, equalToName: string, errorKey: string = controlName): any {
  return (form: FormGroup) => {
    const control = form.get(controlName);

    if (!control) {
      return null;
    }

    if (control.value !== form.get(equalToName)?.value) {
      control.setErrors({ ...control.errors, [errorKey]: true });

      return {
        [errorKey]: true
      };
    } else {
      const errors = control.errors || {};

      if (control.hasError(errorKey)) {
        delete errors[errorKey];
      }

      control.setErrors(isEmptyObject(errors) ? null : errors);

      return null;
    }
  };
}

function isEmptyObject(value: any): boolean {
  return JSON.stringify(value) === JSON.stringify({});
}
