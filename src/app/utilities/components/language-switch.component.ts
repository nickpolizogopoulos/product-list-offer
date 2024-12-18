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
    
        {{ selectedLanguage() === 'greek' ? greek() : english() }}

    `
})
export class LanguageSwitchComponent {

    private languageService = inject(LanguageService);
    
    selectedLanguage = computed(() => 
        this.languageService.selectedLanguage()
    );

    greek = input.required<string>();
    english = input.required<string>();

}