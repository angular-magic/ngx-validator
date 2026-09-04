import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxValidatorComponent } from '@angular-magic/ngx-validator';
import { NgxValidatorService } from '@angular-magic/ngx-validator';
import { FormUtils } from '../../../../form.utils';
import { backendFormHTML, backendFormValidations } from './form-code';
import { first, of } from 'rxjs';

@Component({
  selector: 'app-backend-validator',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    NgxValidatorComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './backend-validator.component.html',
  styleUrls: ['./backend-validator.component.scss'],
})
export class BackendValidatorComponent {
  form: FormGroup;
  backendFormHTML: typeof backendFormHTML = backendFormHTML;
  backendFormValidations: typeof backendFormValidations = backendFormValidations;
  exampleOfValidationResponse = {
    type: 'validations',
    messages: {
      email: ['This email is already in use'],
      age: ['Maximum age is 50'],
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private ngxValidatorService: NgxValidatorService,
  ) {
    this.form = this.formBuilder.group({
      name: ['Dan', Validators.required],
      email: ['example@gmail.com', [Validators.required, Validators.email]],
      age: [60, [Validators.required, Validators.min(18)]],
    });
    FormUtils.markAsTouched(this.form);
  }

  submit(): void {
    of(this.exampleOfValidationResponse).pipe(first()).subscribe(errorResponse => {
      this.ngxValidatorService.setBackendErrorsOnForm(this.form, errorResponse.messages);
    });
  }
}
