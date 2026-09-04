import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/validator-examples/validator-examples.routes')
      .then(m => m.routes),
  },
];
