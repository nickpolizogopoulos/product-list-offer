import {
    ExtraOptions,
    Routes
} from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages//home/home.component';

export const extraOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling:'enabled'
};

const appTitle: string = 'Product offer to .pdf';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: `${appTitle} - Home`
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
