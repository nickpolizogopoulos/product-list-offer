import {
  Component,
  inject,
  computed
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { MaterialComponents } from '../../utilities/tools/material-components';
import { LanguageService } from '../../utilities/services/language.service';
import { PrivacyTermsContentType } from './terms-types';
import { contentEng } from './english-content';
import { contentGr } from './greek-content';

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
    }

    li {
      margin-bottom: 1rem;

      ul {
        margin-top: 0.5rem;
        margin-bottom: 1rem
      }
    }

    button {
      margin-top: 1rem;
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

    private selectedLanguage = computed(() => 
        this.languageService.selectedLanguage()
    );

    isGreek = computed(() => 
        this.selectedLanguage() === 'greek'
    );

    get content(): PrivacyTermsContentType {
      return (
            this.isGreek()
          ? contentGr
          : contentEng
      );
    }

}