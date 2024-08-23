import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './home.routes';

export const routesConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
