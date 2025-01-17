type Input = {
    label: string;
    errorMessage: string;
};

export type Orientation = 'vertical' | 'horizontal';

export type HomeContent = {
    company: {
        sectionTitle: string;
        name: Input;
        subtitle: Input;
        phone: Input;
        email: Input;
        location: Input;
    };
    client: {
        sectionTitle: string;
        name: Input;
        phone: Input;
        email: Input;
    }
    settings: {
        sectionTitle: string;
        radio1: string;
        radio2: string;
        input: Input;
        button: {
            add: string;
            delete: string;
        };
        textAreaLabel: string;
    };
    products: {
        sectionTitle: string;
        product: {
            title: Input;
            quantity: Input;
            unitPrice: Input;
        };
        listIsEmpty: string;
        mobileHeader: string;
    };
    orientation: {
        vertical: string;
        horizontal: string;
    }
    colourOptions: {
        coloured: string;
        withoutColour: string;
    };
    submit: {
        listEmptyMessage: string;
        formErrorMessage: string;
        button: string;
    };
};
