import {
    Component,
    computed,
    inject,
    input
} from "@angular/core";

import { LanguageService } from "../services/language.service";

@Component({
    selector: 'span[ErrorMessage]',
    standalone: true,
    host: {
        '[class]': 'classes()'
    },
    template: `

        {{
            languageService.isGreek()
            ? greek()
            : languageService.isEnglish()
            ? english()
            : languageService.isSpanish()
            ? spanish()
            : french()
        }}
    
    `
})
export class ErrorMessageComponent {

    languageService = inject(LanguageService);

    classes = input.required<string>();

    greek = input.required<string>();
    english = input.required<string>();
    spanish = input.required<string>();
    french = input.required<string>();

}