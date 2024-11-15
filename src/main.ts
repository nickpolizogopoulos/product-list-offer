import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(
  AppComponent,
  {
    providers: [
      provideExperimentalZonelessChangeDetection(),
      provideRouter(routes),
      provideAnimationsAsync()
    ]
  }
)
.catch( error => console.error(error) );
