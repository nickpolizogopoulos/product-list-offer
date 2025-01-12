import {
    Component,
    inject
} from "@angular/core";
import { RouterLink } from "@angular/router";

import { MaterialComponents } from "../../utilities/tools/material-components";
import { LanguageService } from "../../utilities/services/language.service";
import { type AboutContent } from "./about-types";

import { contentGr } from "./greek";
import { contentEng } from "./english";
import { contentEs } from "./spanish";
import { contentFr } from "./french";
import { contentIt } from "./italian";
import { contentRu } from "./russian";
import { contentKr } from "./korean";

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [
        RouterLink,
        MaterialComponents
    ],
    template: `

        <div class="container">

            <h3>{{ content.pageHeader }}</h3>
            <mat-divider />
            <p [innerHTML]="content.appDescription"></p>
            
            <h5>{{ content.keyFeaturesHeader }}</h5>
            <ul>
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

            <div>
                <span class="credits" [innerHTML]="content.credits"></span>
            </div>

            <button routerLink="/" mat-raised-button>{{ content.buttonText }}</button>

        </div>

    `,
    styles: `

        @use '../../utilities/styles/placeholders.scss' as *;
    
        h5 {
            margin: 2rem 0 1.4rem;
        }

        p {
            margin: 0;
            line-height: 1.8;

            &:last-of-type {
            margin: 1rem 0 1rem 0;
        }
        }
        
        li {
                margin: .7rem;
        }

        .credits {
            @extend %flex-row;
            justify-content: end;
            color: rgb(71, 71, 71);
            font-size: 13px;
            font-style: italic;
            
            @media screen and (max-width: 790px) {
                display: block;
            }
        }
        
        button {
            @media screen and (max-width: 1080px) {
                margin-top: 20px;
            }
        }
    
    `
})
export class AboutComponent {

    private languageService = inject(LanguageService);
      
    get content(): AboutContent {
        const language = this.languageService;
        return (
              language.isGreek()   ? { ...contentGr }
            : language.isEnglish() ? { ...contentEng }
            : language.isSpanish() ? { ...contentEs }
            : language.isFrench()  ? { ...contentFr }
            : language.isItalian() ? { ...contentIt }
            : language.isRussian() ? { ...contentRu }
            : { ...contentKr }
        );
    }

}