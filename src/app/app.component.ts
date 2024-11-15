import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { FooterComponent } from "./utilities/components/footer.component";
import { HeaderComponent } from "./utilities/components/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent
  ],
  template: `
  
    <header appHeader></header>
    <router-outlet />
    <footer appFooter></footer>
  
  `,
})
export class AppComponent {}
