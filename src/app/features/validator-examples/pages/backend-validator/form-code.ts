export const backendFormHTML = `
    <mat-tab label="Overview">
    <div class="tab-content">
      Bellow you can check next functionalities:
      <ul>
        <li>Handle backend errors and show it under the right controls</li>
      </ul>
      <form [formGroup]="form">
        <div>
          <mat-form-field appearance="fill">
            <mat-label>Name</mat-label>
            <input formControlName="name" matInput type="text">

            <mat-error>
              <ngx-validator [control]="form?.controls?.['name']"></ngx-validator>
            </mat-error>
          </mat-form-field>
        </div>

        <div>
          <mat-form-field appearance="fill">
            <mat-label>Email</mat-label>
            <input formControlName="email" matInput type="email">

            <mat-error>
              <ngx-validator [control]="form?.controls?.['email']"></ngx-validator>
            </mat-error>
          </mat-form-field>
        </div>

        <div>
          <mat-form-field appearance="fill">
            <mat-label>Age</mat-label>
            <input formControlName="age" matInput type="number">

            <mat-error>
              <ngx-validator [control]="form?.controls?.['age']"></ngx-validator>
            </mat-error>
          </mat-form-field>
        </div>
      </form>
      <button (click)="submit()" mat-stroked-button>Submit</button>
    </div>
`;

export const backendFormValidations = `
    import { Component } from '@angular/core';
    import { FormBuilder, FormGroup, Validators } from '@angular/forms';
    import { NgxValidatorService } from '@angular-magic/ngx-validator';
    import { FormUtils } from '../../../../form.utils';
    import { first, of } from 'rxjs';

    @Component({
      selector: 'app-backend-validator',
      templateUrl: './backend-validator.component.html',
      styleUrls: ['./backend-validator.component.scss'],
    })
    export class BackendValidatorComponent {
      form: FormGroup;
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
`;
