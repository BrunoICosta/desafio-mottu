import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./favorites/favorites.routes').then((routes) => routes.routes),
  },
];
