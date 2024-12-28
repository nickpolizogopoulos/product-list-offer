import {
  Component,
  computed,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../services/language.service';
import { MaterialComponents } from '../tools/material-components';
import { FooterLink } from '../tools/types';

@Component({
  selector: 'footer[appFooter]',
  standalone: true,
  imports: [
    RouterLink,
    MaterialComponents
  ],
  host: {
    'class': 'container'
  },
  template: `

    Product offer to <span>.</span>pdf 2024{{ date === 2024 ? '' : ' - '+date }}<span>.</span>

    @if (isGreek()) {
      Μια
      <a class="angular" href="https://angular.dev/" target="_blank">
        Angular
      </a>
      εφαρμογή απο τον
      <a href="https://nick-polizogopoulos.web.app/" class="nodecor" target="_blank">
        Νίκο Πολυζωγόπουλο</a><span>.</span>

      <ul>
        @for (link of allLinks; track $index) {
          <li>
            <a class="link" [routerLink]="link.path">{{ link.name }}</a>
          </li>
        }
      </ul>
    }
    
    @else {
      An
      <a class="angular" href="https://angular.dev/" target="_blank">
        Angular
      </a>
      Application by 
      <a href="https://nick-polizogopoulos.web.app/" class="nodecor" target="_blank">
        Nick Polizogopoulos</a><span>.</span>

      <ul>
        @for (link of allLinks; track $index) {
          <li>
            <a class="link" [routerLink]="link.path">{{ link.name }}</a>
          </li>
        }
      </ul>
    }
  
  `,
  styles: `
  
    :host {
      user-select: none;
      text-align: center;
    }

    ul {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-bottom: 0;
      padding-left: 0;
      list-style-type: none;
      gap: 20px;

      @media screen and (max-width: 449px) {
        flex-direction: column;
      }

      a { 
        &::before {
          content: '[';
        }
        &::after {
          content: ']';
        }
      }
    }

    span {
      font-family: monospace;
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

  date = new Date().getFullYear();

  private languageService = inject(LanguageService);
  
  selectedLanguage = computed(() => 
      this.languageService.selectedLanguage()
  );

  isGreek = computed(() => 
    this.selectedLanguage() === 'greek'
  );
  
  get allLinks(): FooterLink[] {
    return [ ...this.links ];
  }

  private links: FooterLink[] = [
    {
      name: 'About',
      path: 'about'
    },
    {
      name: 'Cookies',
      path: 'cookies'
    },
    {
      name: 'Privacy & Terms',
      path: 'privacy-terms'
    }
  ];

}