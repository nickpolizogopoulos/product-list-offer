import {
    ExtraOptions,
    Routes
} from '@angular/router';

import { AboutComponent } from './pages/about.component';
import { HomeComponent } from './pages/home.component';

export const extraOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling:'enabled'
  };

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
