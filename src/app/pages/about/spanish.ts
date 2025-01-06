import { AboutContent } from "./about-types";

export const contentEs: AboutContent = {
    pageHeader: 'Acerca de esta aplicación',
    appDescription: `
        Esta aplicación <strong><u>gratuita y de código abierto</u></strong>, desarrollada con las herramientas más modernas, 
        simplifica la creación y el envío de propuestas de productos profesionales. Construida con tecnologías web de última generación, 
        ofrece una experiencia intuitiva y eficiente, permitiendo a las empresas generar rápidamente archivos PDF detallados de ofertas de productos, 
        simplemente completando un formulario. Estas ofertas luego pueden enviarse directamente a los clientes.

    `,
    keyFeaturesHeader: 'Las características clave incluyen:',
    features: [
        {
            name: 'Personalización dinámica',
            information: `La empresa puede ingresar sus detalles, los detalles de su cliente o cliente, personalizar la oferta y crear un PDF personalizado.`
        },
        {
            name: 'Funcionalidad que ahorra tiempo',
            information: 'La información de la empresa se almacena localmente en el navegador, lo que hace que su uso futuro sea más rápido y conveniente.'
        },
        {
            name: 'Fecha de vencimiento de la oferta',
            information: 'La aplicación le permite incluir una fecha de vencimiento para la oferta en el PDF.'
        },
        {
            name: 'Agregar notas',
            information: `
                Para agregar notas, haga clic en el botón "Agregar notas" y complete el campo.
                Si desea excluir las notas del PDF, simplemente haga clic en 'Eliminar notas' y las notas serán eliminadas.
            `
        },
        {
            name: 'PDF multilingüe',
            information: `
                El PDF se generará en el idioma seleccionado por el usuario en la sección de encabezado de la aplicación.
            `
        },
        {
            name: 'Lista de productos dinámica',
            information: `
                Agregue productos a la lista haciendo clic en el botón con la cruz verde en un círculo. 
                Elimine productos de la lista haciendo clic en el botón a la derecha del producto con el icono de papelera roja. 
                Seleccione la cantidad y el precio por unidad. La aplicación calculará automáticamente el costo total.
            `
        },
        {
            name: 'PDF con o sin color',
            information: `
                Elija si desea que el PDF tenga detalles en color o no. 
                La opción de color incluye un fondo azul para los detalles de la empresa y una tabla de productos a color.
            `
        }
    ],
    customPdfHeader: 'PDF personalizado',
    contact: [
        `La aplicación se puede personalizar para permitir que una empresa genere su propio archivo PDF personalizado,
                incluido el logotipo de la empresa y cualquier otro contenido que la empresa desee mostrar.`,
        `Existe la opción de crear todo tipo de archivos PDF, no solo ofertas de productos.`,
        `No dude en contactarme
            <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=About a custom .pdf generator">
            aquí</a>. (In English Please)`,
        `- Nick Polizogopoulos`,
    ],
    credits: 'Ilustración de la página de inicio por&nbsp;<a href="https://undraw.co/" target="_blank">unDraw</a>&nbsp;- Katerina Limpitsouni. (¡Muchas gracias!)',
    buttonText: '¡Crea tu propio .pdf!'
};