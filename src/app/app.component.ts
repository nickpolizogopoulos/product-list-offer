import {
  Component,
  inject,
  OnInit
} from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { FooterComponent } from "./utilities/components/footer/footer.component";
import { HeaderComponent } from "./utilities/components/header/header.component";
import { BackToTopComponent } from "./utilities/components/back-to-top.component";
import { CookieWarningService } from "./utilities/services/cookie-warning/cookie-warning.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    BackToTopComponent
  ],
  template: `
  
    <app-back-to-top />
    <header appHeader></header>
    <router-outlet />
    <footer appFooter></footer>
  
  `
})
export class AppComponent {

  private cookieWarningService = inject(CookieWarningService);

  constructor() {
    console.log(
      `%c"Product Offer to .pdf" Web Application by Nick Polizogopoulos, late 2024 - 2025.`,
      `
        font-family: Arial;
        color:rgb(0, 148, 116);
        font-size: 21px;
      `
    );
    this.cookieWarningService.displayCookieWarning();
  }

}