import { CookiesContent } from "./cookies-types";

export const french: CookiesContent = {
    pageTitle: 'Politique de cookies',
    introText: 'Ce site utilise des cookies pour vous garantir la meilleure expérience possible lors de l\'utilisation de l\'application.',
    block: {
        title: 'Qu\'est-ce que les cookies ?',
        text: `
            Les cookies sont de petits fichiers texte qui sont stockés sur votre ordinateur ou votre appareil mobile lorsque vous visitez un site web. 
            Ils sont largement utilisés pour faire fonctionner les sites web, ou les faire fonctionner plus efficacement, ainsi que pour fournir des informations aux propriétaires de sites web.`
    },
    block2: {
        title: 'Pourquoi utilisons-nous des cookies ?',
        text: `Nous utilisons des cookies pour les raisons suivantes :`
    },
    list1: [
        {
            title: 'Cookies essentiels',
            text: `
               Ces cookies sont essentiels au bon fonctionnement de notre site web, par exemple pour vous permettre de 
                stocker vos informations d\'entreprise (titre, sous-titre, téléphone, localisation, email) dans le stockage local de votre navigateur pour une utilisation plus facile à l\'avenir.
            `
        },
        {
            title: 'Cookies Google Analytics 4',
            text: `
               Nous utilisons Google Analytics 4 pour collecter des informations anonymes sur la manière dont les visiteurs utilisent notre site web. 
               Cela nous aide à comprendre le trafic sur le site et à améliorer l\'expérience utilisateur. 
            `
        },
        {
            title: 'Cookies tiers',
            text: `Nous pouvons utiliser des cookies tiers à des fins marketing, telles que la publicité ciblée.`
        }
    ],
    cookiesLink: `
        Vous pouvez trouver plus d'informations sur les cookies de Google Analytics 4 
        <a class="link" href="https://support.google.com/analytics/answer/11397207?hl=en&sjid=12660115510274093596-EU" target="_blank">ici</a>.
    `,
    block3: {
        title: 'Contrôler les cookies',
        text: `
            Vous pouvez contrôler et/ou supprimer les cookies comme bon vous semble – pour plus de détails, consultez
            <a class="link" href="https://www.aboutcookies.org/" target="_blank">aboutcookies.org</a>.
            Vous pouvez supprimer tous les cookies déjà présents sur votre ordinateur et vous pouvez configurer la plupart des navigateurs pour empêcher leur placement. 
            Cependant, si vous faites cela, vous devrez peut-être ajuster manuellement certaines préférences chaque fois que vous visitez un site, et certains services et 
            fonctionnalités pourraient ne pas fonctionner.
        `
    },
    block4: {
        title: 'Avertissement',
        text: `
            Ce site contient des liens vers d\'autres sites web. 
            Veuillez noter que nous n\'avons aucun contrôle sur la manière dont ces sites utilisent des cookies et nous vous conseillons de vérifier leurs politiques de confidentialité respectives.`
    },
    buttonText: 'Retour à l\'accueil'
};
