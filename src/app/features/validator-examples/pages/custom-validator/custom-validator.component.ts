import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../../../form.utils';
import { customFormHTML, customFormValidations } from './form-code';
import { controlsEqual } from '../../../../validators/control-equal.validator';

@Component({
  selector: 'app-custom-validator',
  templateUrl: './custom-validator.component.html',
  styleUrls: ['./custom-validator.component.scss'],
})
export class CustomValidatorComponent {
  form: FormGroup;
  customFormHTML: typeof customFormHTML = customFormHTML;
  customFormValidations: typeof customFormValidations = customFormValidations;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      password: [null, Validators.required],
      conf_pass: [null, Validators.required],
    }, {
      validators: [
        controlsEqual('conf_pass', 'password', 'passwordNotEquals'),
      ],
    });
  }

  submit(): void {
    FormUtils.markAsTouched(this.form);
  }
}
