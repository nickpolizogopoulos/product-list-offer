import {
  Component,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { MaterialComponents } from '../../utilities/tools/material-components';
import { LanguageService } from '../../utilities/services/language/language.service';
import { PrivacyTermsContentType } from './terms-types';

import { greek } from "./greek";
import { english } from "./english";
import { spanish } from "./spanish";
import { french } from "./french";
import { italian } from "./italian";
import { russian } from "./russian";
import { korean } from "./korean";

@Component({
  selector: 'app-privacy-terms',
  standalone: true,
  imports: [
    RouterLink,
    MaterialComponents
  ],
  template: `
  
    <div class="container">
      
      <h3>{{ content.pageTitle }}</h3>
      <mat-divider />

      <div class="content-box">
      @for (item of content.content; track $index) {

        <h5>{{ item.title }}</h5>
        <em><u>{{ item.date }}</u></em>
        <p>{{ item.introductionText }}</p>
        
        <ol>
          @for (listItem of item.list; track $index) {
            <li>
              <strong>{{ listItem.title }}</strong>
              <ul>
                @for (bullet of listItem.bullet; track $index) {
                  <li>{{ bullet }}</li>
                }
              </ul>
            </li>
          }
        </ol>
        
        <p [innerHTML]="item.contact"></p>

        @if ($index <= content.content.length - 2) {
          <mat-divider />
        }
      }
      </div>

      <button mat-raised-button routerLink="/">{{ content.buttonText }}</button>
      
    </div>
  
  `,
  styles: `

    ol {
      margin-bottom: 2.5rem;
      
      li {
        margin-bottom: 1rem;
        
        ul {
          margin-top: 0.5rem;
        }
      }
    }

    .content-box {
      margin-bottom: 2rem;
    }

    mat-divider {
      margin: 2.3rem 0 1.6rem 0 !important;
    }

  `
})
export class PrivacyTermsComponent {

    private languageService = inject(LanguageService);

    get content(): PrivacyTermsContentType {
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



