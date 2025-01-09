import { PrivacyTermsContentType } from "./terms-types";

export const contentIt: PrivacyTermsContentType = {
    pageTitle: 'Privacy Policy e Termini di Utilizzo',
    content: [
        {
            title: 'Privacy Policy',
            date: 'Data di entrata in vigore: 27 dicembre 2024',
            introductionText: `
                "Product offer to .pdf" rispetta la tua privacy e si impegna a proteggere le tue informazioni personali. 
                Ecco cosa devi sapere:`,
            list: [
                {
                    title: 'Raccolta dei Dati',
                    bullet: [
                        `Non raccogliamo né memorizziamo alcun dato utente sui nostri server.`,
                        `I dettagli dell'azienda inseriti nel modulo vengono salvati localmente nel tuo browser per comodità. 
                        Queste informazioni non vengono condivise o caricate altrove.`
                    ]
                },
                {
                    title: 'Google Analytics',
                    bullet: [
                        `Utilizziamo Google Analytics 4 per analizzare i modelli di utilizzo e migliorare l'app. 
                        Ciò può includere dati anonimizzati, come informazioni sul dispositivo o statistiche sull'uso.`
                    ]
                },
                {
                    title: 'I tuoi Diritti',
                    bullet: [
                        'Poiché non vengono raccolti né memorizzati dati personali sui nostri server, non sono necessarie azioni per eliminare o accedere ai tuoi dati.'
                    ]
                },
                {
                    title: 'Cookie',
                    bullet: [
                        'Google Analytics può utilizzare i cookie per monitorare l\'utilizzo. Puoi gestire i cookie tramite le impostazioni del tuo browser.'
                    ]
                }
            ],
            contact: `Per domande, contattaci 
                <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=About Privacy and Terms of -Product offer to .pdf- Application">
                qui</a>. (Per favore, scrivi in inglese)`
        },
        {
            title: 'Termini di Utilizzo',
            date: 'Data di entrata in vigore: 27 dicembre 2024',
            introductionText: 'Utilizzando "Product offer to .pdf", accetti i seguenti termini:',
            list: [
                {
                    title: 'Scopo dell\'App',
                    bullet: ['Questa app è fornita per le aziende per generare offerte PDF per i loro clienti.']
                },
                {
                    title: 'Responsabilità dell\'Utente',
                    bullet: [
                        'Assicurati che le informazioni inserite nel modulo siano accurate.',
                        'Sei responsabile di garantire la conformità alle leggi applicabili nell\'utilizzo di questa app.',
                    ]
                },
                {
                    title: 'Memoria Locale',
                    bullet: [
                        `L'app memorizza i dettagli dell'azienda localmente nel tuo browser per comodità. 
                        Questi dati non vengono salvati o recuperabili se vengono cancellati.`
                    ]
                },
                {
                    title: 'Nessuna Garanzia',
                    bullet: [`L'app è fornita "così com'è" senza alcuna garanzia di accuratezza o affidabilità.`]
                },
                {
                    title: 'Limitazione di Responsabilità',
                    bullet: [
                        `Non siamo responsabili per eventuali problemi derivanti dall'utilizzo dell'app, 
                        inclusa la perdita di dati o errori nel PDF generato.`
                    ]
                },
            ],
            contact: `
                Se non sei d'accordo con questi termini, ti preghiamo di interrompere l'uso dell'app. 
                Per domande, contattaci 
                <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=About Privacy and Terms of -Product offer to .pdf- Application">
                qui</a>. (Per favore, scrivi in inglese)`
        }
    ],
    buttonText: 'Torna alla home'
};
