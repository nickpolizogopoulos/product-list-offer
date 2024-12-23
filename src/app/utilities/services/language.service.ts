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

    private language = signal<Language>(this.getInitialLanguage());

    selectedLanguage = this.language.asReadonly();

    constructor() {
        effect(() => {
            localStorage.setItem(this.key, this.language());
        });
    }

    onChangeLanguage(selection: Language): void {
        this.language.set(selection);
    }
}