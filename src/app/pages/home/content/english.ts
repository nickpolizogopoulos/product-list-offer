import { HomeContent } from "./types";

export const english: HomeContent = {
    company: {
        sectionTitle: 'Company Information',
        name: {
            label: 'Company Name',
            errorMessage: 'Please, enter your company name.'
        },
        subtitle: {
            label: 'Company Subtitle (optional)',
            errorMessage: ''
        },
        phone: {
            label: 'Phone',
            errorMessage: 'Please, enter a phone number.'
        },
        email: {
            label: 'Email',
            errorMessage: 'Please, enter a valid email.'
        },
        location: {
            label: 'Location',
            errorMessage: 'Please, your company location.'
        }
    },
    client:{
        sectionTitle: 'Client Information',
        name: {
            label: 'Client Name',
            errorMessage: `Please, enter your client's name.`
        },
        phone: {
            label: 'Phone',
            errorMessage: 'Please, enter a phone number.'
        },
        email: {
            label: 'Email',
            errorMessage: 'Please, enter a valid email.'
        }
    },
    settings: {
        sectionTitle: 'Offer Settings',
        radio1: 'The offer is valid permanently',
        radio2: 'With an expiration date',
        input: {
            label: 'Offer expiration date',
            errorMessage: 'Please click the button next to the input field to select a date.'
        },
        button: {
            add: 'Add notes',
            delete: 'Delete notes'
        },
        textAreaLabel: 'Notes (up to 200 characters)'
    },
    products: {
        sectionTitle: 'Product list',
        product: {
            title: {
                label: 'Product Title',
                errorMessage: 'Please enter the product title.'
            },
            quantity: {
                label: 'Quantity',
                errorMessage: 'Please, add quantity.'
            },
            unitPrice: {
                label: 'Unit Price €',
                errorMessage: 'Please, add product unit price.'
            }
        },
        listIsEmpty: 'There are no products in your list. The PDF file cannot be generated with an empty product list!',
        mobileHeader: 'Add Product'
    },
    orientation: {
        vertical: 'Vertical .pdf',
        horizontal: 'Horizontal .pdf'
    },
    colourOptions: {
        coloured: 'Print coloured .pdf file',
        withoutColour: 'Remove colours (saves ink)'
    },
    submit: {
        listEmptyMessage: 'The list is empty.',
        formErrorMessage: 'Please make sure all fields are filled correctly!',
        button: 'Download .pdf file'
    }
};