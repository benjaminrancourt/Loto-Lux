import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilComponent, LoteriesComponent, LoterieDetailComponent } from './components';

const appRoutes: Routes = [
  {
    path: 'accueil',
    component: AccueilComponent
  },
  {
    path: 'loteries',
    component: LoteriesComponent
  },
  {
    path: 'loteries/:loterie',
    component: LoterieDetailComponent
  },
  {
    path: 'loteries/:loterie/:date',
    component: LoterieDetailComponent
  },
  { path: '**', component: AccueilComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
