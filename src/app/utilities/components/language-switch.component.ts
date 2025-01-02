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
              this.isGreek() 
            ? greek() 
            : english()
        }}

    `
})
export class LanguageSwitchComponent {

    private languageService = inject(LanguageService);

    isGreek = computed<boolean>(() =>
        this.languageService.selectedLanguage() === 'greek'
    );

    greek = input.required<string>();
    english = input.required<string>();

}