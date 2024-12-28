import {
  Component,
  inject,
  computed
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { MaterialComponents } from '../../utilities/tools/material-components';
import { LanguageService } from '../../utilities/services/language.service';
import { contentEng } from './english-content';
import { contentGr } from './greek-content';


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
      padding-left: 1rem;
      list-style-type: circle;

      &:first-of-type {
        margin-bottom: 1.7rem;
      }
    }
    
    li {
      margin: 1rem .7rem;
    }
  
  `
})
export class CookiesComponent {

    private languageService = inject(LanguageService);
      
    private selectedLanguage = computed(() => 
        this.languageService.selectedLanguage()
    );
      
    isGreek = computed(() => 
        this.selectedLanguage() === 'greek'
    );

    get content() {
        return (
              this.isGreek()
            ? contentGr
            : contentEng
        );
    }
  
}

