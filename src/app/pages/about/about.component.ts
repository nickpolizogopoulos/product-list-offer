import {
    Component,
    computed,
    inject,
    ViewEncapsulation
} from "@angular/core";
import { RouterLink } from "@angular/router";

import { MaterialComponents } from "../../utilities/tools/material-components";
import { LanguageService } from "../../utilities/services/language.service";
import { type AboutContent } from "./about-types";
import { contentEng } from "./english-content";
import { contentGr } from "./greek-content";

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [
        RouterLink,
        MaterialComponents
    ],
    encapsulation: ViewEncapsulation.None,
    template: `

        <div class="container">

            <h3>{{ content.pageHeader }}</h3>
            <mat-divider />
            <p [innerHTML]="content.appDescription"></p>
            
            <h5>{{ content.keyFeaturesHeader }}</h5>
            <ul class="features">
                @for (feature of content.features; track $index) {
                    <li>
                        <strong [innerHTML]="feature.name"></strong>
                        <strong>: </strong>
                        <span [innerHTML]="feature.information"></span>
                    </li>
                }
            </ul>
            
            <h5>{{ content.customPdfHeader }}</h5>
            @for (item of content.contact; track $index) {
                <p [innerHTML]="item"></p>
            }

            <button routerLink="/" mat-raised-button>{{ content.buttonText }}</button>

        </div>

    `,
    styles: `
    
        h5 {
            margin: 2rem 0 1.4rem;
        }

        p {
            margin: 0;
            line-height: 1.8;
        }

        strong,
        .link {
            font-weight: 600;
        }
        
        .features {
            padding-left: 0;
            list-style-position: inside;
            list-style-type: circle;
            li {
                margin: .7rem;
            }
        }

        p:last-of-type {
            margin: 2rem 0 2rem 0;
        }
    
    `
})
export class AboutComponent {

    private languageService = inject(LanguageService);
      
    private selectedLanguage = computed(() => 
        this.languageService.selectedLanguage()
    );
      
    isGreek = computed(() => 
        this.selectedLanguage() === 'greek'
    );

    get content(): AboutContent {
        return (
              this.isGreek()
            ? contentGr
            : contentEng
        );
    }

}