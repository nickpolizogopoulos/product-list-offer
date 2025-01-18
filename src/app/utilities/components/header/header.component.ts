import {
    Component,
    inject
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../../services/language/language.service';
import { MaterialComponents } from '../../tools/material-components';
import {
    type Language,
} from '../../services/language/types';
import {
    languages,
    social,
    type Social,
    type LanguageSelectionItem
} from './header-tools';

@Component({
    selector: 'header[appHeader]',
    standalone: true,
    imports: [
        RouterLink,
        MaterialComponents
    ],
    host: {
        'class': 'container'
    },
    template: `
  
        <section routerLink="/" class="icon-and-title-section">
            <img src="/pdf-icon.svg" alt="pdf icon">
            <h2>Product offer to <span>.</span>pdf</h2>
        </section>

        <section>
            <button class="language-button" mat-button [matMenuTriggerFor]="menu">
                <mat-icon>public</mat-icon>
                {{ loadLanguage }}
            </button>
            <mat-menu #menu="matMenu">
                @for (language of languages; track $index) {
                    <button (click)="onLanguageSelect(language.onSelect)" mat-menu-item>
                        <img [src]="language.imagePath" [alt]="language.alt">
                        <span>
                            {{ language.name }}
                        </span>
                    </button>
                }
            </mat-menu>

            <ul>
                <li routerLink="about">
                    <a class="btn">
                        <span class="svgContainer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-info-lg" viewBox="0 0 16 16">
                                <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0"/>
                            </svg>
                        </span>
                        <span class="bg"></span>
                    </a>
                </li>

                @for (icon of social; track $index) {
                    <li>
                        <a class="btn" href="{{ icon.link }}" target="_blank">
                            <span class="svgContainer">
                                <svg 
                                    [attr.viewBox]="icon.viewBox"
                                    [attr.fill]="'white'"
                                >
                                    <path attr.d="{{ icon.path }}"></path>
                                </svg>
                            </span>
                            <span class="bg"></span>
                        </a>
                    </li>
                }
            </ul>
        </section>
  
    `,
    styleUrl: `./header.component.scss`
})
export class HeaderComponent {

    private languageService = inject(LanguageService);

    get loadLanguage(): string {
        const language = this.languageService;
        return (
              language.isGreek()   ? 'Ελληνικά'
            : language.isEnglish() ? 'English'
            : language.isSpanish() ? 'Español'
            : language.isFrench()  ? 'Français'
            : language.isItalian() ? 'Italiano'
            : language.isRussian() ? 'Русский'
            : '한국어'
        );
    }

    get languages(): LanguageSelectionItem[] {
        return [ ...languages ];
    }

    get social(): Social[] {
        return [ ...social ];
    }

    onLanguageSelect(selection: Language): void {
        this.languageService.setCurrentLanguage(selection);
    }

}