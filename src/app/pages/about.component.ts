import {
    Component,
    ViewEncapsulation
} from "@angular/core";
import { RouterLink } from "@angular/router";

import { MaterialComponents } from "../utilities/tools/material-components";

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
            <h3>About this Application</h3>
            <mat-divider />
            <p>
                This application is designed to simplify the process of creating and sharing professional product offers.
            </p>
            <p>
                Built with Angular 18, it leverages modern web technologies to ensure
                a seamless, efficient, and user-friendly experience.
            </p>

            <h5>Key features include:</h5>
            <ul>
                @for (feature of allKeyFeatures; track $index) {
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
                This application can be customized to allow a business to generate its own custom PDF file,
                including the company's logo and any other content the business wants to display.
            </p>
            <p>
                Feel free to contact me 
                <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=About a custom .pdf generator">
                    here
                </a>. 
            </p>
            <button routerLink="/" mat-raised-button>Make your .pdf!</button>
        </div>

    `,
    styles: `
    
        h5 {
            margin: 2rem 0;
        }

        strong {
            font-weight: 600;
        }

        .link {
            font-weight: 600;
            &:before {
                content: '[ '
            }
            
            &:after {
                content: ' ]'
            }
        }
        
        ul {
            padding-left: 0;
            list-style-position: inside;
            list-style-type: circle;
            li {
                margin: .7rem;
            }
        }

        p:last-of-type {
            margin: 0 0 2rem 0;
        }
    
    `
})
export class AboutComponent {

    get allKeyFeatures(): Feature[] {
        return [...this.keyFeatures];
    }

    private keyFeatures: Feature[] = [
        {
            name: 'Dynamic Customization',
            information: 'Any company can input their details, customize the offer, and generate a tailored PDF'
        },
        {
            name: 'Advanced Reactivity',
            information: 'Using Angular signals, the app offers smooth and efficient updates for form data and interactive components'
        },
        {
            name: 'Zoneless Environment',
            information: 'By adopting a Zoneless design, the app ensures improved performance and reduced complexity'
        },
        {
            name: 'SASS',
            information: 'This Application uses SASS to deliver a clean, customizable, and professional design'
        },
        {
            name: 'Angular Material',
            information: 'Provides a polished and accessible UI with components that adhere to Material Design standards'
        },
        {
            name: 'PDF Generation',
            information: `The <a class="link" href="https://artskydj.github.io/jsPDF/docs/jsPDF.html" target="_blank">jsPDF</a> 
                library is integrated for generating high-quality PDF files, including well-structured tables for products and prices`
        }
    ];

}