export const customFormHTML = `
    <div class="tab-content">
      Bellow you can check next functionality:
      <ul>
        <li>Change default message of validations</li>
        <li>Use custom name from your control</li>
        <li>Add custom validation</li>
      </ul>
      <form [formGroup]="form">
        <div>
          <mat-form-field appearance="fill">
            <mat-label>Name</mat-label>
            <input formControlName="name" matInput type="text">

            <mat-error>
              <ngx-validator [control]="form?.controls?.['name']"
                             [customValidation]="{name: 'required', text: 'Name is required your son of a b***h!'}"></ngx-validator>
            </mat-error>
          </mat-form-field>
        </div>

        <div>
          <mat-form-field appearance="fill">
            <mat-label>Password</mat-label>
            <input formControlName="password" matInput type="password">

            <mat-error>
              <ngx-validator [control]="form?.controls?.['password']"></ngx-validator>
            </mat-error>
          </mat-form-field>
        </div>

        <div>
          <mat-form-field appearance="fill">
            <mat-label>Confirm password</mat-label>
            <input formControlName="conf_pass" matInput type="password">

            <mat-error>
              <ngx-validator [control]="form?.controls?.['conf_pass']"
                             [customValidation]="{name:'passwordNotEquals', text: 'Passwords are not the same!'}"
                             customName="Confirm password"></ngx-validator>
            </mat-error>
          </mat-form-field>
        </div>
      </form>
      <button (click)="submit()" mat-stroked-button>Submit</button>
    </div>
`;

export const customFormValidations = `
    import { Component } from '@angular/core';
    import { FormBuilder, FormGroup, Validators } from '@angular/forms';
    import { FormUtils } from '../../../../form.utils';
    import { controlsEqual } from '../../../../validators/control-equal.validator';

    @Component({
      selector: 'app-custom-validator',
      templateUrl: './custom-validator.component.html',
      styleUrls: ['./custom-validator.component.scss'],
    })
    export class CustomValidatorComponent {
      form: FormGroup;

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
`;
