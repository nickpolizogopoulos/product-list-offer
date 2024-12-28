import {
    ExtraOptions,
    Routes
} from '@angular/router';

import { HomeComponent } from './pages//home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CookiesComponent } from './pages/cookies/cookies.component';
import { PrivacyTermsComponent } from './pages/privacy-terms/privacy-terms.component';

export const extraOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
};

const getTitle = ( pageName?: string ): string => {
    
    const appTitle: string = 'Product offer to .pdf';
    
    return (
          pageName
        ? `${ appTitle } - ${ pageName }`
        : appTitle
    );
};

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: getTitle()
    },
    {
        path: 'about',
        component: AboutComponent,
        title: getTitle('About')
    },
    {
        path: 'cookies',
        component: CookiesComponent,
        title: getTitle('Cookies')
    },
    {
        path: 'privacy-terms',
        component: PrivacyTermsComponent,
        title: getTitle('Privacy & Terms')
    },
    {
        path: '**',
        redirectTo: ''
    }
];
