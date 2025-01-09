import { AboutContent } from "./about-types";

export const contentFr: AboutContent = {
    pageHeader: 'À propos de cette application',
    appDescription: `
        Cette application <strong><u>gratuite et open source</u></strong>, développée avec les outils les plus modernes, 
        simplifie la création et le partage de propositions professionnelles de produits. 
        Conçue avec les technologies web les plus récentes, elle offre une expérience conviviale et efficace, 
        permettant aux entreprises de générer rapidement des PDF détaillés de propositions de produits en remplissant simplement un formulaire. 
        Ces propositions peuvent ensuite être envoyées directement aux clients ou partenaires.
    `,
    keyFeaturesHeader: 'Les fonctionnalités principales incluent :',
    features: [
        {
            name: 'Personnalisation dynamique',
            information: `L'entreprise peut saisir ses informations, celles de ses clients ou consommateurs, personnaliser l'offre et créer un PDF personnalisé.`
        },
        {
            name: 'Gain de temps',
            information: 'Les informations de l’entreprise sont stockées localement dans le navigateur, ce qui rend l’utilisation future plus rapide et plus pratique.'
        },
        {
            name: `Date d'expiration de l'offre`,
            information: 'L’application permet d’ajouter une date d’expiration à l’offre dans le PDF.'
        },
        {
            name: 'Ajouter des notes',
            information: `
                Pour ajouter des notes, cliquez sur le bouton "Ajouter des notes" et remplissez le champ.
                Si vous souhaitez exclure les notes du PDF, cliquez simplement sur "Supprimer les notes" et les notes seront supprimées.
            `
        },
        {
            name: 'PDF multilingue',
            information: `
                Le PDF sera généré dans la langue sélectionnée par l’utilisateur dans la section en-tête de l’application.
            `
        },
        {
            name: 'Liste de produits dynamique',
            information: `
                Ajoutez des produits à la liste en cliquant sur le bouton avec la croix verte dans un cercle.
                Retirez des produits de la liste en cliquant sur le bouton à droite du produit avec la corbeille rouge.
                Sélectionnez la quantité et le prix unitaire. L’application calculera automatiquement le coût total.
            `
        },
        {
            name: 'PDF avec ou sans couleur',
            information: `
                Choisissez si vous souhaitez que le PDF contienne des détails en couleur ou non.
                L'option couleur inclut un fond bleu pour les détails de l'entreprise et un tableau de produits coloré.
            `
        }
    ],
    customPdfHeader: 'PDF personnalisé',
    contact: [
        `L’application peut être personnalisée pour permettre à une entreprise de générer son propre fichier PDF personnalisé,
                y compris le logo de l’entreprise et tout autre contenu que l’entreprise souhaite afficher.`,
        `Il est possible de créer tout type de fichiers PDF, pas seulement des offres de produits.`,
        `N’hésitez pas à me contacter 
        <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=About a custom .pdf generator">ici</a>. (Veuillez écrire en anglais)`,
        `- Nick Polizogopoulos`,
    ],
    credits: 'Illustration de la page d\'accueil par&nbsp;<a href="https://undraw.co/" target="_blank">unDraw</a>&nbsp;- Katerina Limpitsouni. (merci beaucoup !)',
    buttonText: 'Créez votre propre .pdf !'
};
