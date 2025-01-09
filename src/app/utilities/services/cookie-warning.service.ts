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
            : language === 'french'
            ? this.contentFr
            : language === 'italian'
            ? this.contentIt
            : language === 'russian'
            ? this.contentRu
            : this.contentKr
        );
    }

    get contentGr(): SnackBarContent {
        return { ...this.snackbarContentGr }
    }

    get contentEng(): SnackBarContent {
        return { ...this.snackbarContentEng }
    }

    get contentEs(): SnackBarContent {
        return { ...this.snackbarContentEs }
    }

    get contentFr(): SnackBarContent {
        return { ...this.snackbarContentFr }
    }

    get contentIt(): SnackBarContent {
        return { ...this.snackbarContentIt }
    }

    get contentRu(): SnackBarContent {
        return { ...this.snackbarContentRu }
    }

    get contentKr(): SnackBarContent {
        return { ...this.snackbarContentKr }
    }

    private snackbarContentGr: SnackBarContent = {
        title: 'Αυτή η εφαρμογή χρησιμοποιεί cookies για να εξασφαλίσει ότι θα έχετε την καλύτερη εμπειρία!',
        action: 'Το κατάλαβα!',
    };

    private snackbarContentEng: SnackBarContent = {
        title: 'This application uses cookies to ensure you get the best experience!',
        action: 'Got it!',
    };

    private snackbarContentEs: SnackBarContent = {
        title: '¡Esta aplicación utiliza cookies para garantizar que obtengas la mejor experiencia!',
        action: '¡Entendido!',
    };

    private snackbarContentFr: SnackBarContent = {
        title: 'Cette application utilise des cookies pour vous garantir la meilleure expérience !',
        action: 'Compris !',
    };

    private snackbarContentIt: SnackBarContent = {
        title: 'Questa applicazione utilizza i cookie per garantirti la migliore esperienza possibile!',
        action: 'Capito!',
    };

    private snackbarContentRu: SnackBarContent = {
        title: 'Это приложение использует куки для обеспечения наилучшего опыта!',
        action: 'Я понял!',
    };

    private snackbarContentKr: SnackBarContent = {
        title: '이 애플리케이션은 최상의 사용자 경험을 제공하기 위해 쿠키를 사용합니다!',
        action: '알겠습니다!',
    };

}
