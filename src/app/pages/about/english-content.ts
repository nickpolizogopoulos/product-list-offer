import { type AboutContent } from "./about-types";

export const contentEng: AboutContent = {
    pageHeader: 'About this Application',
    appDescription: `
        This <strong><u>free</u></strong> application, built with state-of-the-art development tools, simplifies the process 
        of creating and sharing professional product proposals by leveraging modern web technologies for a user-friendly and 
        efficient experience. It enables businesses to create detailed, professional proposals in just minutes, saving time and 
        ensuring quality in every document.
    `,
    keyFeaturesHeader: 'Key features include:',
    features: [
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
    ],
    customPdfHeader: 'Custom PDF',
    contact: [
        `The application can be customized to allow a business to generate its own custom PDF file,
                including the company's logo and any other content the business wants to display.`,
        `Feel free to contact me 
        <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=About a custom .pdf generator">
            here</a>.`,
        `- Nick Polizogopoulos`,
    ],
    buttonText: 'Make your own .pdf!'
}