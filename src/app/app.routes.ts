import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.routes').then((routes) => routes.routes),
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./favorites/favorites.routes').then((routes) => routes.routes),
  },
];
