import {
    Injectable,
    inject
} from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { LanguageService } from '../services/language.service';

type SnackBarContent = {
    title: string;
    action: string;
};

@Injectable({
    providedIn: 'root',
})
export class CookieWarningService {

    private snackBar = inject(MatSnackBar);
    private languageService = inject(LanguageService);

    private cookieExpirationDays: number = 30;
    private key: string = 'product-offer-to-pdf-cookie-action';

    displayCookieWarning(): void {
        const storedConsent = localStorage.getItem(this.key);

        if (!storedConsent || this.isConsentExpired(storedConsent)) {

            const snackBarRef = this.snackBar.open(
                this.content.title,
                this.content.action
            );

            snackBarRef.onAction()
                .subscribe({
                    next: () => this.setCookieConsent()
                });
        }
    }

    private setCookieConsent(): void {
        const consentData = {
            timestamp: new Date().toISOString(),
        };

        localStorage.setItem(this.key, JSON.stringify(consentData));
    }

    private isConsentExpired(storedConsent: string): boolean {
        const consentData = JSON.parse(storedConsent);
        
        const currentTime = new Date().getTime();
        const consentTime = new Date(consentData.timestamp).getTime();

        return currentTime - consentTime > this.cookieExpirationDays * 24 * 60 * 60 * 1000;
    }

    private get content(): SnackBarContent {
        return (
              this.languageService.selectedLanguage() === 'greek'
            ? this.snackbarContentGr
            : this.snackbarContentEng
        );
    }

    private snackbarContentGr = {
        title: 'Αυτή η εφαρμογή χρησιμοποιεί cookies για να εξασφαλίσει ότι θα έχετε την καλύτερη εμπειρία!',
        action: 'Το κατάλαβα!',
    };

    private snackbarContentEng = {
        title: 'This application uses cookies to ensure you get the best experience!',
        action: 'Got it!',
    };

}
