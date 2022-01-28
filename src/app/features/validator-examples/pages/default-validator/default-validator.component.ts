import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../../../form.utils';
import { defaultFormHTML, defaultFormValidations } from './form-code';

@Component({
  selector: 'app-default-validator',
  templateUrl: './default-validator.component.html',
  styleUrls: ['./default-validator.component.scss'],
})
export class DefaultValidatorComponent {
  form: FormGroup;
  myCustomControl: FormControl;
  defaultFormHTML: typeof defaultFormHTML = defaultFormHTML;
  defaultFormValidations: typeof defaultFormValidations = defaultFormValidations;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18), Validators.max(50)]],
    })

    this.myCustomControl = this.formBuilder.control(null, [Validators.required, Validators.maxLength(256)]);
  }

  submit(): void {
    FormUtils.markAsTouched(this.form);
    this.myCustomControl.markAsTouched({ onlySelf: true });
  }
}
