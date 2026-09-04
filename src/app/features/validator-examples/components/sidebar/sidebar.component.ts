import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

interface SidebarItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [MatButtonModule, MatDividerModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  items: SidebarItem[] = [
    { label: 'Default', value: 'default' },
    { label: 'Custom', value: 'custom' },
    { label: 'Runtime', value: 'run-time' },
    { label: 'Backend', value: 'backend' },
  ];
}
