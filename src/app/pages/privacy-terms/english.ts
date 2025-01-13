import { PrivacyTermsContentType } from "./terms-types";

export const english: PrivacyTermsContentType = {
    pageTitle: 'Privacy Policy & Terms of Use',
    content: [
        {
            title: 'Privacy Policy',
            date: 'Effective Date: 27th of December 2024',
            introductionText: `
                "Product offer to .pdf" respects your privacy and is committed to protecting your personal information. 
                Here's what you need to know:`,
            list: [
                {
                    title: 'Data Collection',
                    bullet: [
                        `We do not collect or store any user data on our servers.`,
                        `Company details entered in the form are saved locally in your browser for convenience. 
                        This information is not shared or uploaded anywhere.`
                    ]
                },
                {
                    title: 'Google Analytics',
                    bullet: [
                        `We use Google Analytics 4 to analyze usage patterns and improve the app. 
                        This may include anonymized data, such as device information or usage statistics.`
                    ]
                },
                {
                    title: 'Your Rights',
                    bullet: [
                        'Since no personal data is collected or stored on our servers, no actions are needed to delete or access your data.'
                    ]
                },
                {
                    title: 'Cookies',
                    bullet: [
                        'Google Analytics may use cookies to track usage. You can manage cookies through your browser settings.'
                    ]
                }
            ],
            contact: `For questions, contact us 
                <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=About Privacy and Terms of -Product offer to .pdf- Application">
                here</a>.`
        },
        {
            title: 'Terms of Use',
            date: 'Effective Date: 27th of December 2024',
            introductionText: 'By using "Product offer to .pdf," you agree to the following terms:',
            list: [
                {
                    title: 'Purpose of the App',
                    bullet: ['This app is provided for companies to generate PDF offers for their customers.']
                },
                {
                    title: 'User Responsibilities',
                    bullet: [
                        'Ensure the accuracy of information entered into the form.',
                        'You are responsible for ensuring compliance with applicable laws when using this app.',
                    ]
                },
                {
                    title: 'Local Storage',
                    bullet: [
                        `The app stores company details locally in your browser for convenience. 
                        This data is not backed up or recoverable if cleared.`
                    ]
                },
                {
                    title: 'No Warranties',
                    bullet: [`The app is provided "as-is" without any guarantees of accuracy or reliability.`]
                },
                {
                    title: 'Limitation of Liability',
                    bullet: [
                        `We are not liable for any issues arising from the use of the app, 
                        including loss of data or errors in the PDF generated.`
                    ]
                },
            ],
            contact: `
                If you do not agree with these terms, please discontinue using the app. 
                For questions, contact us 
                <a class="link" href="mailto:nick.polizogopoulos@gmail.com?Subject=About Privacy and Terms of -Product offer to .pdf- Application">
                here</a>.`
        }
    ],
    buttonText: 'Back to home'
};