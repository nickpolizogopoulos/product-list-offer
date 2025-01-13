import { HomeContent } from "./types";

export const spanish: HomeContent = {
    company: {
        sectionTitle: 'Información de la Empresa',
        name: {
            label: 'Nombre de la Empresa',
            errorMessage: 'Por favor, ingrese el nombre de su empresa.'
        },
        subtitle: {
            label: 'Subtítulo de la Empresa (opcional)',
            errorMessage: ''
        },
        phone: {
            label: 'Teléfono',
            errorMessage: 'Por favor, ingrese un número de teléfono.'
        },
        email: {
            label: 'Correo Electrónico',
            errorMessage: 'Por favor, ingrese un correo electrónico válido.'
        },
        location: {
            label: 'Ubicación',
            errorMessage: 'Por favor, ingrese la ubicación de su empresa.'
        }
    },
    client:{
        sectionTitle: 'Información del Cliente',
        name: {
            label: 'Nombre del Cliente',
            errorMessage: 'Por favor, ingrese el nombre de su cliente.'
        },
        phone: {
            label: 'Teléfono',
            errorMessage: 'Por favor, ingrese un número de teléfono.'
        },
        email: {
            label: 'Correo Electrónico',
            errorMessage: 'Por favor, ingrese un correo electrónico válido.'
        },
    },
    settings: {
        sectionTitle: 'Configuración de la oferta',
        radio1: 'La oferta es válida permanentemente',
        radio2: 'Con fecha de vencimiento',
        input: {
            label: 'Fecha de vencimiento de la oferta',
            errorMessage: 'Por favor, haga clic en el botón junto al campo de entrada para seleccionar una fecha.'
        },
        button: {
            add: 'Añadir notas',
            delete: 'Eliminar notas'
        },
        textAreaLabel: 'Notas (hasta 200 caracteres)'
    },
    products: {
        sectionTitle: 'Lista de productos',
        product: {
            title: {
                label: 'Título del Producto',
                errorMessage: 'Por favor, ingrese el título del producto.'
            },
            quantity: {
                label: 'Cantidad',
                errorMessage: 'Por favor, ingrese la cantidad.'
            },
            unitPrice: {
                label: 'Precio Unitario €',
                errorMessage: 'Por favor, ingrese el precio del producto.'
            }
        },
        listIsEmpty: 'No hay productos en su lista. ¡No se puede generar el archivo PDF con una lista de productos vacía!',
        mobileHeader: 'Añadir Producto'
    },
    colourOptions: {
        coloured: 'Imprimir archivo .pdf a color',
        withoutColour: 'Eliminar colores (ahorra tinta)'
    },
    submit: {
        listEmptyMessage: 'La lista está vacía.',
        formErrorMessage: '¡Por favor, asegúrese de que todos los campos estén completados correctamente!',
        button: 'Descargar archivo .pdf'
    }
};