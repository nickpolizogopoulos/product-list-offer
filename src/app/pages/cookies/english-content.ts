import { CookiesContent } from "./cookies-types";

export const contentEng: CookiesContent = {
    pageTitle: 'Cookies Policy',
    introText: 'This website uses cookies to ensure you get the best experience using the application.',
    block: {
        title: 'What are cookies?',
        text: `
            Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
            They are widely used to make websites work, or work more efficiently, as well as to provide information to the website owners.`
    },
    block2: {
        title: 'Why do we use cookies?',
        text: `We use cookies for the following purposes:`
    },
    list1: [
        {
            title: 'Essential cookies',
            text: `
               These cookies are essential for the basic functionality of our website, such as allowing you to 
                store your company information (title, subtitle, phone, location, email) in your browser's local storage for easier use in the future.
            `
        },
        {
            title: 'Google Analytics 4 Cookies',
            text: `
               We use Google Analytics 4 to collect anonymous information about how visitors use our website. 
               This helps us understand website traffic and improve user experience. 
            `
        },
        {
            title: 'Third-party cookies',
            text: `We may use third-party cookies for marketing purposes, such as retargeting ads.`
        }
    ],
    cookiesLink: `
        You can find more information about Google Analytics 4 cookies 
        <a class="link" href="https://support.google.com/analytics/answer/11397207?hl=en&sjid=12660115510274093596-EU" target="_blank">here</a>.
    `,
    block3: {
        title: 'Controlling cookies',
        text: `
            You can control or/and delete cookies as you wish – for details, see
            <a class="link" href="https://www.aboutcookies.org/" target="_blank">aboutcookies.org</a>.
            You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. 
            However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services and 
            functionalities may not work.
        `
    },
    block4: {
        title: 'Disclaimer',
        text: `
            This website contains links to other websites. 
            Please note that we have no control over how these websites use cookies and we advise you to check their respective privacy policies.`
    },
    buttonText: 'Back to home'
};