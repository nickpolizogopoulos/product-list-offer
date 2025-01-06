import {
    Injectable,
    inject,
    effect
} from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { LanguageService } from '../services/language.service';
import { Language } from '../tools/types';

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

    private currentContent: SnackBarContent | null = null;

    constructor() {
        effect(() => {

            const content = this.getContent(this.languageService.selectedLanguage());

            if (this.currentContent !== content) {

                this.currentContent = content;
                this.displayCookieWarning();
            }
        });
    }

    displayCookieWarning(): void {
        const storedConsent = localStorage.getItem(this.key);

        if (!storedConsent || this.isConsentExpired(storedConsent)) {

            const content = this.currentContent || this.getContent(this.languageService.selectedLanguage());

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

    private getContent(language: Language): SnackBarContent {
        return (
              language === 'greek'
            ? this.contentGr
            : language === 'english' 
            ? this.contentEng 
            : language === 'spanish' 
            ? this.contentEs 
            : this.contentFr
        );
    }

    private contentGr: SnackBarContent = {
        title: 'Αυτή η εφαρμογή χρησιμοποιεί cookies για να εξασφαλίσει ότι θα έχετε την καλύτερη εμπειρία!',
        action: 'Το κατάλαβα!',
    };

    private contentEng: SnackBarContent = {
        title: 'This application uses cookies to ensure you get the best experience!',
        action: 'Got it!',
    };

    private contentEs: SnackBarContent = {
        title: '¡Esta aplicación utiliza cookies para garantizar que obtengas la mejor experiencia!',
        action: '¡Entendido!',
    };

    private contentFr: SnackBarContent = {
        title: 'Cette application utilise des cookies pour vous garantir la meilleure expérience !',
        action: 'Compris !',
    };

}
