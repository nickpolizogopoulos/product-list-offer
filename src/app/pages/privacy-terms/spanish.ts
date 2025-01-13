import { PrivacyTermsContentType } from "./terms-types";

export const spanish: PrivacyTermsContentType = {
    pageTitle: 'Política de Privacidad y Términos de Uso',
    content: [
        {
            title: 'Política de Privacidad',
            date: 'Fecha de entrada en vigor: 27 de diciembre de 2024',
            introductionText: `
                "Product offer to .pdf" respeta su privacidad y está comprometido con la protección de su información personal. 
                Esto es lo que necesita saber:`,
            list: [
                {
                    title: 'Recopilación de Datos',
                    bullet: [
                        `No recopilamos ni almacenamos ningún dato de usuario en nuestros servidores.`,
                        `Los detalles de la empresa ingresados en el formulario se guardan localmente en su navegador para mayor comodidad. 
                        Esta información no se comparte ni se carga en ningún lugar.`
                    ]
                },
                {
                    title: 'Google Analytics',
                    bullet: [
                        `Utilizamos Google Analytics 4 para analizar los patrones de uso y mejorar la aplicación. 
                        Esto puede incluir datos anonimizados, como información sobre el dispositivo o estadísticas de uso.`
                    ]
                },
                {
                    title: 'Sus Derechos',
                    bullet: [
                        'Dado que no se recopilan ni almacenan datos personales en nuestros servidores, no es necesario tomar ninguna medida para eliminar o acceder a sus datos.'
                    ]
                },
                {
                    title: 'Cookies',
                    bullet: [
                        'Google Analytics puede utilizar cookies para realizar el seguimiento del uso. Puede gestionar las cookies a través de la configuración de su navegador.'
                    ]
                }
            ],
            contact: `Si tiene preguntas, contáctenos 
                <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=About Privacy and Terms of -Product offer to .pdf- Application">
                aquí</a>. (Por favor, escribe en inglés)`
        },
        {
            title: 'Términos de Uso',
            date: 'Fecha de entrada en vigor: 27 de diciembre de 2024',
            introductionText: 'Al utilizar "Product offer to .pdf", usted acepta los siguientes términos:',
            list: [
                {
                    title: 'Propósito de la Aplicación',
                    bullet: ['Esta aplicación está destinada a que las empresas generen ofertas en PDF para sus clientes.']
                },
                {
                    title: 'Responsabilidades del Usuario',
                    bullet: [
                        'Asegúrese de que la información ingresada en el formulario sea precisa.',
                        'Usted es responsable de garantizar el cumplimiento de las leyes aplicables al utilizar esta aplicación.',
                    ]
                },
                {
                    title: 'Almacenamiento Local',
                    bullet: [
                        `La aplicación almacena los detalles de la empresa localmente en su navegador para mayor comodidad. 
                        Estos datos no se respaldan ni se pueden recuperar si se borran.`
                    ]
                },
                {
                    title: 'Sin Garantías',
                    bullet: [`La aplicación se proporciona "tal como está" sin ninguna garantía de precisión o fiabilidad.`]
                },
                {
                    title: 'Limitación de Responsabilidad',
                    bullet: [
                        `No nos hacemos responsables de ningún problema derivado del uso de la aplicación, 
                        incluidos la pérdida de datos o errores en el PDF generado.`
                    ]
                },
            ],
            contact: `
                Si no está de acuerdo con estos términos, por favor, deje de usar la aplicación. 
                Para preguntas, contáctenos 
                <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=About Privacy and Terms of -Product offer to .pdf- Application">
                aquí</a>. (Por favor, escribe en inglés)`
        }
    ],
    buttonText: 'Volver a inicio'
};
