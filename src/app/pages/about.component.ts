import { Component, ViewEncapsulation } from "@angular/core";
import { MaterialComponents } from "../utilities/tools/material-components";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [
        RouterLink,
        MaterialComponents
    ],
    template: `

        <div class="container">
            <h3>About this Application</h3>
            <mat-divider />
            <p>
                This application is designed to simplify the process of creating and sharing professional product offers.
            </p>
            <p>
                Built with Angular 18, it leverages modern web technologies to ensure a seamless, efficient, and user-friendly experience.
            </p>

            <h5>Key features include:</h5>
            <ul>
                <li><strong>Dynamic Customization:</strong> Any company can input their details, customize the offer, and generate a tailored PDF.</li>
                <li><strong>Advanced Reactivity:</strong> Using Angular signals, the app offers smooth and efficient updates for form data and interactive components.</li>
                <li><strong>Zoneless Environment:</strong> By adopting a zoneless design, the app ensures improved performance and reduced complexity.</li>
                <li><strong>SASS for Styling:</strong> The app uses SASS to deliver a clean, customizable, and professional design.</li>
                <li><strong>Angular Material:</strong> Provides a polished and accessible UI with components that adhere to Material Design standards.</li>
                <li><strong>PDF Generation:</strong> The <a href="https://artskydj.github.io/jsPDF/docs/jsPDF.html" target="_blank">jsPDF</a> library is integrated for generating high-quality PDF files, including well-structured tables for products and prices.</li>
            </ul>

            <p>
                This app empowers businesses to create detailed, professional offers in minutes, saving time and ensuring quality with every document.
            </p>

            <button routerLink="/" mat-raised-button>Try it out!</button>

        </div>

    `,
    styles: `
    
        h5 {
            margin: 2rem 0;
        }

        strong {
            font-weight: 550;
        }

        a {
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
            margin: 2rem 0;
        }
    
    `
})
export class AboutComponent {}