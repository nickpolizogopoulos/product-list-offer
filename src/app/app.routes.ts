import {
    ExtraOptions,
    Routes
} from '@angular/router';

import { HomeComponent } from './pages//home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CookiesComponent } from './pages/cookies/cookies.component';
import { PrivacyTermsComponent } from './pages/privacy-terms/privacy-terms.component';
import { metaResolver } from './utilities/resolvers/meta.resolver';

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
        data: {
            title: getTitle(),
            description: `Export your product offer to .pdf, quicky and for free with the "Product Offer to .pdf" Application!`
        },
        resolve: { metaData: metaResolver }
    },
    {
        path: 'about',
        component: AboutComponent,
        data: {
            title: getTitle('About'),
            description: `Learn more information about "Product Offer to .pdf" Application!`
        },
        resolve: { metaData: metaResolver }
    },
    {
        path: 'cookies',
        component: CookiesComponent,
        data: {
            title: getTitle('Cookies'),
            description: `Learn more about the Cookies "Product Offer to .pdf" Application uses.`
        },
        resolve: { metaData: metaResolver }
    },
    {
        path: 'privacy-terms',
        component: PrivacyTermsComponent,
        data: {
            title: getTitle('Privacy & Terms'),
            description: `Learn more about the Privacy Policy & Terms of Use of "Product Offer to .pdf" Application.`
        },
        resolve: { metaData: metaResolver }
    },
    {
        path: '**',
        redirectTo: ''
    }
];
