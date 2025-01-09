import { PrivacyTermsContentType } from "./terms-types";

export const contentFr: PrivacyTermsContentType = {
    pageTitle: 'Politique de Confidentialité & Conditions d\'Utilisation',
    content: [
        {
            title: 'Politique de Confidentialité',
            date: 'Date d\'entrée en vigueur : 27 décembre 2024',
            introductionText: `
                "Product offer to .pdf" respecte votre vie privée et s'engage à protéger vos informations personnelles. 
                Voici ce que vous devez savoir :`,
            list: [
                {
                    title: 'Collecte des Données',
                    bullet: [
                        `Nous ne collectons ni ne stockons aucune donnée utilisateur sur nos serveurs.`,
                        `Les détails de l'entreprise saisis dans le formulaire sont enregistrés localement dans votre navigateur pour plus de commodité. 
                        Ces informations ne sont ni partagées ni téléchargées ailleurs.`
                    ]
                },
                {
                    title: 'Google Analytics',
                    bullet: [
                        `Nous utilisons Google Analytics 4 pour analyser les tendances d'utilisation et améliorer l'application. 
                        Cela peut inclure des données anonymisées, telles que des informations sur l'appareil ou des statistiques d'utilisation.`
                    ]
                },
                {
                    title: 'Vos Droits',
                    bullet: [
                        'Étant donné qu\'aucune donnée personnelle n\'est collectée ou stockée sur nos serveurs, aucune action n\'est nécessaire pour supprimer ou accéder à vos données.'
                    ]
                },
                {
                    title: 'Cookies',
                    bullet: [
                        'Google Analytics peut utiliser des cookies pour suivre l\'utilisation. Vous pouvez gérer les cookies via les paramètres de votre navigateur.'
                    ]
                }
            ],
            contact: `Pour toute question, contactez-nous 
                <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=À propos de la confidentialité et des conditions d\'-Product offer to .pdf- Application">
                ici</a>. (Veuillez écrire en anglais)`
        },
        {
            title: 'Conditions d\'Utilisation',
            date: 'Date d\'entrée en vigueur : 27 décembre 2024',
            introductionText: 'En utilisant "Product offer to .pdf", vous acceptez les conditions suivantes :',
            list: [
                {
                    title: 'Objectif de l\'Application',
                    bullet: ['Cette application est fournie pour permettre aux entreprises de générer des offres PDF pour leurs clients.']
                },
                {
                    title: 'Responsabilités de l\'Utilisateur',
                    bullet: [
                        'Assurez-vous de l\'exactitude des informations saisies dans le formulaire.',
                        'Vous êtes responsable de garantir la conformité avec les lois applicables lors de l\'utilisation de cette application.',
                    ]
                },
                {
                    title: 'Stockage Local',
                    bullet: [
                        `L'application stocke les détails de l'entreprise localement dans votre navigateur pour plus de commodité. 
                        Ces données ne sont pas sauvegardées et ne peuvent pas être récupérées si elles sont supprimées.`
                    ]
                },
                {
                    title: 'Absence de Garantie',
                    bullet: [`L'application est fournie "telle quelle" sans aucune garantie d'exactitude ou de fiabilité.`]
                },
                {
                    title: 'Limitation de Responsabilité',
                    bullet: [
                        `Nous ne sommes pas responsables des problèmes découlant de l'utilisation de l'application, 
                        y compris la perte de données ou des erreurs dans le PDF généré.`
                    ]
                },
            ],
            contact: `
                Si vous n'êtes pas d'accord avec ces conditions, veuillez cesser d'utiliser l'application. 
                Pour toute question, contactez-nous 
                <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=À propos de la confidentialité et des conditions d\'-Product offer to .pdf- Application">
                ici</a>. (Veuillez écrire en anglais)`
        }
    ],
    buttonText: 'Retour à l\'accueil'
};
