import { Component, inject, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { CustomValidation } from './models/custom-validation.model';
import { NgxValidatorService } from './ngx-validator.service';

@Component({
  selector: 'ngx-validator',
  template: `
    @if (ngxValidatorService?.validationOnTouch) {
      @if (control?.invalid && control?.touched) {
        @if (control?.errors) {
          <p class="ngx-validator">
        <span
          [innerHTML]="(control?.errors | getErrorMessage: customValidation | async) | interpolation: (control?.errors | getInterpolationData: customName : control)"></span>
          </p>
        }
      }
    } @else {
      @if (control?.errors) {
        <p class="ngx-validator">
        <span
          [innerHTML]="(control?.errors | getErrorMessage: customValidation | async) | interpolation: (control?.errors | getInterpolationData: customName : control)"></span>
        </p>
      }
    }
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

  ngxValidatorService = inject(NgxValidatorService);
}
