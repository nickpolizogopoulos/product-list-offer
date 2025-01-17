import { HomeContent } from "./types";

export const russian: HomeContent = {
    company: {
        sectionTitle: 'Информация о Компании',
        name: {
            label: 'Название Компании',
            errorMessage: 'Пожалуйста, введите название вашей компании.'
        },
        subtitle: {
            label: 'Подзаголовок компании (необязательно)',
            errorMessage: ''
        },
        phone: {
            label: 'Телефон',
            errorMessage: 'Пожалуйста, введите номер телефона.'
        },
        email: {
            label: 'Электронная почта',
            errorMessage: 'Пожалуйста, введите правильный адрес электронной почты.'
        },
        location: {
            label: 'Адрес Компании',
            errorMessage: 'Пожалуйста, введите адрес вашей компании.'
        }
    },
    client: {
        sectionTitle: 'Информация о Клиенте',
        name: {
            label: 'Имя Клиента',
            errorMessage: 'Пожалуйста, введите имя вашего клиента.'
        },
        phone: {
            label: 'Телефон',
            errorMessage: 'Пожалуйста, введите номер телефона.'
        },
        email: {
            label: 'Электронная почта',
            errorMessage: 'Пожалуйста, введите правильный адрес электронной почты.'
        },
    },
    settings: {
        sectionTitle: 'Настройки предложения',
        radio1: 'Предложение действительно бессрочно',
        radio2: 'С датой истечения срока',
        input: {
            label: 'Дата истечения срока предложения',
            errorMessage: 'Пожалуйста, нажмите кнопку рядом с полем ввода, чтобы выбрать дату.'
        },
        button: {
            add: 'Добавить заметки',
            delete: 'Удалить заметки'
        },
        textAreaLabel: 'Заметки (до 200 символов)'
    },
    products: {
        sectionTitle: 'Список продуктов',
        product: {
            title: {
                label: 'Заголовок Продукта',
                errorMessage: 'Пожалуйста, введите заголовок продукта.'
            },
            quantity: {
                label: 'Количество',
                errorMessage: 'Пожалуйста, добавьте количество.'
            },
            unitPrice: {
                label: 'Цена за единицу ₽',
                errorMessage: 'Пожалуйста, добавьте цену продукта.'
            }
        },
        listIsEmpty: 'В вашем списке нет товаров. Невозможно создать PDF-файл с пустым списком товаров!',
        mobileHeader: 'Добавить продукт'
    },
    orientation: {
        vertical: 'Вертикальный .pdf',
        horizontal: 'Горизонтальный .pdf'
    },
    colourOptions: {
        coloured: 'Печать цветного .pdf файла',
        withoutColour: 'Удалить цвета (экономия чернил)'
    },
    submit: {
        listEmptyMessage: 'Список пуст.',
        formErrorMessage: 'Пожалуйста, убедитесь, что все поля заполнены правильно!',
        button: 'Скачать .pdf файл'
    }
};
