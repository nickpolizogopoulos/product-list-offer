import { Component } from '@angular/core';

@Component({
  selector: 'footer[appFooter]',
  standalone: true,
  host: {
    'class': 'container'
  },
  template: `
  
    An
    <a class="angular" href="https://angular.dev/" target="_blank">
      Angular
    </a>
    Application by 
    <a href="https://nick-polizogopoulos.web.app/" class="nodecor" target="_blank">
      Nick Polizogopoulos
    </a>
  
  `,
  styles: `

    @use '../styles/variables.scss' as *;
  
    :host {
      user-select: none;
      text-align: center;
    }

    .angular {
      @extend %angular;
      text-decoration: none;
    }

  `
})
export class FooterComponent {}