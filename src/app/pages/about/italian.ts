import { AboutContent } from "./about-types";

export const contentIt: AboutContent = {
    pageHeader: 'Informazioni su questa applicazione',
    appDescription: `
        Questa applicazione <strong><u>gratuita e open source</u></strong>, sviluppata con gli strumenti più recenti, 
        semplifica la creazione e la condivisione di proposte professionali per i prodotti. 
        Realizzata con le tecnologie web moderne, offre un'esperienza utente intuitiva ed efficiente, 
        consentendo alle aziende di generare PDF di offerte dettagliate in pochi minuti, compilando semplicemente un modulo. 
        Queste offerte possono poi essere inviate direttamente ai clienti.
    `,
    keyFeaturesHeader: 'Le principali caratteristiche includono:',
    features: [
        {
            name: 'Personalizzazione dinamica',
            information: `L'azienda può inserire i propri dati, quelli del proprio cliente, personalizzare l'offerta e creare un PDF personalizzato.`
        },
        {
            name: 'Funzionalità che fa risparmiare tempo',
            information: 'I dati aziendali vengono memorizzati localmente nel browser, rendendo l\'utilizzo futuro più veloce e conveniente.'
        },
        {
            name: 'Data di scadenza dell\'offerta',
            information: 'L\'applicazione consente di includere una data di scadenza per l\'offerta nel PDF.'
        },
        {
            name: 'Aggiungi note',
            information: `
                Per aggiungere note, fai clic sul pulsante "Aggiungi note" e compila il campo.
                Se desideri escludere le note dal PDF, clicca semplicemente su "Elimina note" e le note verranno rimosse.
            `
        },
        {
            name: 'PDF multilingue',
            information: `
                Il PDF verrà generato nella lingua selezionata dall'utente nella sezione intestazione dell'applicazione.
            `
        },
        {
            name: 'Lista dinamica dei prodotti',
            information: `
                Aggiungi prodotti alla lista cliccando sul pulsante con la croce verde in un cerchio.
                Rimuovi i prodotti dalla lista cliccando sul pulsante a destra del prodotto con il cestino rosso.
                Seleziona la quantità e il prezzo per unità. L'applicazione calcolerà automaticamente il costo totale.
            `
        },
        {
            name: 'PDF con o senza colore',
            information: `
                Scegli se desideri che il PDF contenga dettagli colorati o meno.
                L'opzione colore include uno sfondo blu per i dettagli dell'azienda e una tabella dei prodotti colorata.
            `
        }
    ],
    customPdfHeader: 'PDF personalizzato',
    contact: [
        `L'applicazione può essere personalizzata per consentire a un'azienda di generare il proprio file PDF personalizzato, 
                includendo il logo dell'azienda e qualsiasi altro contenuto che l'azienda desidera visualizzare.`,
        `C'è la possibilità di creare qualsiasi tipo di file PDF, non solo offerte per prodotti.`,
        `Non esitare a contattarmi 
        <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=About a custom .pdf generator">qui</a>. (Per favore, scrivi in inglese)`,
        `- Nick Polizogopoulos`,
    ],
    credits: 'Illustrazione della pagina principale di&nbsp;<a href="https://undraw.co/" target="_blank">unDraw</a>&nbsp;- Katerina Limpitsouni. (grazie mille!)',
    buttonText: 'Crea il tuo .pdf!'
};
