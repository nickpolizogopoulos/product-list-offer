import { CookiesContent } from "./cookies-types";

export const contentEs: CookiesContent = {
    pageTitle: 'Política de Cookies',
    introText: 'Este sitio web utiliza cookies para garantizar que obtenga la mejor experiencia al usar la aplicación.',
    block: {
        title: '¿Qué son las cookies?',
        text: `
            Las cookies son pequeños archivos de texto que se almacenan en su computadora o dispositivo móvil cuando visita un sitio web. 
            Se utilizan ampliamente para hacer que los sitios web funcionen, o funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio web.`
    },
    block2: {
        title: '¿Por qué usamos cookies?',
        text: `Utilizamos cookies para los siguientes fines:`
    },
    list1: [
        {
            title: 'Cookies esenciales',
            text: `
               Estas cookies son esenciales para la funcionalidad básica de nuestro sitio web, como permitirle 
                almacenar la información de su empresa (título, subtítulo, teléfono, ubicación, correo electrónico) en el almacenamiento local de su navegador para un uso más fácil en el futuro.
            `
        },
        {
            title: 'Cookies de Google Analytics 4',
            text: `
               Utilizamos Google Analytics 4 para recopilar información anónima sobre cómo los visitantes usan nuestro sitio web. 
               Esto nos ayuda a comprender el tráfico del sitio web y mejorar la experiencia del usuario. 
            `
        },
        {
            title: 'Cookies de terceros',
            text: `Podemos utilizar cookies de terceros con fines de marketing, como la reorientación de anuncios.`
        }
    ],
    cookiesLink: `
        Puede encontrar más información sobre las cookies de Google Analytics 4 
        <a class="link" href="https://support.google.com/analytics/answer/11397207?hl=es&sjid=12660115510274093596-EU" target="_blank">aquí</a>.
    `,
    block3: {
        title: 'Control de cookies',
        text: `
            Puede controlar y/o eliminar las cookies como desee; para más detalles, consulte
            <a class="link" href="https://www.aboutcookies.org/" target="_blank">aboutcookies.org</a>.
            Puede eliminar todas las cookies que ya están en su computadora y puede configurar la mayoría de los navegadores para evitar que se coloquen. 
            Sin embargo, si lo hace, es posible que tenga que ajustar manualmente algunas preferencias cada vez que visite un sitio y algunos servicios y 
            funcionalidades pueden no funcionar.
        `
    },
    block4: {
        title: 'Exención de responsabilidad',
        text: `
            Este sitio web contiene enlaces a otros sitios web. 
            Tenga en cuenta que no tenemos control sobre cómo estos sitios web utilizan las cookies y le recomendamos que consulte sus respectivas políticas de privacidad.`
    },
    buttonText: 'Volver a la página de inicio'
};
