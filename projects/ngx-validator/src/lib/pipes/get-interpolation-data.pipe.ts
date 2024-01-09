import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'getInterpolationData',
})
export class GetInterpolationDataPipe implements PipeTransform {
  transform(errors: ValidationErrors | null | undefined, customName: string | undefined, control: FormControl | AbstractControl | undefined): Record<string, string> {
    if (!errors) {
      return {};
    }

    const properties = Object.keys(errors);
    const name = customName ? customName : this.prettifyControlName(this.getControlName(control));

    switch (properties[0]) {
      case 'min':
        return { field: name, min: errors['min']['min'] };
      case 'max':
        return { field: name, max: errors['max']['max'] };
      case 'minlength':
        return { field: name, length: errors['minlength']['requiredLength'] };
      case 'maxlength':
        return { field: name, length: errors['maxlength']['requiredLength'] };
      default:
        return { field: name, value: errors[properties[0]]?.value };
    }
  }

  getControlName(control: FormControl | AbstractControl | undefined): string {
    let controlName = '';
    const parent = control ? control.parent : '';

    if (parent instanceof FormGroup) {
      for (const name in parent.controls) {
        if (control === parent.controls[name]) {
          controlName = name;
        }
      }
    }

    return controlName;
  }

  private prettifyControlName(name: string): string {
    return name
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[\s_]+/g, ' ')
      .toLowerCase();
  }
}
