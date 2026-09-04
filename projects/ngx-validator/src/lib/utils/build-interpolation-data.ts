import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

/**
 * Builds the token map fed to {@link interpolate}. The `field` token defaults to
 * a prettified version of the control's own name within its parent FormGroup.
 */
export function buildInterpolationData(
  errors: ValidationErrors | null | undefined,
  customName: string | undefined,
  control: AbstractControl | undefined,
): Record<string, string> {
  if (!errors) {
    return {};
  }

  const properties = Object.keys(errors);
  const field = customName ? customName : prettifyControlName(getControlName(control));

  switch (properties[0]) {
    case 'min':
      return { field, min: errors['min']['min'] };
    case 'max':
      return { field, max: errors['max']['max'] };
    case 'minlength':
      return { field, length: errors['minlength']['requiredLength'] };
    case 'maxlength':
      return { field, length: errors['maxlength']['requiredLength'] };
    default:
      return { field, value: errors[properties[0]]?.value };
  }
}

/** Finds the key this control is registered under in its parent FormGroup. */
export function getControlName(control: AbstractControl | undefined): string {
  const parent = control?.parent;

  if (!(parent instanceof FormGroup)) {
    return '';
  }

  for (const name of Object.keys(parent.controls)) {
    if (control === parent.controls[name]) {
      return name;
    }
  }

  return '';
}

function prettifyControlName(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[\s_]+/g, ' ')
    .toLowerCase();
}
