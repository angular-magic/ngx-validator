import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidatorExamplesComponent } from './validator-examples.component';
import { DefaultValidatorComponent } from './pages/default-validator/default-validator.component';
import { CustomValidatorComponent } from './pages/custom-validator/custom-validator.component';
import { RunTimeValidatorComponent } from './pages/run-time-validator/run-time-validator.component';
import { BackendValidatorComponent } from './pages/backend-validator/backend-validator.component';

const routes: Routes = [
  {
    path: '',
    component: ValidatorExamplesComponent,
    children: [
      {
        path: '',
        redirectTo: 'default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        component: DefaultValidatorComponent,
      },
      {
        path: 'custom',
        component: CustomValidatorComponent,
      },
      {
        path: 'run-time',
        component: RunTimeValidatorComponent,
      },
      {
        path: 'backend',
        component: BackendValidatorComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidatorExamplesRoutingModule { }
