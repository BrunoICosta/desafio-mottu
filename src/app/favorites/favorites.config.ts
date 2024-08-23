import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './favorites.routes';

export const favoritesConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
