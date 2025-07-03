import {
  Component,
  inject
} from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { CookieWarningService } from "./utilities/services/cookie-warning/cookie-warning-service";

import { BackToTop } from "./utilities/components/back-to-top";
import { Footer } from "./utilities/components/footer/footer";
import { Header } from "./utilities/components/header/header";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Header,
    RouterOutlet,
    Footer,
    BackToTop
  ],
  template: `
  
    <app-back-to-top />
    <header appHeader></header>
    <router-outlet />
    <footer appFooter></footer>
  
  `
})
export class App {

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