import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { CustomValidation } from './models/custom-validation.model';
import { NgxValidatorService } from './ngx-validator.service';
import { buildInterpolationData, interpolate, resolveErrorMessage } from './utils';

@Component({
  selector: 'ngx-validator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (message(); as text) {
      <p class="ngx-validator"><span [innerHTML]="text"></span></p>
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
  /** Control to read validation state from. */
  readonly control = input<AbstractControl | undefined>(undefined);

  /** Overrides the `{{field}}` token, which otherwise derives from the control's name. */
  readonly customName = input<string | undefined>(undefined);

  /** Overrides or adds message templates for this control only. */
  readonly customValidation = input<CustomValidation | CustomValidation[] | undefined>(undefined);

  private readonly ngxValidatorService = inject(NgxValidatorService);

  /**
   * Bumped on every event the bound control emits. A control mutates in place,
   * so its identity never changes and it cannot be a reactive dependency on its
   * own; this counter is what invalidates {@link message} instead. Without it
   * the component would never re-render under OnPush, the default since
   * Angular 22.
   */
  private readonly revision = signal(0);

  constructor() {
    effect(onCleanup => {
      const control = this.control();

      if (!control) {
        return;
      }

      const subscription = control.events.subscribe(() => this.revision.update(revision => revision + 1));

      onCleanup(() => subscription.unsubscribe());
    });
  }

  readonly message = computed<string | null>(() => {
    const control = this.control();

    // Read so that any control event recomputes this message. Control state is
    // read live below, which keeps the very first render correct even before
    // the subscribing effect has run.
    this.revision();

    if (!control?.errors) {
      return null;
    }

    if (this.ngxValidatorService.validationOnTouch() && !(control.invalid && control.touched)) {
      return null;
    }

    const template = resolveErrorMessage(
      control.errors,
      this.customValidation(),
      this.ngxValidatorService.messages(),
    );

    if (!template) {
      return null;
    }

    return interpolate(template, buildInterpolationData(control.errors, this.customName(), control));
  });
}
