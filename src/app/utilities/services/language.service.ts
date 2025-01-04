import {
    Injectable,
    signal,
    effect,
    computed
} from '@angular/core';

import { type Language } from '../tools/types';

@Injectable({
    providedIn: 'root',
})
export class LanguageService {

    private key: string = 'product-offer-to-pdf-language';

    isGreek = computed(() => this.selectedLanguage() === 'greek');
    isEnglish = computed(() => this.selectedLanguage() === 'english');
    isSpanish = computed(() => this.selectedLanguage() === 'spanish');
    // isFrench = computed(() => this.selectedLanguage() === 'french');
    // isItalian = computed(() => this.selectedLanguage() === 'italian');
    // isRussian = computed(() => this.selectedLanguage() === 'russian');

    private getInitialLanguage(): Language {
        const storedLanguage: Language | null = localStorage.getItem(this.key) as Language | null;
        return (
              storedLanguage
            ? storedLanguage 
            : 'english'
        );
    }

    private language = signal<Language>(this.getInitialLanguage());

    selectedLanguage = this.language.asReadonly();

    constructor() {
        effect(() => 
            localStorage.setItem(this.key, this.language())
        );
    }

    onChangeLanguage(selection: Language): void {
        this.language.set(selection);
    }
    
}