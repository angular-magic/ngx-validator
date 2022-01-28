import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../../../form.utils';
import { runTimeFormHTML, runTimeFormValidations } from './form-code';
import { NgxValidatorService } from '@angular-magic/ngx-validator';

@Component({
  selector: 'app-run-time-validator',
  templateUrl: './run-time-validator.component.html',
  styleUrls: ['./run-time-validator.component.scss'],
})
export class RunTimeValidatorComponent {
  form: FormGroup;
  runTimeFormHTML: typeof runTimeFormHTML = runTimeFormHTML;
  runTimeFormValidations: typeof runTimeFormValidations = runTimeFormValidations;

  constructor(
    private formBuilder: FormBuilder,
    private ngxValidatorService: NgxValidatorService,
  ) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18), Validators.max(50)]],
    });
    FormUtils.markAsTouched(this.form);
  }

  submit(): void {
    this.ngxValidatorService.setValidationMessages({ required: 'Sleight of hand and no magic.' });
  }

  changeButUsingNames(): void {
    this.ngxValidatorService.setValidationMessages({ required: '{{field}} is important for us' });
  }

  reset(): void {
    this.ngxValidatorService.setValidationMessages({ required: '{{field}} required' });
  }
}
