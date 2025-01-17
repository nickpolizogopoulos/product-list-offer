import { HomeContent } from "./types";

export const italian: HomeContent = {
    company: {
        sectionTitle: 'Informazioni Aziendali',
        name: {
            label: `Nome dell'Azienda`,
            errorMessage: 'Per favore, inserisci il nome della tua azienda.'
        },
        subtitle: {
            label: `Sottotitolo dell'Azienda (facoltativo)`,
            errorMessage: ''
        },
        phone: {
            label: 'Telefono',
            errorMessage: 'Si prega di inserire un numero di telefono.'
        },
        email: {
            label: 'Email',
            errorMessage: 'Si prega di inserire un email valido.'
        },
        location: {
            label: 'Indirizzo',
            errorMessage: `Si prega di inserire l'indirizzo della vostra azienda.`
        }
    },
    client: {
        sectionTitle: 'Informazioni del Cliente',
        name: {
            label: 'Nome del cliente',
            errorMessage: 'Si prega di inserire il nome del cliente.'
        },
        phone: {
            label: 'Telefono',
            errorMessage: 'Si prega di inserire un numero di telefono.'
        },
        email: {
            label: 'Email',
            errorMessage: 'Si prega di inserire un email valido.'
        },
    },
    settings: {
        sectionTitle: `Impostazioni dell'offerta`,
        radio1: `L'offerta è valida permanentemente`,
        radio2: 'Con una data di scadenza',
        input: {
            label: `Data di scadenza dell'offerta`,
            errorMessage: 'Fai clic sul pulsante accanto al campo di inserimento per selezionare una data.'
        },
        button: {
            add: 'Aggiungi note',
            delete: 'Elimina note'
        },
        textAreaLabel: 'Note (fino a 200 caratteri)'
    },
    products: {
        sectionTitle: 'Elenco dei prodotti',
        product: {
            title: {
                label: 'Titolo del prodotto',
                errorMessage: 'Si prega di inserire il titolo del prodotto.'
            },
            quantity: {
                label: 'Quantità',
                errorMessage: 'Per favore, aggiungi la quantità.'
            },
            unitPrice: {
                label: 'Prezzo unitario €',
                errorMessage: 'Per favore, aggiungi il prezzo del prodotto.'
            }
        },
        listIsEmpty: 'Non ci sono prodotti nella tua lista. Il file PDF non può essere generato con una lista di prodotti vuota!',
        mobileHeader: 'Aggiungi prodotto'
    },
    orientation: {
        vertical: 'Verticale .pdf',
        horizontal: 'Orizzontale .pdf'
    },
    colourOptions: {
        coloured: 'Stampa .pdf a colori',
        withoutColour: 'Rimuovi i colori (risparmia inchiostro)'
    },
    submit: {
        listEmptyMessage: 'La lista è vuota.',
        formErrorMessage: 'Assicurati che tutti i campi siano compilati correttamente!',
        button: 'Scarica il file .pdf'
    }
};
