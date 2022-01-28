export const defaultFormHTML = `
    <div class="tab-content">
      Bellow you can check next validations:
      <ul>
        <li>Required</li>
        <li>Email should be valid</li>
        <li>Age should be between 18 and 50</li>
        <li>Hobby should be not longer then 256 chr</li>
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

        <div>
          <mat-form-field appearance="fill">
            <mat-label>Hobby</mat-label>
            <input [formControl]="myCustomControl" matInput type="text">

            <mat-error>
              <ngx-validator [control]="myCustomControl" customName="Hobby"></ngx-validator>
            </mat-error>
          </mat-form-field>
        </div>
      </form>
      <button (click)="submit()" mat-stroked-button>Submit</button>
    </div>
`;

export const defaultFormValidations = `
    import { Component } from '@angular/core';
    import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
    import { FormUtils } from '../../../../form.utils';

    @Component({
      selector: 'app-default-validator',
      templateUrl: './default-validator.component.html',
      styleUrls: ['./default-validator.component.scss'],
    })
    export class DefaultValidatorComponent {
      form: FormGroup;
      myCustomControl: FormControl;

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
`;
