import {
    Component,
    inject
} from "@angular/core";
import { RouterLink } from "@angular/router";

import { MaterialComponents } from "../../utilities/tools/material-components";
import { LanguageService } from "../../utilities/services/language.service";
import { type AboutContent } from "./about-types";
import { contentEng } from "./english";
import { contentGr } from "./greek";
import { contentEs } from "./spanish";
import { contentFr } from "./french";
import { contentIt } from "./italian";

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

            <div>
                <span class="credits" [innerHTML]="content.credits"></span>
            </div>

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
        
        .features {
            padding-left: 0;
            list-style-position: inside;
            list-style-type: circle;
            li {
                margin: .7rem;
            }
        }

        .credits {
            color: rgb(71, 71, 71);
            font-size: 13px;
            font-style: italic;
            display: flex;
            justify-content: end;
        }
        

        p:last-of-type {
            margin: 2rem 0 2rem 0;
        }
    
    `
})
export class AboutComponent {

    private languageService = inject(LanguageService);
      
    get content(): AboutContent {
        return (
              this.languageService.isGreek()
            ? contentGr
            : this.languageService.isEnglish()
            ? contentEng
            : this.languageService.isSpanish()
            ? contentEs
            : this.languageService.isFrench()
            ? contentFr
            : contentIt
        );
    }

}