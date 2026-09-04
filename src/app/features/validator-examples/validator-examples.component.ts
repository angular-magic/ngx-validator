import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-validator-examples',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './validator-examples.component.html',
  styleUrls: ['./validator-examples.component.scss'],
})
export class ValidatorExamplesComponent {
}
