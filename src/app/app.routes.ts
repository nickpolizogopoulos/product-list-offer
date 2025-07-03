import {
    ExtraOptions,
    Routes
} from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Cookies } from './pages/cookies/cookies';
import { PrivacyTerms } from './pages/privacy-terms/privacy-terms';
import { metaResolver } from './utilities/resolvers/meta-resolver';

export const extraOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
};

// refactor(home): simplify form validation checks make properties readonly for improved clarity and immutability and siplify the route title logic.

const getTitle = ( pageName?: string ): string => {
    const appTitle: string = 'Product offer to .pdf';
    return pageName ? `${ appTitle } - ${ pageName }` : appTitle;
};

export const routes: Routes = [
    {
        path: '',
        component: Home,
        data: {
            title: getTitle(),
            description: `Export your product offer to .pdf, quicky and for free with the "Product Offer to .pdf" Application!`
        },
        resolve: { metaData: metaResolver }
    },
    {
        path: 'about',
        component: About,
        data: {
            title: getTitle('About'),
            description: `Learn more information about "Product Offer to .pdf" Application!`
        },
        resolve: { metaData: metaResolver }
    },
    {
        path: 'cookies',
        component: Cookies,
        data: {
            title: getTitle('Cookies'),
            description: `Learn more about the Cookies "Product Offer to .pdf" Application uses.`
        },
        resolve: { metaData: metaResolver }
    },
    {
        path: 'privacy-terms',
        component: PrivacyTerms,
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
