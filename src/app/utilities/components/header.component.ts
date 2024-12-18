import {
    Component,
    computed,
    inject
} from '@angular/core';
import { RouterLink } from '@angular/router';

import {
    type Language,
    LanguageService
} from '../services/language.service';
import { MaterialComponents } from '../tools/material-components';
import { LanguageSwitchComponent } from './language-switch.component';

type Social = {
    name: string;
    link: string;
    path: string;
    viewBox: string;
};

@Component({
    selector: 'header[appHeader]',
    standalone: true,
    imports: [
        RouterLink,
        LanguageSwitchComponent,
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
            <button mat-button [matMenuTriggerFor]="menu">
                <mat-icon>public</mat-icon>
                {{ selectedLanguage() === 'greek' ? 'Γλώσσα' : 'Language' }}
            </button>
            <mat-menu #menu="matMenu">
                <button (click)="onLanguageSelect('greek')" mat-menu-item>
                    <img src="/greek-flag.svg" alt="greek-flag">
                    <app-language-switch greek="Ελληνικά" english="Greek" />
                </button>
                <button (click)="onLanguageSelect('english')" mat-menu-item>
                    <img src="/uk-flag.svg" alt="uk-flag">
                    <app-language-switch greek="Αγγλικά" english="English" />
                </button>
            </mat-menu>

            <ul>
                <li routerLink="about">
                    <a class="Btn">
                        <span class="svgContainer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-info-lg" viewBox="0 0 16 16">
                                <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0"/>
                            </svg>
                        </span>
                        <span class="BG"></span>
                    </a>
                </li>

                @for (icon of allSocial; track $index) {
                    <li>
                        <a class="Btn" href="{{ icon.link }}" target="_blank">
                            <span class="svgContainer">
                                <svg 
                                    [attr.viewBox]="icon.viewBox"
                                    [attr.fill]="'white'"
                                >
                                    <path attr.d="{{ icon.path }}"></path>
                                </svg>
                            </span>
                            <span class="BG"></span>
                        </a>
                    </li>
                }
            </ul>
        </section>
  
    `,
    styles: `

        @use '../../../styles.scss' as *;

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
            @extend .flex-row;
            align-items: center;
        }

        
        
        .icon-and-title-section {
            @extend .flex-row;
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
                    font-size: 1.7rem;
                }
            }

            @media screen and (max-width: 471px) {
                flex-direction: column;
                margin: 0 !important;
            }
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
            gap: 1rem;
            
            @media screen and (max-width: 399px) {
                gap: 1rem;
            }
        }

        .Btn {
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

        .BG {
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

        .Btn:hover .BG {
            transform: rotate(25deg);
            transform-origin: bottom;
        }

        .Btn:hover .svgContainer {
            background-color: rgba(195, 195, 195, 0.5);
            backdrop-filter: blur(3px);
        }
  
  
    `
})
export class HeaderComponent {

    private languageService = inject(LanguageService);

    selectedLanguage = computed(() => 
        this.languageService.selectedLanguage()
    );

    onLanguageSelect(selection: Language): void {
        this.languageService.onChangeLanguage(selection);
    }

    get allSocial(): Social[] {
        return [...this.social];
    }

    private social: Social[] = [
        {
            name: 'Website',
            link: 'https://nick-polizogopoulos.web.app/',
            path: 'M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z',
            viewBox: '0 0 16 16'
        },
        {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/in/nickpolizogopoulos/',
            path: 'M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z',
            viewBox: '0 0 448 512'
        },
        {
            name: 'GitHub',
            link: 'https://github.com/nickpolizogopoulos/product-list-offer',
            path: 'M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z',
            viewBox: '0 0 496 512'
        }
    ];

}