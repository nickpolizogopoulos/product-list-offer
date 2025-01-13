import {
    Injectable,
    inject,
    effect
} from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { LanguageService } from '../language/language.service';
import {
    english,
    greek,
    spanish,
    french,
    italian,
    russian,
    korean,
    type SnackBarContent
} from './cookie-warning-tools';

@Injectable({
    providedIn: 'root',
})
export class CookieWarningService {

    private snackBar = inject(MatSnackBar);
    private languageService = inject(LanguageService);

    private cookieExpirationDays: number = 30;
    private key: string = 'product-offer-to-pdf-cookie-action';
    private currentContent: SnackBarContent | null = null;

    constructor() {
        effect(() => {

            const content = this.getContent();

            if (this.currentContent !== content) {

                this.currentContent = content;
                this.displayCookieWarning();
            }
        });
    }

    displayCookieWarning(): void {
        const storedConsent = localStorage.getItem(this.key);

        if (!storedConsent || this.isConsentExpired(storedConsent)) {

            const content = this.currentContent || this.getContent();
            const snackBarRef = this.snackBar.open(
                content.title,
                content.action
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

    private getContent(): SnackBarContent {
        const language = this.languageService;
        return (
              language.isGreek()   ? { ...greek }
            : language.isEnglish() ? { ...english } 
            : language.isSpanish() ? { ...spanish }
            : language.isFrench()  ? { ...french }
            : language.isItalian() ? { ...italian }
            : language.isRussian() ? { ...russian }
            : { ...korean }
        );
    }
    
}
