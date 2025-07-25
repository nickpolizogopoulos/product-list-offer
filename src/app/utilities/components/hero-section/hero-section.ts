import {
    Component,
    inject,
    output
} from "@angular/core";
import { RouterLink } from "@angular/router";

import { MaterialComponents } from "../../tools/material-components";
import { LanguageService } from "../../services/language/language-service";
import {
    type HeroContent,
    greek,
    english,
    spanish,
    french,
    italian,
    russian,
    korean
} from "./hero-tools";

@Component({
    selector: 'app-hero-section',
    standalone: true,
    imports: [
        RouterLink,
        MaterialComponents
    ],
    template: `
    
        <div class="container">

            <div class="title-image-box">
                <aside>
                    <h1>{{ content.title }}</h1>
                    <h4>{{ content.subtitle }}</h4>
                    <mat-divider />
                    <h6>{{ content.phrase }}</h6>
                </aside>
                <img src="/undraw_to-do-list_dzdz.svg" alt="Hero Section Banner by https://undraw.co/ - Katerina Limpitsouni">
            </div>

            <div class="button-row">
                <button (click)="onGetStarted()" type="button" mat-raised-button>
                    {{ content.buttonGetStarted }}
                </button>
                <button routerLink="/about" type="button" mat-raised-button>
                    {{ content.buttonLearnMore }}
                </button>
            </div>

        </div>

    `,
    styles: `

        @use '../../styles/placeholders.scss' as *;
    
        .container {
            padding: 3rem 4rem !important;
            
            @media screen and (max-width: 700px) {
                padding: 2rem !important;
            }
        }

        .title-image-box {
            @extend %flex-row;
            align-items: center;
            gap: 4rem;

            @media screen and (max-width: 1200px) {
                flex-direction: column-reverse;
                gap: 2.5rem;
                img {
                    max-width: 100%;
                    padding: none !important;
                }
            }

            h1 {
                font-size: 2.7rem;
                margin-bottom: 3rem;
            }
        }
    
        .button-row {
            @extend %flex-row;
            justify-content: center;
            align-items: center;
            margin-top: 4rem;
            gap: 6rem;
            
            button {
                min-width: 230px;
                max-width: 250px;
            }
            
            @media screen and (max-width: 820px) {
                margin-top: 1.5rem;
                flex-direction: column;
                gap: 1rem;
            }
        }

        h6 {
            color: rgb(90, 90, 90);
            font-style: italic;
            line-height: 1.3;
        }

        img {
            width: 600px;
            background-color:rgb(247, 247, 247);
            padding: 2rem;
            border-radius: 200px;
            transition: .4s all ease;
            
            @media screen and (max-width: 1500px) {
                padding: 1rem;
                width: 500px;
            }
        }
    
    `
})
export class HeroSectionComponent {

    private readonly languageService = inject(LanguageService);

     readonly getStarted = output<void>();

    onGetStarted(): void {
        this.getStarted.emit();
    }

    get content(): HeroContent {
        const language = this.languageService;
        return (
              language.isGreek()   ? { ...greek }
            : language.isEnglish() ? { ...english }
            : language.isSpanish() ? { ...spanish }
            : language.isFrench()  ? { ...french }
            : language.isItalian() ? { ...italian }
            : language.isRussian() ? { ...russian }
            : { ...korean }
        );
    }

}
