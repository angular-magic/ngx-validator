import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultValidatorComponent } from './pages/default-validator/default-validator.component';
import { CustomValidatorComponent } from './pages/custom-validator/custom-validator.component';
import { RunTimeValidatorComponent } from './pages/run-time-validator/run-time-validator.component';
import { BackendValidatorComponent } from './pages/backend-validator/backend-validator.component';
import { ValidatorExamplesComponent } from './validator-examples.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ValidatorExamplesRoutingModule } from './validator-examples-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxValidatorModule } from '@angular-magic/ngx-validator';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    DefaultValidatorComponent,
    CustomValidatorComponent,
    RunTimeValidatorComponent,
    BackendValidatorComponent,
    ValidatorExamplesComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    ValidatorExamplesRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxValidatorModule,
    MatCardModule,
    MatTabsModule,
  ],
})
export class ValidatorExamplesModule {
}
