import {
  ApplicationConfig,
  enableProdMode,
  provideZonelessChangeDetection,
  isDevMode
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withInMemoryScrolling
} from '@angular/router';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { App } from './app/app';
import { environment } from './environments/environment';
import {
  extraOptions,
  routes
} from './app/app.routes';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
      routes, 
      withInMemoryScrolling(extraOptions)
    ),
    provideAnimationsAsync(),
    provideServiceWorker(
      'ngsw-worker.js',
      {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
      }
    )
  ]
};

if (environment.production)
  enableProdMode();

const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);

bootstrapApplication(
  App,
  appConfig
)
.catch( error => console.error(error) );
