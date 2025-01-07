import {
    Component,
    computed,
    inject,
    input
} from "@angular/core";

import { LanguageService } from "../services/language.service";

@Component({
    selector: 'app-language-switch',
    standalone: true,
    template: `
    
        {{
              languageService.isGreek() 
            ? greek() 
            : languageService.isEnglish() 
            ? english()
            : languageService.isSpanish()
            ? spanish()
            : languageService.isFrench()
            ? french()
            : italian()
        }}

    `
})
export class LanguageSwitchComponent {

    languageService = inject(LanguageService);

    greek = input.required<string>();
    english = input.required<string>();
    spanish = input.required<string>();
    french = input.required<string>();
    italian = input.required<string>();

}