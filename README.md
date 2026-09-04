# ngx-validator
<p align="center">
  <img alt="Ngx-Validator Logo" src="https://ngx-validator.angularmagic.com/assets/cover.png">
</p>

**Demo: https://ngx-validator.angularmagic.com**

This module contains validator component which automatically show message depending by control's validations.

[![NPM](https://nodei.co/npm/@angular-magic/ngx-validator.png)](https://nodei.co/npm/@angular-magic/ngx-validator/)

# Version compatibility
The major version of this library matches the major version of Angular it supports.

| ngx-validator | Angular    |
|---------------|------------|
| 22.x          | 22         |
| 2.0.x         | 16 – 17    |
| 1.0.x         | 13+        |

# Installation
#### npm
```
npm install @angular-magic/ngx-validator
```
#### yarn
```
yarn add @angular-magic/ngx-validator
```

# Usage
1. Import the standalone component where you need it

```ts
import { NgxValidatorComponent } from '@angular-magic/ngx-validator';

@Component({
  selector: 'app-profile',
  imports: [NgxValidatorComponent, ReactiveFormsModule],
  ...
})
```

<details>
<summary>Using NgModules?</summary>

`NgxValidatorModule` still exports the component, so existing NgModule applications keep working unchanged:

```ts
import { NgxValidatorModule } from '@angular-magic/ngx-validator';

@NgModule({
  imports: [NgxValidatorModule, BrowserModule, ReactiveFormsModule, ...],
  ...
})
```
</details>

2. Add the component under your input or controllable UI component
```html
<input type="text" [formControl]="myFormControl" />
<ngx-validator [control]="myFormControl" customName="Name"></ngx-validator>
```

## Options
Validator component support a couple of additional inputs, list of them you can check below:

| Name             | Type                                   | Default value | Description                                                                                                                                                  |
|------------------|----------------------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| control          | AbstractControl or FormControl         |               | Control from which validator will extract validations and show error messages.                                                                               |
| customName       | string                                 |               | By default  name of control is extracted from parent name (ex: if we have FormGroup which have FormControl lastName then name of validation will Last Name). |
| customValidation | CustomValidation or CustomValidation[] |               | In case when we need to overwrite default validation messages or add something custom which don't exists in service.                                         |

## Configuration
`NgxValidatorService` is provided in the root injector and exposes signals:

```ts
private readonly validatorService = inject(NgxValidatorService);

// Override or add message templates. {{field}} resolves to the control's name.
this.validatorService.setValidationMessages({ required: '{{field}} is important for us' });

// Show messages as soon as a control is invalid, instead of waiting for it to be touched.
this.validatorService.validationOnTouch.set(false);

// Map a backend validation response onto the form's controls.
this.validatorService.setBackendErrorsOnForm(this.form, response.messages);
```

# Migrating from 2.x
- **Angular 22 is required.** The component is `OnPush` and derives its state from
  `AbstractControl.events`, so it also works in zoneless applications. Validity changes made
  with `{ emitEvent: false }` will not re-render the message.
- **`NgxValidatorComponent` is standalone** and can be imported directly. `NgxValidatorModule`
  remains available and unchanged for NgModule applications.
- **`NgxValidatorService` now exposes signals.** `messages` and `backendValidation` are signals
  rather than `BehaviorSubject`s; read them by calling them (`messages()`). The `messages$` and
  `backendValidation$` observables are unchanged. `setValidationMessages` and
  `setBackendErrorsOnForm` keep their signatures.
- **`validationOnTouch`** is a new signal (default `true`) that gates messages on the control
  being touched.
- Inputs use the signal-based `input()` API. Template bindings are unchanged; assigning inputs
  imperatively on a component instance is no longer supported.

# GitHub
Please feel free to declare issues or contribute: https://github.com/angular-magic/ngx-validator
