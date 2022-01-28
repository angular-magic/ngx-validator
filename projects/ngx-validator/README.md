# ngx-validator
<p align="center">
  <img alt="Ngx-Markdown Logo" src="https://ngx-validator.angularmagic.com/assets/cover.jpg">
</p>

**Demo: https://ngx-validator.angularmagic.com**

This module contains validator component which automatically show message depending by control's validations.

[![NPM](https://nodei.co/npm/@angular-magic/ngx-validator.png)](https://nodei.co/npm/@angular-magic/ngx-validator/)

# Installation
#### npm
```
npm install @angular-magic/ngx-validator
```
#### yarn
```
yarn add  @angular-magic/ngx-validator
```

# Usage
1. Add a module into your application (as a rule app.module.ts)

```ts
import { NgxValidatorModule } from "@angular-magic/ngx-validator";

@NgModule({
  imports: [NgxValidatorModule, BrowserModule, ReactiveFormsModule, ...],
  ...
})
```
2. Add component under your input or controllable UI component
```
<input type="text" [formControl]="myFormControl" />
<ngx-validator [control]="myFormControl" customName="Name"></ngx-validator>
```




## Options
Validator component support a couple of additional @Input, list of them you can check below:

| Name             | Type                                   | Default value | Description                                                                                                                                                  |
|------------------|----------------------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| control          | AbstractControl or FormControl         |               | Control from which validator will extract validations and show error messages.                                                                               |
| customName       | string                                 |     | By default  name of control is extracted from parent name (ex: if we have FormGroup which have FormControl lastName then name of validation will Last Name). |
| customValidation | CustomValidation or CustomValidation[] |               | In case when we need to overwrite default validation messages or add something custom which don't exists in service.                                         |             |


# GitHub
Please feel free to declare issues or contribute: https://github.com/angular-magic/ngx-validator
