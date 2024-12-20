import {
    Injectable,
    signal,
    effect
} from '@angular/core';

import { type Language } from '../tools/types';

@Injectable({
    providedIn: 'root',
})
export class LanguageService {

    private key: string = 'product-offer-to-pdf-language';

    private getInitialLanguage(): Language {
        const storedLanguage: Language | null = localStorage.getItem(this.key) as Language | null;

        if (storedLanguage)
            return storedLanguage;
        
        return 'english';

        //* Ternary operator can be used as well (I prefer it).
        // return (
        //       storedLanguage
        //     ? storedLanguage 
        //     : 'english'
        // );
    }

    selectedLanguage = signal<Language>(this.getInitialLanguage());

    constructor() {
        effect(() => {
            localStorage.setItem(this.key, this.selectedLanguage());
        });
    }

    onChangeLanguage(selection: Language): void {
        this.selectedLanguage.set(selection);
    }
}