import { Component, computed, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { MaterialComponents } from '../tools/material-components';

@Component({
  selector: 'footer[appFooter]',
  standalone: true,
  imports: [
    MaterialComponents
  ],
  host: {
    'class': 'container'
  },
  template: `

    Product offer to .pdf 2024{{ date === 2024 ? '' : ' - '+date }}<span>.</span>
    @if (selectedLanguage() === 'greek') {
      Μια εφαρμογή φτιαγμένη με
      <a class="angular" href="https://angular.dev/" target="_blank">
        Angular
      </a>
      απο τον
      <a href="https://nick-polizogopoulos.web.app/" class="nodecor" target="_blank">
        Νίκο Πολυζωγόπουλο</a><span>.</span>
    }
    @else {
      An
      <a class="angular" href="https://angular.dev/" target="_blank">
        Angular
      </a>
      Application by 
      <a href="https://nick-polizogopoulos.web.app/" class="nodecor" target="_blank">
        Nick Polizogopoulos</a><span>.</span>
    }
  
  `,
  styles: `
  
    :host {
      user-select: none;
      text-align: center;
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

}