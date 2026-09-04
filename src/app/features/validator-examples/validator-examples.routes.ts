import { Routes } from '@angular/router';

import { BackendValidatorComponent } from './pages/backend-validator/backend-validator.component';
import { CustomValidatorComponent } from './pages/custom-validator/custom-validator.component';
import { DefaultValidatorComponent } from './pages/default-validator/default-validator.component';
import { RunTimeValidatorComponent } from './pages/run-time-validator/run-time-validator.component';
import { ValidatorExamplesComponent } from './validator-examples.component';

export const routes: Routes = [
  {
    path: '',
    component: ValidatorExamplesComponent,
    children: [
      { path: '', redirectTo: 'default', pathMatch: 'full' },
      { path: 'default', component: DefaultValidatorComponent },
      { path: 'custom', component: CustomValidatorComponent },
      { path: 'run-time', component: RunTimeValidatorComponent },
      { path: 'backend', component: BackendValidatorComponent },
    ],
  },
];
