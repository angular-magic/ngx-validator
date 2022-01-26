import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { CustomValidation } from './models/custom-validation.model';

@Component({
  selector: 'ngx-validator',
  template: `
    <ng-container *ngIf="control?.invalid && control?.touched">
      <p *ngIf="control?.errors">
        <span
          [innerHTML]="(control?.errors | getErrorMessage: customValidation | async) | interpolation: (control?.errors | getInterpolationData: customName : control)"></span>
      </p>
    </ng-container>
  `,
  styles: [
    `
      p {
        margin: 0;
        display: inline-block;
      }

      p:first-letter {
        text-transform: capitalize;
      }
    `,
  ],
})
export class NgxValidatorComponent {
  @Input() control: FormControl | AbstractControl | undefined;
  @Input() customName: string | undefined;
  @Input() customValidation: CustomValidation | CustomValidation[] | undefined;
}
