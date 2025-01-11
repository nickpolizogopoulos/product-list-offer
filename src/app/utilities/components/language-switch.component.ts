import {
    Component,
    inject,
    input
} from "@angular/core";

import { LanguageService } from "../services/language.service";

@Component({
    selector: 'app-language-switch',
    standalone: true,
    template: `
    
        @let language = this.languageService;

        {{
              language.isGreek()   ? greek()
            : language.isEnglish() ? english()
            : language.isSpanish() ? spanish()
            : language.isFrench()  ? french()
            : language.isItalian() ? italian()
            : language.isRussian() ? russian()
            : korean()
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
    russian = input.required<string>();
    korean = input.required<string>();

}