import {
    Component,
    computed,
    inject,
    ViewEncapsulation
} from "@angular/core";
import { RouterLink } from "@angular/router";

import { MaterialComponents } from "../utilities/tools/material-components";
import { LanguageService } from "../utilities/services/language.service";

type Feature = {
    name: string;
    information: string;
};

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [
        RouterLink,
        MaterialComponents
    ],
    encapsulation: ViewEncapsulation.None,
    template: `

        <div class="container">
            @if (isGreek()) {
                <h3>Σχετικά με την Εφαρμογή</h3>
                <mat-divider />
                <p>
                    Αυτή η <strong><u>δωρεάν</u></strong> εφαρμογή έχει σχεδιαστεί για να απλοποιεί τη διαδικασία δημιουργίας και κοινοποίησης επαγγελματικών προσφορών προϊόντων.
                </p>
                <p>
                    Κατασκευασμένη με Angular 18, αξιοποιεί σύγχρονες τεχνολογίες ιστού για να εξασφαλίσει μια ομαλή,
                    αποδοτική και φιλική προς τον χρήστη εμπειρία.
                </p>
                
                <h5>Τα βασικά χαρακτηριστικά περιλαμβάνουν:</h5>
                <ul class="features">
                    @for (feature of allKeyFeaturesGr; track $index) {
                        <li>
                            <strong [innerHTML]="feature.name"></strong>
                            <strong>: </strong>
                            <span [innerHTML]="feature.information"></span>
                        </li>
                    }
                </ul>
                <p>
                    Αυτή η εφαρμογή δίνει τη δυνατότητα στις επιχειρήσεις να δημιουργούν λεπτομερείς,
                    επαγγελματικές προσφορές σε λίγα λεπτά, εξοικονομώντας χρόνο και διασφαλίζοντας την ποιότητα σε κάθε έγγραφο.
                </p>
                
                <h5>Προσαρμοσμένο PDF</h5>
                <p>
                    Η εφαρμογή μπορεί να προσαρμοστεί ώστε να επιτρέπει σε μια επιχείρηση να δημιουργεί το δικό της
                    προσαρμοσμένο αρχείο PDF, συμπεριλαμβανομένου του λογότυπου της εταιρείας και οποιουδήποτε άλλου περιεχομένου θέλει να προβάλλει.
                </p>
                <p>
                    Μη διστάσετε να επικοινωνήσετε μαζί μου
                    <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=Σχετικά με προσαρμοσμένη εφαρμογή δημιουργίας PDF">
                        εδώ
                    </a>. 
                </p>
                <p>- Νίκος Πολυζωγόπουλος</p>
            }

            @else {
                <h3>About this Application</h3>
                <mat-divider />
                <p>
                    This <strong><u>free</u></strong> application is designed to simplify the process of creating and sharing professional product offers.
                </p>
                <p>
                    Built with Angular 18, it leverages modern web technologies to ensure
                    a seamless, efficient, and user-friendly experience.
                </p>
                
                <h5>Key features include:</h5>
                <ul class="features">
                    @for (feature of allKeyFeaturesEng; track $index) {
                        <li>
                            <strong [innerHTML]="feature.name"></strong>
                            <strong>: </strong>
                            <span [innerHTML]="feature.information"></span>
                        </li>
                    }
                </ul>
                <p>
                    This app empowers businesses to create detailed, professional offers in minutes,
                    saving time and ensuring quality with every document.
                </p>
                
                <h5>Custom PDF</h5>
                <p>
                    The application can be customized to allow a business to generate its own custom PDF file,
                    including the company's logo and any other content the business wants to display.
                </p>
                <p>
                    Feel free to contact me 
                    <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=About a custom .pdf generator">
                        here
                    </a>. 
                </p>
                <p>- Nick Polizogopoulos</p>
            }
                <button routerLink="/" mat-raised-button>
                    {{ 
                        isGreek()
                        ? 'Φτιάξτε το δικό σας '
                        : 'Make your '
                    }}.pdf!
                </button>
            </div>

    `,
    styles: `
    
        h5 {
            margin: 2rem 0;
        }

        p {
            margin: 0;
            line-height: 1.8;
        }

        strong,
        .link {
            font-weight: 600;
        }
        
        .features {
            padding-left: 0;
            list-style-position: inside;
            list-style-type: circle;
            li {
                margin: .7rem;
            }
        }

        p:last-of-type {
            margin: 2rem 0 2rem 0;
        }
    
    `
})
export class AboutComponent {

    private languageService = inject(LanguageService);
      
    selectedLanguage = computed(() => 
        this.languageService.selectedLanguage()
    );
      
    isGreek = computed(() => 
        this.selectedLanguage() === 'greek'
    );

    get allKeyFeaturesEng(): Feature[] {
        return [...this.keyFeaturesEng];
    }

    private keyFeaturesEng: Feature[] = [
        {
            name: 'Dynamic Customization',
            information: 'Any company can input their details, customize the offer, and generate a tailored PDF'
        },
        {
            name: 'Advanced Development',
            information: 'With Angular Signals, the app offers dynamic updates for form data and interactive elements'
        },
        {
            name: 'Zoneless Environment',
            information: 'With the adoption of "Angular Zoneless", the app ensures improved performance and reduced complexity'
        },
        {
            name: 'Angular Material & SASS',
            information: 'The elegant and flexible Angular Material, combined with SASS, offers a clean and modern design'
        },
        {
            name: 'PDF Generation',
            information: `It integrates the <a class="link" href="https://artskydj.github.io/jsPDF/docs/jsPDF.html" target="_blank">jsPDF</a> 
                library for generating PDF files with a relevant table for products and prices`
        },
        {
            name: 'Multilingual',
            information: 'Supports English and Greek, allowing usage for Greek and international users.'
        }
    ];

    get allKeyFeaturesGr(): Feature[] {
        return [...this.keyFeaturesGr];
    }

    private keyFeaturesGr: Feature[] = [
        {
            name: 'Δυναμική Προσαρμογή',
            information: 'Κάθε εταιρεία μπορεί να εισάγει τα στοιχεία της, να προσαρμόσει την προσφορά και να δημιουργήσει ένα εξατομικευμένο PDF'
        },
        {
            name: 'Προηγμένη Ανάπτυξη',
            information: 'Με τα Angular Signals, η εφαρμογή προσφέρει δυναμικές ενημερώσεις για τα δεδομένα της φόρμας και τα διαδραστικά στοιχεία'
        },
        {
            name: 'Περιβάλλον Zoneless',
            information: 'Με την υιοθέτηση του "Angular Zoneless", η εφαρμογή εξασφαλίζει βελτιωμένη απόδοση και μειωμένη πολυπλοκότητα'
        },
        {
            name: 'Angular Material & SASS',
            information: 'Το κομψό και ευέλικτο Angular Material σε συνδιασμό με την SASS προσφέρουν έναν καθαρό και μοντέρνο σχεδιασμό'
        },
        {
            name: 'Δημιουργία PDF',
            information: `Ενσωματώνει την βιβλιοθήκη <a class="link" href="https://artskydj.github.io/jsPDF/docs/jsPDF.html" target="_blank">jsPDF</a> 
                για τη δημιουργία αρχείων PDF με σχετικό πίνακα για προϊόντα και τιμές`
        },
        {
            name: 'Πολύγλωσσο',
            information: 'Υποστηρίζει Αγγλικά και Ελληνικά, επιτρέποντας την χρήση σε Έλληνες και διεθνείς χρήστες'
        }
    ];

}