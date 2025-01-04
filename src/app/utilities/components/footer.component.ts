import {
  Component,
  inject,
  ViewEncapsulation
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../services/language.service';
import { MaterialComponents } from '../tools/material-components';

type FooterLink = {
  name: string;
  path: string;
};

type FooterContent = {
  text: string;
  links: FooterLink[];
};

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

    Product offer to <span>.</span>pdf 2024 - {{ date }}<span>.</span>

    <span [innerHTML]="content.text"></span>

    <ul>
        @for (link of content.links; track $index) {
          <li>
            <a class="link" [routerLink]="link.path">{{ link.name }}</a>
          </li>
        }
    </ul>
  
  `,
  styles: `

    @use '../styles/variables.scss' as *;

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

    }

    .monospace {
      font-family: monospace;
    }

    .link {
      font-weight: 600;
      color: $blue;
      text-decoration: none;
      &:hover {
          text-decoration: underline;
          text-decoration-thickness: 2px;
          text-underline-offset: 4px;
      }
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

  private angularLink: string = `
    <a class="angular" style="color: red !important;" href="https://angular.dev/" target="_blank">
      Angular
    </a>
  `;

  get content(): FooterContent {
    return (
        this.languageService.isGreek()
      ? this.contentGr
      : this.languageService.isEnglish()
      ? this.contentEng
      : this.contentSp
    );
  }

  private contentGr: FooterContent = {
    text: `
      Μια ${this.angularLink} εφαρμογή απο τον 
      <a href="https://nick-polizogopoulos.web.app/" class="link nodecor" target="_blank">
      Νίκο Πολυζωγόπουλο</a><span class="monospace">.</span>
    `,
    links: [
      {
        name: 'Πληροφορίες',
        path: 'about'
      },
      {
        name: 'Cookies',
        path: 'cookies'
      },
      {
        name: 'Απόρρητο & Όροι',
        path: 'privacy-terms'
      }
    ]
  };

  private contentEng: FooterContent = {
    text: `
      An ${this.angularLink} Application by 
      <a href="https://nick-polizogopoulos.web.app/" class="link nodecor" target="_blank">
        Nick Polizogopoulos</a><span class="monospace">.</span>
    `,
    links: [
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
    ]
  };

  private contentSp: FooterContent = {
    text: ` 
      Una aplicación ${this.angularLink} de
      <a href="https://nick-polizogopoulos.web.app/" class="link nodecor" target="_blank">
        Nick Polizogopoulos</a><span class="monospace">.</span>
    `,
    links: [
      {
        name: 'Acerca',
        path: 'about'
      },
      {
        name: 'Cookies',
        path: 'cookies'
      },
      {
        name: 'Privacidad y Términos',
        path: 'privacy-terms'
      }
    ]
  };

}