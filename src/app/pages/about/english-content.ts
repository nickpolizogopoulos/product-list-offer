import { type AboutContent } from "./about-types";

export const contentEng: AboutContent = {
    pageHeader: 'About this Application',
    appDescription: `
        This <strong><u>free and open source</u></strong> application, developed with the latest tools, 
        simplifies the creation and sharing of professional product proposals. 
        Built using modern web technologies, it offers a user-friendly and efficient experience, 
        enabling businesses to generate detailed, bilingual product offer PDFs in minutes by simply filling out a form. 
        These offers can then be sent directly to clients or customers.
    `,
    keyFeaturesHeader: 'Key features include:',
    features: [
        {
            name: 'Dynamic Customization',
            information: `The company can enter its details, the details of its customer or client, customize the offer, and create a personalized PDF.`
        },
        {
            name: 'Time-saving functionality',
            information: 'The company information is stored locally in the browser, making future use faster and more convenient.'
        },
        {
            name: 'Offer Expiration Date',
            information: 'The application allows you to include an expiration date for the offer in the PDF.'
        },
        {
            name: 'Add Notes',
            information: `
                To add notes, click the "Add Notes" button and fill in the field.
                If you want to exclude the notes from the PDF, simply click "Delete Notes" and the notes will be removed.
            `
        },
        {
            name: 'Multilingual PDF',
            information: `
                The PDF will be generated in the language selected by the user on the header section of the Application
                You can choose either English or Greek. More languages will be added in the future.
            `
        },
        {
            name: 'Dynamic Product List',
            information: `
                Add products to the list by clicking the button with the green cross in a circle.
                Remove products from the list by clicking the button to the right of the product with the red trash can.
                Select the quantity and price per unit. The application will automatically calculate the total cost.
            `
        },
        {
            name: 'PDF with or without color',
            information: `
                Choose whether you want the PDF to have color details or not.
                The color option includes a blue background for the company details and a colored product table.
            `
        }
    ],
    customPdfHeader: 'Custom PDF',
    contact: [
        `The application can be customized to allow a business to generate its own custom PDF file,
                including the company's logo and any other content the business wants to display.`,
        `There is the option to create any kind of PDF files, not just product offers.`,
        `Feel free to contact me 
        <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=About a custom .pdf generator">
            here</a>.`,
        `- Nick Polizogopoulos`,
    ],
    credits: 'Home page illustration by&nbsp;<a href="https://undraw.co/" target="_blank">unDraw</a>&nbsp;- Katerina Limpitsouni. (thank you very much!)',
    buttonText: 'Make your own .pdf!'
}