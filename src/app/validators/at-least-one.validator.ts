import { FormGroup } from '@angular/forms';

export function atLeastOneIsRequired(controlList: string[], errorKey: string = 'at_least_one'): any {
  return (form: FormGroup) => {
    controlList.forEach(controlName => {
      const formControl = form.get(controlName);
      const errors = formControl?.errors || {};

      if (formControl?.hasError(errorKey)) {
        delete errors[errorKey];
      }

      formControl?.setErrors(isEmptyObject(errors) ? null : errors);
    });

    const atLeastOneIsValid = controlList.some(itemName => {
      return form.controls[itemName] && form.controls[itemName].value && form.controls[itemName].valid;
    });

    if (atLeastOneIsValid) {
      form.setErrors(null);

      return null;
    } else {
      form.setErrors({ [errorKey]: true });
      controlList.forEach(control => {
        const formControl = form.get(control);

        formControl?.setErrors({ ...formControl.errors, [errorKey]: true });
      });

      return {
        [errorKey]: true
      };
    }
  };
}

function isEmptyObject(value: any): boolean {
  return JSON.stringify(value) === JSON.stringify({});
}
