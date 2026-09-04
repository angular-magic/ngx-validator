import { NgModule } from '@angular/core';

import { NgxValidatorComponent } from './ngx-validator.component';

/**
 * Compatibility shim for NgModule-based applications. Standalone applications
 * can import {@link NgxValidatorComponent} directly instead.
 */
@NgModule({
  imports: [NgxValidatorComponent],
  exports: [NgxValidatorComponent],
})
export class NgxValidatorModule {
}
