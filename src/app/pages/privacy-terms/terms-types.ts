

type List = {
    title: string;
    bullet: string[];
};

type ContentType = {
    title: string;
    date: string;
    introductionText: string;
    list: List[];
    contact: string;
};

export type PrivacyTermsContentType = {
    pageTitle: string;
    content: ContentType[];
    buttonText: string;
};