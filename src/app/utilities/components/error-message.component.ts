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

        @if (selectedLanguage() === 'greek') {
            {{ greek() }}
        }
        @else {
            {{ english() }}
        }
    
    `
})
export class ErrorMessageComponent {

    private languageService = inject(LanguageService);
      
    selectedLanguage = computed(() => 
        this.languageService.selectedLanguage()
    );

    greek = input.required<string>();
    english = input.required<string>();
    classes = input.required<string>();

}