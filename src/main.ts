import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app/app.component';

bootstrapApplication(
  AppComponent,
  {
    providers: [
      provideExperimentalZonelessChangeDetection(),
      provideAnimationsAsync(),
    ]
  }
)
.catch( error => console.error(error) );
