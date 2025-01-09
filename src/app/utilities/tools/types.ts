
export type Language =
    'greek'
  | 'english'
  | 'spanish'
  | 'french'
  | 'italian'
  | 'russian';

export type LanguageSelectionItem = {
  imagePath: string;
  alt: string;
  onSelect: Language;
  name: string;
};

export type ColourOption = 
    'withColour'
  | 'withoutColour';

export type Social = {
  name: string;
  link: string;
  path: string;
  viewBox: string;
};

export type FooterLink = {
  name: string;
  path: string;
};

