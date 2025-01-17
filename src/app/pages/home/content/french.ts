import { HomeContent } from "./types";

export const french: HomeContent = {
    company: {
        sectionTitle: `Informations sur l'entreprise`,
        name: {
            label: `Nom de l'entreprise`,
            errorMessage: 'Veuillez entrer le nom de votre entreprise.'
        },
        subtitle: {
            label: `Sous-titre de l'entreprise (facultatif)`,
            errorMessage: ''
        },
        phone: {
            label: 'Téléphone',
            errorMessage: 'Veuillez entrer un numéro de téléphone.'
        },
        email: {
            label: 'Adresse e-mail',
            errorMessage: 'Veuillez entrer une adresse e-mail valide.'
        },
        location: {
            label: 'Adresse',
            errorMessage: `Veuillez entrer l'adresse de votre entreprise.`
        }
    },
    client: {
        sectionTitle: 'Informations sur le client',
        name: {
            label: 'Nom du client',
            errorMessage: 'Veuillez entrer le nom de votre client.'
        },
        phone: {
            label: 'Téléphone',
            errorMessage: 'Veuillez entrer un numéro de téléphone.'
        },
        email: {
            label: 'Adresse e-mail',
            errorMessage: 'Veuillez entrer une adresse e-mail valide.'
        },
    },
    settings: {
        sectionTitle: `Paramètres de l'offre`,
        radio1: `L'offre est valable de manière permanente`,
        radio2: `Avec une date d'expiration`,
        input: {
            label: `Date d'expiration de l'offre`,
            errorMessage: 'Veuillez cliquer sur le bouton à côté du champ de saisie pour sélectionner une date.'
        },
        button: {
            add: 'Ajouter des notes',
            delete: 'Supprimer les notes'
        },
        textAreaLabel: `Notes (jusqu'à 200 caractères)`
    },
    products: {
        sectionTitle: 'Liste des produits',
        product: {
            title: {
                label: 'Titre du produit',
                errorMessage: 'Veuillez entrer le titre du produit.'
            },
            quantity: {
                label: 'Quantité',
                errorMessage: 'Veuillez ajouter la quantité.'
            },
            unitPrice: {
                label: 'Prix unitaire (€)',
                errorMessage: 'Veuillez ajouter le prix du produit.'
            }
        },
        listIsEmpty: `Il n'y a pas de produits dans votre liste. Le fichier PDF ne peut pas être généré avec une liste de produits vide !`,
        mobileHeader: 'Ajouter un produit'
    },
    orientation: {
        vertical: 'Vertical .pdf',
        horizontal: 'Horizontal .pdf'
    },
    colourOptions: {
        coloured: 'Imprimer le fichier .pdf en couleur',
        withoutColour: `Supprimer les couleurs (économise de l'encre)`
    },
    submit: {
        listEmptyMessage: 'La liste est vide.',
        formErrorMessage: 'Veuillez vous assurer que tous les champs sont correctement remplis !',
        button: 'Télécharger le fichier .pdf'
    }
};
