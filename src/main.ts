import {
  ApplicationConfig,
  enableProdMode,
  provideExperimentalZonelessChangeDetection
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withInMemoryScrolling
} from '@angular/router';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import {
  extraOptions,
  routes
} from './app/app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(
      routes, 
      withInMemoryScrolling(extraOptions)
    ),
    provideAnimationsAsync()
  ]
};

if (environment.production)
  enableProdMode();

const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);


bootstrapApplication(
  AppComponent,
  appConfig
)
.catch( error => console.error(error) );
