import {
    Injectable,
    signal,
    effect,
    computed
} from '@angular/core';

import { type Language } from './types';

@Injectable({
    providedIn: 'root',
})
export class LanguageService {

    private localStorageKey: string = 'product-offer-to-pdf-language';
    private language = signal<Language>(this.getInitialLanguage());

    selectedLanguage = this.language.asReadonly();

    // TODO computed
    isGreek = computed(() => this.selectedLanguage() === 'greek');
    isEnglish = computed(() => this.selectedLanguage() === 'english');
    isSpanish = computed(() => this.selectedLanguage() === 'spanish');
    isFrench = computed(() => this.selectedLanguage() === 'french');
    isItalian = computed(() => this.selectedLanguage() === 'italian');
    isRussian = computed(() => this.selectedLanguage() === 'russian');
    isKorean = computed(() => this.selectedLanguage() === 'korean');

    private getInitialLanguage(): Language {
        const storedLanguage: Language | null = localStorage.getItem(this.localStorageKey) as Language | null;
        return (
              storedLanguage
            ? storedLanguage 
            : 'english'
        );
    }

    constructor() {
        effect(() => 
            localStorage.setItem(this.localStorageKey, this.language())
        );
    }

    setCurrentLanguage(selection: Language): void {
        this.language.set(selection);
    }
    
}