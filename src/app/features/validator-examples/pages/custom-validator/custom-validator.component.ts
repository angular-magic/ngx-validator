import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxValidatorComponent } from '@angular-magic/ngx-validator';
import { FormUtils } from '../../../../form.utils';
import { customFormHTML, customFormValidations } from './form-code';
import { controlsEqual } from '../../../../validators/control-equal.validator';

@Component({
  selector: 'app-custom-validator',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    NgxValidatorComponent,
    ReactiveFormsModule,
  ],
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
