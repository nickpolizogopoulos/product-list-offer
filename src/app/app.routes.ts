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

const appTitle: string = '[ Product offer to .pdf ]';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: `${appTitle}`
    },
    {
        path: 'about',
        component: AboutComponent,
        title: `${appTitle} - About`
    },
    {
        path: '**',
        redirectTo: ''
    }
];
