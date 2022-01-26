import { NgModule } from '@angular/core';
import { NgxValidatorComponent } from './ngx-validator.component';
import { GetErrorMessagePipe } from './pipes/get-error-message.pipe';
import { InterpolationPipe } from './pipes/interpolation.pipe';
import { GetInterpolationDataPipe } from './pipes/get-interpolation-data.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NgxValidatorComponent,
    GetErrorMessagePipe,
    InterpolationPipe,
    GetInterpolationDataPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NgxValidatorComponent
  ]
})
export class NgxValidatorModule { }
