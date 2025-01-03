import {
    Component,
    inject,
    computed,
    output
} from "@angular/core";
import { RouterLink } from "@angular/router";

import { MaterialComponents } from "../tools/material-components";
import { LanguageService } from "../services/language.service";

type HeroContent = {
    title: string;
    subtitle: string;
    phrase: string;
    buttonGetStarted: string;
    buttonLearnMore: string;
};

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
    
        .container {
            padding: 4rem !important;
            
            @media screen and (max-width: 700px) {
                padding: 2rem !important;
            }
        }

        .title-image-box {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 4rem;

            @media screen and (max-width: 1200px) {
                flex-direction: column-reverse;
                gap: 1rem;
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
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-top: 4rem;
            gap: 6rem;
            
            button {
                min-width: 210px;
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

    private languageService = inject(LanguageService);

    getStarted = output<void>();

    onGetStarted(): void {
        this.getStarted.emit();
    }

    get content(): HeroContent {
        return (
              this.languageService.selectedLanguage() === 'greek'
            ? this.heroContentGr
            : this.heroContentEng
        );
    }

    get contentGr(): HeroContent {
        return { ...this.heroContentGr };
    }

    get contentEng(): any {
        return { ...this.heroContentEng };
    }

    private heroContentGr: HeroContent = {
        title: 'Καλώς ήρθατε!',
        subtitle: 'Δημιουργήστε την δική σας προσφορά προϊόντων άμεσα και δωρεάν!',
        phrase: `
            Απλοποιήστε τη διαδικασία πωλήσεων με έναν επαγγελματικό δημιουργό προσφορών προϊόντων.
            Συμπληρώστε τα στοιχεία και εμείς θα αναλάβουμε τα υπόλοιπα, γρήγορα, με ακρίβεια και επαγγελματικά.
        `,
        buttonGetStarted: 'Ξεκινήστε Τώρα!',
        buttonLearnMore: 'Μάθετε περισσότερα!'
    }

    private heroContentEng: HeroContent = {
        title: 'Welcome!',
        subtitle: 'Create your own product offer instantly and for free!',
        phrase: `
            Simplify your sales process with a professional product offer generator.
            Fill in the details, and we’ll handle the rest quickly, accurately, and professionally.
        `,
        buttonGetStarted: 'Get Started Now!',
        buttonLearnMore: 'Learn more!'
    }

}