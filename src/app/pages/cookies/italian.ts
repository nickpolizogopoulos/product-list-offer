import { CookiesContent } from "./cookies-types";

export const italian: CookiesContent = {
    pageTitle: 'Politica sui Cookies',
    introText: 'Questo sito web utilizza i cookie per garantire la migliore esperienza nell\'utilizzo dell\'applicazione.',
    block: {
        title: 'Cosa sono i cookie?',
        text: `
            I cookie sono piccoli file di testo che vengono memorizzati sul tuo computer o dispositivo mobile quando visiti un sito web. 
            Vengono utilizzati principalmente per far funzionare i siti web, o per farli funzionare in modo più efficiente, e per fornire informazioni ai proprietari dei siti web.`
    },
    block2: {
        title: 'Perché utilizziamo i cookie?',
        text: 'Utilizziamo i cookie per i seguenti scopi:'
    },
    list1: [
        {
            title: 'Cookie essenziali',
            text: `
               Questi cookie sono essenziali per il funzionamento di base del nostro sito web, come ad esempio per consentirti di 
                memorizzare le informazioni aziendali (titolo, sottotitolo, telefono, posizione, email) nel browser per un utilizzo più semplice in futuro.
            `
        },
        {
            title: 'Cookie di Google Analytics 4',
            text: `
               Utilizziamo Google Analytics 4 per raccogliere informazioni anonime su come i visitatori utilizzano il nostro sito web. 
               Questo ci aiuta a comprendere il traffico del sito web e a migliorare l\'esperienza utente.
            `
        },
        {
            title: 'Cookie di terze parti',
            text: 'Potremmo utilizzare cookie di terze parti per scopi di marketing, come la pubblicità mirata.'
        }
    ],
    cookiesLink: `
        Puoi trovare ulteriori informazioni sui cookie di Google Analytics 4 
        <a class="link" href="https://support.google.com/analytics/answer/11397207?hl=en&sjid=12660115510274093596-EU" target="_blank">qui</a>.
    `,
    block3: {
        title: 'Controllo dei cookie',
        text: `
            Puoi controllare e/o eliminare i cookie come desideri – per i dettagli, consulta
            <a class="link" href="https://www.aboutcookies.org/" target="_blank">aboutcookies.org</a>.
            Puoi eliminare tutti i cookie già presenti sul tuo computer e impostare la maggior parte dei browser per impedire che vengano inseriti. 
            Tuttavia, se lo fai, potresti dover regolare manualmente alcune preferenze ogni volta che visiti un sito e alcuni servizi e 
            funzionalità potrebbero non funzionare correttamente.
        `
    },
    block4: {
        title: 'Esclusione di responsabilità',
        text: `
            Questo sito web contiene link ad altri siti web. 
            Ti preghiamo di notare che non abbiamo alcun controllo su come questi siti web utilizzano i cookie e ti consigliamo di consultare le rispettive politiche sulla privacy.`
    },
    buttonText: 'Torna alla home'
};
