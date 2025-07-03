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

    private readonly localStorageKey: string = 'product-offer-to-pdf-language';
    private readonly language = signal<Language>(this.getInitialLanguage());

    readonly selectedLanguage = this.language.asReadonly();

    readonly isGreek = computed(() => this.selectedLanguage() === 'greek');
    readonly isEnglish = computed(() => this.selectedLanguage() === 'english');
    readonly isSpanish = computed(() => this.selectedLanguage() === 'spanish');
    readonly isFrench = computed(() => this.selectedLanguage() === 'french');
    readonly isItalian = computed(() => this.selectedLanguage() === 'italian');
    readonly isRussian = computed(() => this.selectedLanguage() === 'russian');
    readonly isKorean = computed(() => this.selectedLanguage() === 'korean');

    private getInitialLanguage(): Language {
        const storedLanguage: Language | null = localStorage.getItem(this.localStorageKey) as Language | null;
        return storedLanguage ? storedLanguage : 'english';
    }

    constructor() {
        effect(() => localStorage.setItem(this.localStorageKey, this.language()) );
    }

    setCurrentLanguage(selection: Language): void {
        this.language.set(selection);
    }
    
}