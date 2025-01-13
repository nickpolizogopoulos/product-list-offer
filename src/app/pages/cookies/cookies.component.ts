import {
  Component,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { MaterialComponents } from '../../utilities/tools/material-components';
import { LanguageService } from '../../utilities/services/language/language.service';
import { type CookiesContent } from './cookies-types';
import { greek } from './greek';
import { english } from './english';
import { spanish } from './spanish';
import { french } from './french';
import { italian } from './italian';
import { russian } from './russian';
import { korean } from './korean';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [
    RouterLink,
    MaterialComponents
  ],
  template: `
  
    <div class="container">

      <h3>{{ content.pageTitle }}</h3>
      <mat-divider />
      <p>{{ content.introText }}</p>

      <h5>{{ content.block.title }}</h5>
      <p>{{ content.block.text }}</p>

      <h5>{{ content.block2.title }}</h5>
      <p>{{ content.block2.text }}</p>
      <ul>
        @for (item of content.list1; track $index) {
          <li>
              <strong>{{ item.title }}:</strong> {{ item.text }}
          </li>
        }
      </ul>

      <p [innerHTML]="content.cookiesLink"></p>

      <h5>{{ content.block3.title }}</h5>
      <p [innerHTML]="content.block3.text"></p>

      <h5>{{ content.block4.title }}</h5>
      <p>{{ content.block4.text }}</p>

      <button mat-raised-button routerLink="/">{{ content.buttonText }}</button>

    </div>

  `,
  styles: `

    p {
      margin-bottom: 1.7rem;

      &:last-of-type {
        margin-bottom: 2rem;
      }
    }

    strong {
        font-weight: 600;
    }

    ul {
      margin-bottom: 1.7rem; 
      li {
        margin: 1rem .7rem;
      }
    }
  
  `
})
export class CookiesComponent {

    private languageService = inject(LanguageService);
  
    get content(): CookiesContent {
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
