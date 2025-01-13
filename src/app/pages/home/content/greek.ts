import { HomeContent } from "./types";

export const greek: HomeContent = {
    company: {
        sectionTitle: 'Πληροφορίες Εταιρείας',
        name: {
            label: 'Όνομα Εταιρείας',
            errorMessage: 'Παρακαλώ, εισάγετε όνομα εταιρείας / επωνυμία.',
        },
        subtitle: {
                label: 'Υπότιτλος Εταιρείας (προαιρετικό)',
                errorMessage: ''
        },
        phone: {
            label: 'Τηλέφωνο',
            errorMessage: 'Παρακαλώ, εισάγετε αριθμό τηλεφώνου.'
        },
        email: {
            label: 'Διευθ. Ηλ. Ταχυδρομείου',
            errorMessage: 'Παρακαλώ, εισάγετε σωστό email.'
        },
        location: {
            label: 'Τοποθεσία',
            errorMessage: 'Παρακαλώ, εισάγετε τοποθεσία εταιρείας.'
        }
    },
    client:{
        sectionTitle: 'Πληροφορίες Πελάτη',
        name: {
            label: 'Όνομα Πελάτη',
            errorMessage: 'Παρακαλώ, εισάγετε όνομα / επωνυμία πελάτη.'
        },
        phone: {
            label: 'Τηλέφωνο',
            errorMessage: 'Παρακαλώ, εισάγετε αριθμό τηλεφώνου.'
        },
        email: {
            label: 'Διευθ. Ηλ. Ταχυδρομείου',
            errorMessage: 'Παρακαλώ, εισάγετε σωστό email.'
        },
    },
    settings: {
        sectionTitle: 'Ρυθμίσεις προσφοράς',
        radio1: 'Η προσφορά είναι μόνιμη',
        radio2: 'Με ημερομηνία λήξης',
        input: {
            label: 'Ημ/νία λήξης προσφοράς',
            errorMessage: 'Παρακαλώ κάντε κλικ στο κουμπί δίπλα από το πεδίο εισαγωγής για να επιλέξετε μια ημερομηνία.'
        },
        button: {
            add: 'Προσθήκη σημειώσεων',
            delete: 'Διαγραφή σημειώσεων'
        },
        textAreaLabel: 'Σημειώσεις (έως 200 χαρακτήρες)'
    },
    products: {
        sectionTitle: 'Λίστα προϊόντων',
        product: {
            title: {
                label: 'Τίτλος Προϊόντος',
                errorMessage: 'Παρακαλώ, εισάγετε τίτλο προϊόντος.'
            },
            quantity: {
                label: 'Ποσότητα',
                errorMessage: 'Παρακαλώ, εισάγετε ποσότητα.'
            },
            unitPrice: {
                label: 'Τιμή Μονάδας €',
                errorMessage: 'Παρακαλώ εισάγετε τιμή προϊόντος.'
            }
        },
        listIsEmpty: 'Δεν υπάρχουν προϊόντα στη λίστα σας. Το αρχείο PDF δεν μπορεί να δημιουργηθεί με άδεια λίστα προϊόντων!',
        mobileHeader: 'Προσθήκη προϊόντος'
    },
    colourOptions: {
        coloured: 'Εκτύπωση αρχείου .pdf με χρώμα',
        withoutColour: 'Αφαίρεση χρωμάτων (εξοικονόμηση μελανιού)'
    },
    submit: {
        listEmptyMessage: 'Η λίστα είναι άδεια.',
        formErrorMessage: 'Παρακαλώ, βεβαιωθείτε ότι όλα τα πεδία είναι συμπληρωμένα σωστά!',
        button: 'Λήψη αρχείου .pdf'
    }
};