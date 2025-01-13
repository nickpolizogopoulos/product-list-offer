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
    styles: `

        @use '../../styles/placeholders.scss' as *;

        :host {
            height: 110px;
            justify-content: space-between;

            @media screen and (max-width: 991px) {
                height: auto;
                flex-direction: column;
                padding: 1rem 0;
            }
        }
        
        :host,
        ul,
        section {
            @extend %flex-row;
            align-items: center;
        }

        section {
            gap: 30px;

            button {
                color: black;
                min-width: 130px;

                &:hover {
                    background-color: rgba(245, 245, 245, 0.5);
                }
            }

            @media screen and (max-width: 519px) {
                flex-direction: column-reverse;
                gap: 0;
            }
        }

        ul {
            list-style-type: none;
            padding: 0;
            gap: 1.4rem;
            
            @media screen and (max-width: 399px) {
                gap: 1rem;
            }
        }

        .icon-and-title-section {
            @extend %flex-row;
            align-items: center;
            cursor: pointer;
            gap: 15px;

            img {
                width: 60px;
            }

            h2 {
                margin: 0 !important;

                @media screen and (max-width: 991px) {
                    text-align: center;
                    margin-bottom: 1rem;
                    font-size: 2.6rem;
                }
                
                @media screen and (max-width: 408px) {
                    font-size: 2rem;
                }

                @media screen and (max-width: 315px) {
                    font-size: 1.8rem;
                }
            }

            @media screen and (max-width: 471px) {
                flex-direction: column;
                margin: 0 !important;
            }
        }

        .btn {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            background-color: transparent;
            position: relative;
            border-radius: 7px;
            cursor: pointer;
            transition: all .3s;
            
            @media screen and (max-width: 518px) {
                width: 35px;
                height: 35px;
            }

            @media screen and (max-width: 399px) {
                width: 30px;
                height: 30px;
            }
        }

        .svgContainer {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: transparent;
            backdrop-filter: blur(30px);
            letter-spacing: 0.8px;
            border-radius: 7px;
            transition: all .4s;
            border: 1px solid rgba(255, 255, 255, 0.4);

            svg {
                width: 26px;
                height: 26px;
                
                @media screen and (max-width: 399px) {
                    width: 20px;
                    height: 20px;
                }
            }
        }

        .bg {
            background-color: #4a4a4a;
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            z-index: -1;
            border-radius: 7px;
            pointer-events: none;
            transition: all .2s;
        }

        .btn:hover .bg {
            transform: rotate(25deg);
            transform-origin: bottom;
        }

        .btn:hover .svgContainer {
            background-color: rgba(195, 195, 195, 0.5);
            backdrop-filter: blur(3px);
        }
  
    `
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