import {
  Component,
  inject,
  ViewEncapsulation
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../../services/language/language.service';
import { MaterialComponents } from '../../tools/material-components';
import { 
  footerContentEng, 
  footerContentFr, 
  footerContentGr, 
  footerContentIt, 
  footerContentKr, 
  footerContentRu, 
  footerContentSp,
  type FooterContent
} from './content';

@Component({
  selector: 'footer[appFooter]',
  standalone: true,
  imports: [
    RouterLink,
    MaterialComponents
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
  host: {
    class: 'container',
    style: 'text-align: center;'
  },
  template: `

    Product offer to <span class="monospace">.</span>pdf 2024 - 2025<span class="monospace">.</span>

    <span [innerHTML]="content.text"></span>
    <nav>
      <ul>
        @for (link of content.links; track $index) {
          <li>
            <a class="link" [routerLink]="link.path">{{ link.name }}</a>
          </li>
        }
      </ul>
    </nav>
  
  `,
  styles: `

    @use '../../styles/variables.scss' as *;
    @use '../../styles/placeholders.scss' as *;

    ul {
      @extend %flex-row;
      justify-content: center;
      margin-bottom: 0;
      padding-left: 0;
      list-style-type: none;
      gap: 20px;

      @media screen and (max-width: 607px) {
        flex-direction: column;
      }

    }

    .monospace {
      font-family: monospace;
    }

    .link {
      @extend %link;      
    }

    .angular {
      color: #E91067;
      text-decoration: none;

      &:hover {
        background: linear-gradient(to right, #E91067 0%, #B640FA 100%);
        text-decoration-color: linear-gradient(to right, #E91067 0%, #B640FA 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

  `
})
export class FooterComponent {

  private readonly languageService = inject(LanguageService);

  get content(): FooterContent {
    const language = this.languageService;
    return (
        language.isGreek()   ? { ...footerContentGr }
      : language.isEnglish() ? { ...footerContentEng }
      : language.isSpanish() ? { ...footerContentSp }
      : language.isFrench()  ? { ...footerContentFr }
      : language.isItalian() ? { ...footerContentIt }
      : language.isRussian() ? { ...footerContentRu }
      : { ...footerContentKr }
    );
  }

}
