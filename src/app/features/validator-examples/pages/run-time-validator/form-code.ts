export const runTimeFormHTML = `
    <div class="tab-content">
      Bellow you can check next functionalities:
      <ul>
        <li>Change message in run time</li>
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
      <div class="spaces">
        <button (click)="submit()" mat-stroked-button>Change message</button>
        <button (click)="changeButUsingNames()" mat-stroked-button>Change message but keep control names</button>
        <button (click)="reset()" mat-stroked-button>Reset</button>
      </div>
    </div>
`;

export const runTimeFormValidations = `
    import { Component } from '@angular/core';
    import { FormBuilder, FormGroup, Validators } from '@angular/forms';
    import { FormUtils } from '../../../../form.utils';
    import { NgxValidatorService } from '@angular-magic/ngx-validator';

    @Component({
      selector: 'app-run-time-validator',
      templateUrl: './run-time-validator.component.html',
      styleUrls: ['./run-time-validator.component.scss'],
    })
    export class RunTimeValidatorComponent {
      form: FormGroup;

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
`;
