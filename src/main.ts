import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withInMemoryScrolling
} from '@angular/router';

import { AppComponent } from './app/app.component';
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

bootstrapApplication(
  AppComponent,
  appConfig
)
.catch( error => console.error(error) );
