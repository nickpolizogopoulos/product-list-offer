import { PrivacyTermsContentType } from "./terms-types";

export const contentRu: PrivacyTermsContentType = {
    pageTitle: 'Политика конфиденциальности и Условия использования',
    content: [
        {
            title: 'Политика конфиденциальности',
            date: 'Дата вступления в силу: 27 декабря 2024 года',
            introductionText: `
                "Product offer to .pdf" уважает вашу конфиденциальность и стремится защищать вашу личную информацию. 
                Вот что вам нужно знать:`,
            list: [
                {
                    title: 'Сбор данных',
                    bullet: [
                        `Мы не собираем и не храним пользовательские данные на наших серверах.`,
                        `Данные компании, введенные в форму, сохраняются локально в вашем браузере для удобства. 
                        Эта информация не передается и не загружается на серверы.`
                    ]
                },
                {
                    title: 'Google Analytics',
                    bullet: [
                        `Мы используем Google Analytics 4 для анализа паттернов использования и улучшения приложения. 
                        Это может включать анонимные данные, такие как информация о устройстве или статистика использования.`
                    ]
                },
                {
                    title: 'Ваши права',
                    bullet: [
                        'Поскольку личные данные не собираются и не хранятся на наших серверах, нет необходимости в действиях для удаления или доступа к вашим данным.'
                    ]
                },
                {
                    title: 'Cookies',
                    bullet: [
                        'Google Analytics может использовать cookies для отслеживания использования. Вы можете управлять cookies через настройки вашего браузера.'
                    ]
                }
            ],
            contact: `Если у вас есть вопросы, свяжитесь с нами 
                <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=About Privacy and Terms of -Product offer to .pdf- Application">
                здесь</a>. (In English please)`
        },
        {
            title: 'Условия использования',
            date: 'Дата вступления в силу: 27 декабря 2024 года',
            introductionText: 'Используя "Product offer to .pdf", вы соглашаетесь с следующими условиями:',
            list: [
                {
                    title: 'Цель приложения',
                    bullet: ['Это приложение предназначено для компаний для создания PDF предложений для их клиентов.']
                },
                {
                    title: 'Обязанности пользователя',
                    bullet: [
                        'Обеспечьте точность информации, введенной в форму.',
                        'Вы несете ответственность за соблюдение применимых законов при использовании этого приложения.',
                    ]
                },
                {
                    title: 'Локальное хранилище',
                    bullet: [
                        `Приложение сохраняет данные компании локально в вашем браузере для удобства. 
                        Эти данные не подлежат резервному копированию и восстановлению, если они будут удалены.`
                    ]
                },
                {
                    title: 'Отказ от гарантий',
                    bullet: [`Приложение предоставляется "как есть", без каких-либо гарантий точности или надежности.`]
                },
                {
                    title: 'Ограничение ответственности',
                    bullet: [
                        `Мы не несем ответственности за любые проблемы, возникающие при использовании приложения, 
                        включая потерю данных или ошибки в сгенерированном PDF.`
                    ]
                },
            ],
            contact: `
                Если вы не согласны с этими условиями, прекратите использование приложения. 
                Если у вас есть вопросы, свяжитесь с нами 
                <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=About Privacy and Terms of -Product offer to .pdf- Application">
                здесь</a>. (In English please)`
        }
    ],
    buttonText: 'Вернуться на главную'
};